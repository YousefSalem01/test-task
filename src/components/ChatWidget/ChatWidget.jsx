import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, MoreVertical, PlusCircle, LogOut, History } from "lucide-react";
import { Button } from "../../uikit/Button/Button";

const initialMessages = [
	{
		id: 1,
		content: "👋 Hi! I am armincx AI, ask me anything about armincx!",
		sender: "bot",
	},
	{
		id: 2,
		content: "By the way, you can create an agent like me for your website! 😊",
		sender: "bot",
	},
];

const predefinedQuestions = [
	{
		id: "q1",
		text: "What is armincx?",
		answer: "armincx is an AI-powered conversational platform that allows you to create custom AI agents trained on your data. These agents can handle customer support, answer questions, and engage with your customers 24/7 across multiple channels like WhatsApp, Email, Phone, and more.",
	},
	{
		id: "q2",
		text: "How do I add data to my agent?",
		answer: "You can add data to your armincx agent by uploading documents, connecting to your website, or integrating with your knowledge base. Our platform will automatically process and index your data to make it available for your AI agent to provide accurate responses.",
	},
	{
		id: "q3",
		text: "Is there a free plan?",
		answer: "Yes! armincx offers a free plan that allows you to create a basic AI agent with limited features. You can upgrade to our premium plans for additional capabilities, higher message limits, advanced customization options, and access to all 8 communication channels.",
	},
	{
		id: "q4",
		text: "What are AI actions?",
		answer: "AI actions allow your armincx agent to perform tasks beyond just answering questions. For example, your agent can collect user information, schedule appointments, generate content, route complex issues to human agents, or integrate with your existing tools and workflows.",
	},
];

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
		const userMessage = {
			id: messages.length + 1,
			content: inputValue,
			sender: "user",
		};

		setMessages([...messages, userMessage]);
		setInputValue("");

		// Simulate bot response
		setTimeout(() => {
			const botMessage = {
				id: messages.length + 2,
				content:
					"Thank you for your message! This is a demo of armincx AI agent. In a real implementation, I would provide intelligent responses based on your business data and help resolve customer inquiries automatically.",
				sender: "bot",
			};
			setMessages((prev) => [...prev, botMessage]);
		}, 1000);
	};

	const handleQuestionClick = (question) => {
		// Add user question
		const userMessage = {
			id: messages.length + 1,
			content: question.text,
			sender: "user",
		};

		setMessages([...messages, userMessage]);

		// Simulate bot response
		setTimeout(() => {
			const botMessage = {
				id: messages.length + 2,
				content: question.answer,
				sender: "bot",
			};
			setMessages((prev) => [...prev, botMessage]);
		}, 1000);
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
			<motion.button
				className='bg-[#4361EE] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#4361EE]/90 transition-colors cursor-pointer'
				onClick={toggleChat}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{isOpen ? <X size={24} /> : <MessageSquare size={24} />}
			</motion.button>

			{/* Chat window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className='absolute bottom-20 right-0 w-[350px] sm:w-[380px] max-w-[95vw] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200'
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						{/* Chat header */}
						<div className='bg-[#4361EE] text-white p-3 sm:p-4 flex items-center justify-between'>
							<div className='flex items-center'>
								<div className='bg-white text-[#4361EE] rounded-full w-8 h-8 flex items-center justify-center mr-2 sm:mr-3 font-bold text-sm'>C</div>
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
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 5 }}
											transition={{ duration: 0.15 }}
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
						<div className='flex flex-col h-[400px]'>
							{/* Messages area */}
							<div className={`overflow-y-auto p-3 sm:p-4 bg-gray-50 ${messages.length <= 3 ? "h-[280px]" : "h-[344px]"}`}>
								{messages.map((message) => (
									<div key={message.id} className={`mb-3 ${message.sender === "user" ? "flex justify-end" : "flex justify-start"}`}>
										{message.sender === "bot" && (
											<div className='bg-white text-[#2d2d2d] rounded-full w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center mr-2 flex-shrink-0 font-bold text-xs shadow-sm'>
												C
											</div>
										)}
										<div
											className={`rounded-2xl px-3 sm:px-4 py-2 max-w-[80%] text-xs sm:text-sm leading-relaxed cursor-pointer hover:shadow-md transition-shadow ${
												message.sender === "user"
													? "bg-[#4361EE] text-white rounded-br-md"
													: "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
											}`}
										>
											{message.content}
										</div>
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>

							{/* Quick reply buttons */}
							{messages.length <= 3 && (
								<div className='px-3 sm:px-4 py-2 sm:py-3 bg-white border-t border-gray-100'>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
										{predefinedQuestions.map((question) => (
											<button
												key={question.id}
												onClick={() => handleQuestionClick(question)}
												className='text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full py-2 px-3 text-left transition-colors cursor-pointer border border-gray-200 hover:border-gray-300'
											>
												{question.text}
											</button>
										))}
									</div>
								</div>
							)}

							{/* Chat input */}
							<div className='border-t border-gray-100 bg-white'>
								<form onSubmit={handleSend} className='p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
									<input
										type='text'
										placeholder='Message...'
										className='flex-1 border border-gray-400 rounded-full px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent'
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
									/>
									<Button
										type='submit'
										size='icon'
										className='h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-[#4361EE] hover:bg-[#4361EE]/90 flex-shrink-0'
										disabled={!inputValue.trim()}
									>
										<Send size={14} className='sm:hidden' />
										<Send size={16} className='hidden sm:block' />
									</Button>
								</form>

								{/* Privacy notice */}
								<div className='px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-xs text-gray-500 text-center'>
									By chatting, you agree to our{" "}
									<a href='#' className='text-[#4361EE] hover:underline cursor-pointer'>
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
