import { useState, useEffect, useRef } from "react";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

function Chatbot() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text: "Hi 👋 How can I help you today?",
      },
    ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "Sorry, I couldn't process your request.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Unable to connect to AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}

      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50 cursor-pointer chatbot-float"
      >
        {isOpen ? (
          <FaTimes size={22} />
        ) : (
          <FaComments size={22} />
        )}
      </button>

      {/* Chat Window */}

      {isOpen && (
        <div className="fixed bottom-20 right-3 left-3 sm:bottom-24 sm:left-auto sm:right-6 w-auto sm:w-96 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200">

          <div className="bg-blue-600 text-white px-4 sm:px-5 py-3 sm:py-4 font-semibold text-base sm:text-lg">
            PropertyHub Assistant
          </div>

          <div className="h-[60vh] max-h-96 min-h-64 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">

            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={`max-w-[82%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              )
            )}

            {loading && (
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm w-fit animate-pulse">
                🤖 Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="flex border-t border-gray-200">

            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !loading &&
                handleSend()
              }
              className="flex-1 min-w-0 px-3 sm:px-4 py-3 outline-none text-sm sm:text-base"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-4 sm:px-5 hover:bg-blue-700 transition disabled:bg-gray-400 cursor-pointer shrink-0"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;