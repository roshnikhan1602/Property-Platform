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
        "http://localhost:5000/api/chatbot",
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
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50 cursor-pointer chatbot-float"
      >
        {isOpen ? (
          <FaTimes size={22} />
        ) : (
          <FaComments size={22} />
        )}
      </button>

      {/* Chat Window */}

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200">

          <div className="bg-blue-600 text-white px-5 py-4 font-semibold text-lg">
            PropertyHub Assistant
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">

            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.sender ===
                    "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.text}
                </div>
              )
            )}

            {loading && (
              <div className="bg-white shadow rounded-2xl px-4 py-3 text-sm w-fit animate-pulse">
                🤖 Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="flex border-t">

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
              className="flex-1 px-4 py-3 outline-none"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-5 hover:bg-blue-700 transition disabled:bg-gray-400 cursor-pointer"
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