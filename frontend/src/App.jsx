import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const ChatEasy = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Hi there! I'm your ChatEasy assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulate sending a message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    // Send message to backend
    const res = await axios.post("http://localhost:8000/chat", {
      message: input,
    });

    // Add bot reply from backend
    const botMessage = { role: "bot", content: res.data.response };
    setMessages((prev) => [...prev, botMessage]);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-white font-bold text-xl">ChatEasy</div>
        </div>
        <button type="button" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium text-sm">
          Start Free Trial
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Container */}
        <div className="flex flex-col flex-1 bg-white shadow-lg rounded-lg m-4 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.role === "bot" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                    <div className="text-white text-xs">🤖</div>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-lg max-w-xs sm:max-w-md md:max-w-lg ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
                    <div className="text-gray-700 text-xs">👤</div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex mb-4 justify-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                  <div className="text-white text-xs">🤖</div>
                </div>
                <div className="px-4 py-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`bg-blue-600 text-white px-4 py-2 rounded-r-lg ${!input.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                  }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - FAQ panel */}
        <div className="hidden md:block w-80 bg-white shadow-lg rounded-lg m-4 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">What is ChatEasy?</p>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  +
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">How does it work?</p>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  +
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">What are the benefits?</p>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  +
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">How to get started?</p>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  +
                </div>
              </div>
            </div>
          </div>

          {/* Start trial card */}
          <div className="p-4 m-4 bg-gray-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="mr-2 text-xl">🚀</div>
              <h3 className="font-bold">Start with a 14-Day Free Trial</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get a dedicated experience with no credit card required
            </p>
            <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatEasy;
