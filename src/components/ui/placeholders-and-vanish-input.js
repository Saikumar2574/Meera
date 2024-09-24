"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineEnter } from "react-icons/ai";
import { ImMic } from "react-icons/im";
import { FaPlusCircle, FaStopCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

export function PlaceholdersAndVanishTextarea({
  value,
  setValue,
  isRecording,
  stopRecording,
  startRecording,
  placeholders,
  onChange,
  onSubmit,
  keepFocus,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [charIndex, setCharIndex] = useState(0); // State for typewriter effect
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef(null);
  const typewriterIntervalRef = useRef(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 7000);
  };

  const startTypewriter = () => {
    clearInterval(typewriterIntervalRef.current);
    setCharIndex(0); // Reset char index when new placeholder is shown
    typewriterIntervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        if (prev < placeholders[currentPlaceholder]?.length) {
          return prev + 1;
        } else {
          clearInterval(typewriterIntervalRef.current);
          return prev;
        }
      });
    }, 30);
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    startTypewriter(); // Start typewriter effect initially

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(typewriterIntervalRef.current);
    };
  }, [placeholders, currentPlaceholder]);

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      clearInterval(typewriterIntervalRef.current);
    } else if (document.visibilityState === "visible") {
      startAnimation();
      startTypewriter();
    }
  };

  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const textareaRef = useRef(null);
  // const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!textareaRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(textareaRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  // useEffect(() => {
  //   draw();
  // }, [value, draw]);

  const animate = (start) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const resetRows = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = textareaRef.current?.value || "";
    if (value && textareaRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  useEffect(() => {
    if (keepFocus && textareaRef.current) {
      textareaRef.current.focus(); // Set focus on textarea
    }
  }, [keepFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit();
    if (textareaRef.current) {
      textareaRef.current.blur();
    }
    onSubmit && onSubmit(value);
    resetRows();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !animating) {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative flex w-full max-w-[1200px] items-center  pt-3">
        <form
          className={cn("w-full relative flex")}
          style={{
            background: "#f5f5f7",
            borderRadius: "15px",
            border: "2px solid #c8c8ca",
          }}
          onSubmit={handleSubmit}
        >
          {/* <canvas
            className={cn(
              "absolute pointer-events-none text-base transform scale-50 top-[20%] left-5 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
              !animating ? "opacity-0" : "opacity-100"
            )}
            ref={canvasRef}
          /> */}
          <div className="relative w-full">
            {/* {!isFocused && (
              <span className="absolute top-4 left-10 h-6 w-1 bg-black animate-blink"></span>
            )} */}
            <textarea
              onChange={(e) => {
                if (!animating) {
                  setValue(e.target.value);
                  onChange && onChange(e);
                }
              }}
              ref={textareaRef}
              value={value}
              onKeyDown={handleKeyDown}
              rows={1}
              onFocus={(e) => {
                setIsFocused(true);
                e.target.rows = 4;
              }}
              onBlur={(e) => {
                setIsFocused(false);
                if (!value) e.target.rows = 1;
              }}
              className={cn(
                "ml-4 w-full mt-2 py-0  relative text-xl z-10 border-none dark:text-black bg-transparent text-black h-full rounded-lg focus:outline-none focus:ring-0 pl-4  pr-20",
                "overflow-y-auto",
                "max-h-40",
                "transition-all duration-500 ease-in-out",
                "resize-none",
                animating && "text-transparent dark:text-transparent"
              )}
              style={{
                height: isFocused ? "136px" : "30px",
                outline: "none",
              }}
            />
          </div>
          <div className="w-12 flex items-end justify-center">
            <button
              disabled={!value || isRecording}
              type="submit"
              className="z-10 mb-[6px]  h-8 w-8 rounded-md bg-gray-900  dark:text-white text-gray-100 cursor-pointer flex items-center justify-center disabled:cursor-not-allowed"
            >
              <AiOutlineEnter size={18} />
            </button>
          </div>
        </form>
        {isRecording ? (
          <button
            className="ml-5 rounded-full h-10 w-10"
            onClick={stopRecording}
          >
            <FaStopCircle size={40} />
          </button>
        ) : (
          <button
            className="ml-5 bg-black rounded-full p-2 h-10 w-10"
            onClick={startRecording}
          >
            <ImMic size={24} color="white" />
          </button>
        )}
        {isRecording && (
          <div style={{ height: "30px", width: "100px" }}>
            <div
              style={{
                display: "inline-block",
                width: "10px",
                height: "100%",
                backgroundColor: "#00bcd4",
                margin: "0 2px",
                animation: "wave-animation 1s infinite ease-in-out",
                animationDelay: "0s",
              }}
            ></div>
            <div
              style={{
                display: "inline-block",
                width: "10px",
                height: "100%",
                backgroundColor: "#00bcd4",
                margin: "0 2px",
                animation: "wave-animation 1s infinite ease-in-out",
                animationDelay: "0.1s",
              }}
            ></div>
            <div
              style={{
                display: "inline-block",
                width: "10px",
                height: "100%",
                backgroundColor: "#00bcd4",
                margin: "0 2px",
                animation: "wave-animation 1s infinite ease-in-out",
                animationDelay: "0.2s",
              }}
            ></div>
            <div
              style={{
                display: "inline-block",
                width: "10px",
                height: "100%",
                backgroundColor: "#00bcd4",
                margin: "0 2px",
                animation: "wave-animation 1s infinite ease-in-out",
                animationDelay: "0.3s",
              }}
            ></div>
            <div
              style={{
                display: "inline-block",
                width: "10px",
                height: "100%",
                backgroundColor: "#00bcd4",
                margin: "0 2px",
                animation: "wave-animation 1s infinite ease-in-out",
                animationDelay: "0.4s",
              }}
            ></div>
          </div>
        )}
        {/* Placeholder display */}
       { !isFocused && 
        <div className="absolute mt-9 top-0 left-12 transform -translate-y-1/2 flex">
          <AnimatePresence mode="wait">
            {!value && (
              <motion.span
                className="text-gray-500 max-w-[600px]"
                key={currentPlaceholder}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 1 }}
              >
                {placeholders[currentPlaceholder].slice(0, charIndex)}{" "}
              </motion.span>
            )}
          </AnimatePresence>
        </div>}
      </div>
    </div>
  );
}
