// ChatWidget styles for the chat component
// Main colors
export const colors = {
  primary: "var(--color-blue)",
  primaryHover: "var(--color-blue)/90",
  white: "#fff",
  black: "#2d2d2d",
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151"
  }
};

// Animation variants for framer-motion
export const animations = {
  chatButton: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  },
  chatWindow: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
    transition: { duration: 0.2 }
  },
  dropdown: {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 },
    transition: { duration: 0.15 }
  }
};

// Component styles
export const styles = {
  chatButton: `bg-[${colors.primary}] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[${colors.primaryHover}] transition-colors cursor-pointer`,
  chatWindow:
    "absolute bottom-20 right-0 w-[350px] sm:w-[380px] max-w-[95vw] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200",
  chatHeader: `bg-[${colors.primary}] text-white p-3 sm:p-4 flex items-center justify-between`,
  chatLogo: `bg-white text-[${colors.primary}] rounded-full w-8 h-8 flex items-center justify-center mr-2 sm:mr-3 font-bold text-sm`,
  chatBody: "flex flex-col h-[400px]",

  // New styles
  container: "fixed bottom-0 right-0 p-4 w-96 bg-white rounded-lg shadow-lg z-50",
  header: "flex justify-between items-center p-4 bg-gray-100 rounded-t-lg",
  title: "text-lg font-semibold",
  closeButton: "text-gray-600 hover:text-gray-800 focus:outline-none",
  messagesContainer: "p-4 h-64 overflow-y-auto",
  message: "p-2 rounded-lg",
  userMessage: "flex justify-end mb-3",
  botMessage: "flex justify-start mb-3",
  userInputContainer: "flex p-4 bg-gray-100 rounded-b-lg",
  userInput: "flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300",
  sendButton: "ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none",

  // Preserved styles that don't conflict with new ones
  botAvatar:
    "bg-white text-[#2d2d2d] rounded-full w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center mr-2 flex-shrink-0 font-bold text-xs shadow-sm",
  userMessageBubble: `rounded-2xl px-3 sm:px-4 py-2 max-w-[80%] text-xs sm:text-sm leading-relaxed cursor-pointer hover:shadow-md transition-shadow bg-[${colors.primary}] text-white rounded-br-md`,
  botMessageBubble:
    "rounded-2xl px-3 sm:px-4 py-2 max-w-[80%] text-xs sm:text-sm leading-relaxed cursor-pointer hover:shadow-md transition-shadow bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md",
  quickRepliesContainer: "px-3 sm:px-4 py-2 sm:py-3 bg-white border-t border-gray-100",
  quickReplyButton:
    "text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full py-2 px-3 text-left transition-colors cursor-pointer border border-gray-200 hover:border-gray-300",
  chatInputContainer: "border-t border-gray-100 bg-white",
  chatInputForm: "p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
  chatInput:
    "flex-1 border border-gray-400 rounded-full px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-var(--color-blue) focus:border-transparent",
  privacyNotice: "px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-xs text-gray-500 text-center",
  privacyLink: "text-blue hover:underline cursor-pointer"
};
