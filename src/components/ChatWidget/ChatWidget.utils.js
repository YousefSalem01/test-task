/**
 * Generate a unique ID for messages
 * @returns {string} Unique ID
 */
export const generateMessageId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format a bot response
 * @param {string} content - Message content
 * @returns {Object} Formatted bot message object
 */
export const formatBotMessage = (content) => {
  return {
    id: generateMessageId(),
    content,
    sender: "bot",
  };
};

/**
 * Format a user message
 * @param {string} content - Message content
 * @returns {Object} Formatted user message object
 */
export const formatUserMessage = (content) => {
  return {
    id: generateMessageId(),
    content,
    sender: "user",
  };
};

/**
 * Simulate a bot response with delay
 * @param {string} content - Message content
 * @param {Function} callback - Callback function to handle the response
 * @param {number} delay - Delay in milliseconds
 */
export const simulateBotResponse = (content, callback, delay = 1000) => {
  setTimeout(() => {
    callback(formatBotMessage(content));
  }, delay);
};

/**
 * Check if the chat window should show quick replies
 * @param {Array} messages - Array of message objects
 * @param {number} threshold - Maximum number of messages to show quick replies
 * @returns {boolean} Whether to show quick replies
 */
export const shouldShowQuickReplies = (messages, threshold = 3) => {
  return messages.length <= threshold;
};

/**
 * Get appropriate message container class based on the number of messages
 * @param {Array} messages - Array of message objects
 * @returns {string} CSS class for message container height
 */
export const getMessagesContainerClass = (messages) => {
  return messages.length <= 3 ? "h-[280px]" : "h-[344px]";
}; 