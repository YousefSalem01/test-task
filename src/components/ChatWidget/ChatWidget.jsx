import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, MoreVertical, PlusCircle, LogOut, History } from "lucide-react";
import { Button } from "../../uikit/Button/Button";
import TextField from "../../uikit/TextField/TextField";
import Avatar from "../../uikit/Avatar/Avatar";
import Dropdown from "../../uikit/Dropdown/Dropdown";
import IconButton from "../../uikit/IconButton/IconButton";

// Import from extracted files
import { initialMessages, predefinedQuestions } from "./ChatWidget.data";
import { colors, animations, styles } from "./ChatWidget.styles";
import {
  formatUserMessage,
  formatBotMessage,
  simulateBotResponse,
  shouldShowQuickReplies,
  getMessagesContainerClass
} from "./ChatWidget.utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowDropdown(false);
  };

  const toggleDropdown = e => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleSend = e => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = formatUserMessage(inputValue);
    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    simulateBotResponse(
      "Thank you for your message! This is a demo of armincx AI agent. In a real implementation, I would provide intelligent responses based on your business data and help resolve customer inquiries automatically.",
      botMessage => setMessages(prev => [...prev, botMessage])
    );
  };

  const handleQuestionClick = question => {
    // Add user question
    const userMessage = formatUserMessage(question.text);
    setMessages([...messages, userMessage]);

    // Simulate bot response
    simulateBotResponse(question.answer, botMessage => setMessages(prev => [...prev, botMessage]));
  };

  const handleMenuAction = item => {
    if (item.id === "new") {
      handleStartNewChat();
    } else if (item.id === "end") {
      handleEndChat();
    } else if (item.id === "history") {
      handleViewRecentChats();
    }
  };

  const handleStartNewChat = () => {
    setMessages(initialMessages);
    setShowDropdown(false);
  };

  const handleEndChat = () => {
    setIsOpen(false);
    setShowDropdown(false);
  };

  const handleViewRecentChats = () => {
    // In a real implementation, this would show recent chat history
    alert("This would show your recent chat history in a real implementation.");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Menu items for dropdown
  const menuItems = [
    { id: "new", label: "Start a new chat", icon: <PlusCircle size={16} /> },
    { id: "end", label: "End chat", icon: <LogOut size={16} /> },
    { id: "history", label: "View recent chats", icon: <History size={16} /> }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <IconButton
          icon={isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          onClick={toggleChat}
          variant="primary"
          size="lg"
          rounded
          className="shadow-lg"
          ariaLabel={isOpen ? "Close chat" : "Open chat"}
        />
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={animations.chatWindow.initial}
            animate={animations.chatWindow.animate}
            exit={animations.chatWindow.exit}
            transition={animations.chatWindow.transition}
          >
            {/* Chat header */}
            <div className={styles.chatHeader}>
              <div className="flex items-center">
                <Avatar initials="C" size="sm" color="#FFFFFF" className="mr-2 text-[#4361EE]" />
                <span className="font-medium text-sm">armincx AI Agent</span>
              </div>

              <Dropdown
                trigger={
                  <IconButton
                    icon={<MoreVertical size={18} />}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-gray-300"
                    ariaLabel="Chat options"
                  />
                }
                items={menuItems}
                position="bottom-right"
                onSelect={handleMenuAction}
              />
            </div>

            {/* Chat body */}
            <div className={styles.chatBody}>
              {/* Messages area */}
              <div className={`${styles.messagesContainer} ${getMessagesContainerClass(messages)}`}>
                {messages.map(message => (
                  <div key={message.id} className={message.sender === "user" ? styles.userMessage : styles.botMessage}>
                    {message.sender === "bot" && (
                      <Avatar initials="C" size="xs" color="#FFFFFF" className="mr-2 text-[#4361EE] shadow-sm" />
                    )}
                    <div className={message.sender === "user" ? styles.userMessageBubble : styles.botMessageBubble}>
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick reply buttons */}
              {shouldShowQuickReplies(messages) && (
                <div className={styles.quickRepliesContainer}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {predefinedQuestions.map(question => (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionClick(question)}
                        className={styles.quickReplyButton}
                      >
                        {question.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat input */}
              <div className={styles.chatInputContainer}>
                <form onSubmit={handleSend} className={styles.chatInputForm}>
                  <TextField
                    placeholder="Message..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    rightIcon={
                      <IconButton
                        icon={<Send size={16} />}
                        type="submit"
                        variant={inputValue.trim() ? "primary" : "secondary"}
                        size="sm"
                        rounded
                        disabled={!inputValue.trim()}
                        ariaLabel="Send message"
                      />
                    }
                    className="flex-grow"
                  />
                </form>

                {/* Privacy notice */}
                <div className={styles.privacyNotice}>
                  By chatting, you agree to our{" "}
                  <a href="#" className={styles.privacyLink}>
                    privacy policy
                  </a>
                  .
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
