
import React from "react";

export default function ChatMessage({ role, content }) {
  return (
    <div
      className="p-3 my-2 rounded-lg max-w-[70%] "
    >
      {role === "bot" && content}
    </div>
  );
}
