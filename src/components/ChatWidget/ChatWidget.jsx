import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, MoreVertical, PlusCircle, LogOut, History } from "lucide-react";
import { Button } from "../../uikit/Button/Button";

// Import from extracted files
import { initialMessages, predefinedQuestions } from "./ChatWidget.data";
import { colors, animations, styles } from "./ChatWidget.styles";
import { formatUserMessage, formatBotMessage, simulateBotResponse, shouldShowQuickReplies, getMessagesContainerClass } from "./ChatWidget.utils";

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

	const toggleDropdown = (e) => {
		e.stopPropagation();
		setShowDropdown(!showDropdown);
	};

	const handleSend = (e) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		// Add user message
		const userMessage = formatUserMessage(inputValue);
		setMessages([...messages, userMessage]);
		setInputValue("");

		// Simulate bot response
		simulateBotResponse(
			"Thank you for your message! This is a demo of armincx AI agent. In a real implementation, I would provide intelligent responses based on your business data and help resolve customer inquiries automatically.",
			(botMessage) => setMessages((prev) => [...prev, botMessage])
		);
	};

	const handleQuestionClick = (question) => {
		// Add user question
		const userMessage = formatUserMessage(question.text);
		setMessages([...messages, userMessage]);

		// Simulate bot response
		simulateBotResponse(question.answer, (botMessage) => setMessages((prev) => [...prev, botMessage]));
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
		const handleClickOutside = (event) => {
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

	return (
		<div className='fixed bottom-6 right-6 z-50'>
			{/* Chat button */}
			<motion.button className={styles.chatButton} onClick={toggleChat} whileHover={animations.chatButton.hover} whileTap={animations.chatButton.tap}>
				{isOpen ? <X size={24} /> : <MessageSquare size={24} />}
			</motion.button>

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
							<div className='flex items-center'>
								<div className={styles.chatLogo}>C</div>
								<span className='font-medium text-sm'>armincx AI Agent</span>
							</div>
							<div className='flex items-center relative' ref={dropdownRef}>
								<button onClick={toggleDropdown} className='text-white hover:text-gray-300 cursor-pointer p-1 rounded transition-colors'>
									<MoreVertical size={18} />
								</button>

								{/* Dropdown menu */}
								<AnimatePresence>
									{showDropdown && (
										<motion.div
											initial={animations.dropdown.initial}
											animate={animations.dropdown.animate}
											exit={animations.dropdown.exit}
											transition={animations.dropdown.transition}
											className='absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden'
										>
											<div className='py-1'>
												<button
													onClick={handleStartNewChat}
													className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
												>
													<PlusCircle size={16} className='mr-2' />
													Start a new chat
												</button>
												<button
													onClick={handleEndChat}
													className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
												>
													<LogOut size={16} className='mr-2' />
													End chat
												</button>
												<button
													onClick={handleViewRecentChats}
													className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
												>
													<History size={16} className='mr-2' />
													View recent chats
												</button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						{/* Chat body */}
						<div className={styles.chatBody}>
							{/* Messages area */}
							<div className={`${styles.messagesContainer} ${getMessagesContainerClass(messages)}`}>
								{messages.map((message) => (
									<div key={message.id} className={message.sender === "user" ? styles.userMessage : styles.botMessage}>
										{message.sender === "bot" && <div className={styles.botAvatar}>C</div>}
										<div className={message.sender === "user" ? styles.userMessageBubble : styles.botMessageBubble}>{message.content}</div>
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>

							{/* Quick reply buttons */}
							{shouldShowQuickReplies(messages) && (
								<div className={styles.quickRepliesContainer}>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
										{predefinedQuestions.map((question) => (
											<button key={question.id} onClick={() => handleQuestionClick(question)} className={styles.quickReplyButton}>
												{question.text}
											</button>
										))}
									</div>
								</div>
							)}

							{/* Chat input */}
							<div className={styles.chatInputContainer}>
								<form onSubmit={handleSend} className={styles.chatInputForm}>
									<input type='text' placeholder='Message...' className={styles.chatInput} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
									<Button type='submit' size='icon' className={styles.sendButton} disabled={!inputValue.trim()}>
										<Send size={14} className='sm:hidden' />
										<Send size={16} className='hidden sm:block' />
									</Button>
								</form>

								{/* Privacy notice */}
								<div className={styles.privacyNotice}>
									By chatting, you agree to our{" "}
									<a href='#' className={styles.privacyLink}>
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
