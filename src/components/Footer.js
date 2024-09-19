"use client";
import React, { useEffect, useState } from "react";
import { PlaceholdersAndVanishTextarea } from "./ui/placeholders-and-vanish-input";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { ImMic } from "react-icons/im";
import { FaStopCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchText, setSearchText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [action, setAction] = useState(null);
  const scale = useMotionValue(1);
  const transformScale = useTransform(scale, [0, 1], [0.8, 1.2]);

  const placeholders1 = [
    "Show me riding jackets, pants and gloves",
    "show me maintenance products for my bike",
    "i am looking for a Portable Air Pump",
  ];
  const placeholders2 = [
    "i want waterproof saddlebags for my motorcycle that are easy to detach and come with reflective strips for added visibility during night rides",
    "I need to plan for a trip and want to by stuff that will be useful on the trip",
    "Can you recommend protective gear for motorcycling, like armoured jackets, knee and elbow guards, and full-face helmets that will be good for winter rides",
  ];

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "microphone",
        });
        setPermissionStatus(permission.state);

        permission.onchange = () => {
          setPermissionStatus(permission.state);
        };
      } catch (error) {
        console.error("Error checking microphone permission:", error);
      }
    };

    checkMicrophonePermission();
  }, []);

  const showPermissionPrompt = () => {
    const userConfirmed = window.confirm(
      "Microphone access is required for speech recognition. Do you want to enable it now?"
    );
    if (userConfirmed) {
      requestMicrophoneAccess();
    }
  };

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionStatus("granted");
      // startRecording();
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error requesting microphone access:", error);
      let errorMessage =
        "Microphone access is not allowed. Please enable it in your browser settings:\n\n";
      alert(errorMessage);
    }
  };

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    if (permissionStatus !== "granted") {
      showPermissionPrompt();
      return;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = language;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      console.log("Speech recognition started");
      setIsRecording(true);
    };

    recognitionInstance.onresult = (event) => {
      let transcriptResult = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcriptResult += event.results[i][0].transcript;
        }
      }

      // Update the existing transcript with new results
      setTranscript((prevTranscript) => prevTranscript + transcriptResult);
      setSearchText((prevSearchText) => prevSearchText + transcriptResult);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition ended");
      setIsRecording(false);
      setRecognition(null); // Clear the recognition instance
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const stopRecording = () => {
    if (recognition) {
      console.log("Stopping speech recognition...");
      recognition.abort(); // Use abort for faster termination
      setIsRecording(false);
      setRecognition(null); // Clear the recognition instance
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (value) => {
    setSearchText("")
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired or invalid token. Please log in again.");
      return;
    }
    if (pathname == "/" || pathname == "/search/") {
      router.push(`/search?prompt=${value}`);
    } else if (pathname.startsWith("/search/products")) {
      router.push(`/search/products/query?msg=${value}`);
    }
  };

  return (
    <div className="w-full sticky bottom-0" style={{ zIndex: 10 }}>
      <div
        className="hidden md:block relative"
        style={{
        //   border: "1px solid rgb(108 108 108 / 30%)",
        //   boxShadow: " 0 8px 32px rgba(0, 0, 0, 0.25)",
        //   background:
        //     "linear-gradient(to bottom, rgba(200, 200, 200, 0.2), rgba(255, 255, 255, 0.2))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: " blur(20px)",
          paddingBottom: "0.75rem",
        }}
      >

        <PlaceholdersAndVanishTextarea
          value={searchText}
          setValue={setSearchText}
          isRecording={isRecording}
          stopRecording={stopRecording}
          startRecording={startRecording}
          placeholders={
            action === "Shopping for a specific purpose or a use case"
              ? placeholders2
              : placeholders1
          }
          onChange={handleChange}
          onSubmit={onSubmit}
          keepFocus={action}
        />
      </div>
      <div
        className="relative block md:hidden bg-white"
        style={{ boxShadow: "0px 0px 5px 0px #ccc" }}
      >
        {/* {selectedItems.length > 0 && (
          <div className="relative w-full max-w-4xl mx-auto -mb-2 pt-3">
            <div className="flex space-x-2 overflow-x-auto whitespace-nowrap pb-2 hide-scrollbar">
              <AnimatePresence>
                {selectedItems.map((item, index) => (
                  <motion.span
                    key={item.productId || item.product_id}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="py-1 px-2 bg-black text-white w-52 rounded-md mx-2 flex items-center space-x-2"
                  >
                    <span className="text-sm w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {item.name}
                    </span>
                    <AiOutlineClose
                      size={18}
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleRemoveItem(item?.productId || item?.product_id)
                      }
                    />
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )} */}
        <div className="flex items-center p-4">
          <div className="relative flex flex-1 border rounded-sm border-gray-500">
            <div className="relative w-full">
              <input
                onChange={handleChange}
                type="text"
                placeholder="Start typing..."
                required
                disabled={isRecording}
                value={searchText}
                className={`block text-lg w-full pl-3 pr-10 py-2 rounded-md border-none focus:outline-none focus:ring-0 focus:border-none ${
                  isRecording ? "opacity-50" : ""
                }`}
              />

              {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center h-8 top-1 text-lg rounded-md z-10 pointer-events-none">
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
            </div>
          </div>
          {searchText !== "" ? (
            <motion.div
              className="ml-2 rounded-full bg-black w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1 }} // scale up on hover
              whileTap={{ scale: 0.9 }} // scale down when pressed
            >
              <button
                type="button"
                disabled={isRecording}
                onClick={() => onSubmit(searchText)}
                className="text-white"
              >
                <motion.div
                  style={{ scale: transformScale }} // apply transform animation
                >
                  <IoMdSend size={24} className="ml-1" />
                </motion.div>
              </button>
            </motion.div>
          ) : (
            <>
              {isRecording ? (
                <motion.button
                  className="ml-2 rounded-full"
                  onClick={stopRecording}
                  whileHover={{ rotate: 360 }} // rotate on hover
                  whileTap={{ scale: 0.9 }} // scale down on tap
                >
                  <FaStopCircle size={40} />
                </motion.button>
              ) : (
                <motion.button
                  className="ml-2 bg-black rounded-full p-2"
                  onClick={startRecording}
                  whileHover={{ scale: 1.2 }} // scale up on hover
                  whileTap={{ scale: 0.9 }} // scale down on tap
                >
                  <ImMic size={24} color="white" />
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
