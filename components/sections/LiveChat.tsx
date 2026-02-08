"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function LiveChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendToWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/252610631155?text=${encodedMessage}`, '_blank');
    setIsChatOpen(false);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendToWhatsApp();
    }
  };

  return (
    <>
      {/* WhatsApp button - Opens chat modal */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-105 transition-all z-50 flex items-center justify-center"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-white h-6 w-6" />
      </button>

      {/* WhatsApp Chat Modal - Simple side panel without blur */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Transparent overlay - just for closing */}
          <div 
            className="flex-1 bg-transparent"
            onClick={() => setIsChatOpen(false)}
          ></div>
          
          {/* Right side - Chat panel */}
          <div className="w-full md:w-96 bg-white shadow-xl animate-slideInRight h-screen overflow-y-auto">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[#25D366] font-bold text-xl">K</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Kaaftoon</h3>
                    <div className="flex items-center text-sm mt-1">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                      <span>Typically replies within 1 hour</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-6">
              {/* Welcome Message */}
              <div className="mb-8">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-bold">K</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800 font-medium">Hello there! 😊</p>
                      <p className="text-gray-800 font-medium mt-1">How can we help?</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 block ml-1">08:06 AM</span>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="mt-8">
                <div className="mb-6">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
                    rows={4}
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendToWhatsApp}
                    disabled={!message.trim()}
                    className={`flex-1 px-4 py-3 rounded-xl transition font-medium ${
                      message.trim() 
                        ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:opacity-90' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Send to WhatsApp
                  </button>
                </div>
                
                {/* Footer Note */}
                <p className="text-xs text-gray-500 text-center mt-6">
                  Message will open in WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation style */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}