"use client";
import React, { useState } from "react";

const SpeechToText = () => {
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState("en-US"); // State for language selection

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language; // Use state for language

    recognitionInstance.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the state with final results
      setTranscript(
        (prevTranscript) => prevTranscript + finalTranscript.trim()
      );
    };

    recognitionInstance.onerror = (event) => {
      console.error(event.error);
      alert(`Error occurred in speech recognition: ${event.error}`);
    };

    recognitionInstance.onend = () => {
    //   if (isRecording) {
        setIsRecording(true);
        recognitionInstance.start();
    //   }
    };
    recognitionInstance.addEventListener("end", () => {
      recognitionInstance.start();
    });

    recognitionInstance.start();
    setRecognition(recognitionInstance);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Speech to Text Player</h1>
      <div
        style={{
          display: "inline-block",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <label htmlFor="language">Choose Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginBottom: "20px" }}
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish (Spain)</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="zh-CN">Chinese (Mandarin)</option>
          <option value="kn-IN">Kannada (India)</option>
          <option value="te-IN">Telugu (India)</option>
        </select>
        <br />
        <button
          onClick={() => startRecording()}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
          disabled={isRecording}
        >
          Record
        </button>
        <button
          onClick={() => stopRecording()}
          style={{
            backgroundColor: "#555",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          disabled={!isRecording}
        >
          Stop
        </button>
        <p>{transcript}</p>
        {isRecording && (
          <div style={{ marginTop: "20px", height: "50px" }}>
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
      <style jsx>{`
        @keyframes wave-animation {
          0%,
          100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SpeechToText;
