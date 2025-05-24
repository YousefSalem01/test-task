import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

const steps = [
	{
		id: 1,
		number: "01",
		title: "Build & deploy your agent",
		description: "Train an agent on your business data, configure the actions it can take, then deploy it for your customers.",
	},
	{
		id: 2,
		number: "02",
		title: "Agent solves your customers' problems",
		description: "Your AI agent handles customer inquiries automatically, providing accurate information and resolving issues efficiently.",
	},
	{
		id: 3,
		number: "03",
		title: "Refine & optimize",
		description: "Continuously improve your agent's performance by analyzing interactions and refining its responses and capabilities.",
	},
	{
		id: 4,
		number: "04",
		title: "Route complex issues to a human",
		description: "When issues require human expertise, your agent seamlessly transfers the conversation to your support team.",
	},
	{
		id: 5,
		number: "05",
		title: "Review analytics & insights",
		description: "Gain valuable insights from comprehensive analytics to understand customer needs and optimize your business processes.",
	},
];

export function HowItWorks() {
	const [activeStep, setActiveStep] = useState(1);
	const [isPlaying, setIsPlaying] = useState(true);

	return (
		<section className='py-16 bg-white'>
			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
					{/* Left side - Steps */}
					<div className='space-y-4'>
						{steps.map((step) => (
							<motion.div
								key={step.id}
								className={`rounded-xl p-6 cursor-pointer transition-all ${
									activeStep === step.id ? "bg-white shadow-md border border-gray-100" : "bg-gray-50 hover:bg-gray-100/80"
								}`}
								onClick={() => setActiveStep(step.id)}
								whileHover={{ scale: activeStep === step.id ? 1 : 1.02 }}
							>
								<div className='flex items-start gap-4'>
									<div className={`text-lg font-medium ${activeStep === step.id ? "text-[#4361EE]" : "text-gray-400"}`}>{step.number}.</div>
									<div className='flex-1'>
										<h3 className={`text-lg font-medium ${activeStep === step.id ? "text-[#313131]" : "text-gray-400"}`}>{step.title}</h3>
										<div className='h-auto overflow-hidden'>
											<AnimatePresence initial={false}>
												{activeStep === step.id && (
													<motion.p
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: "auto" }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.2 }}
														className='mt-2 text-[#6e7687]'
													>
														{step.description}
													</motion.p>
												)}
											</AnimatePresence>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Right side - Video/Demo */}
					<div className='relative rounded-xl overflow-hidden bg-gradient-to-br from-[#4361EE] to-[#1FB7DD] h-[500px]'>
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='absolute inset-0 bg-gradient-to-b from-[#4361EE]/20 to-[#1FB7DD]/40'></div>

							<div className='relative z-10 w-4/5 max-w-md bg-white rounded-xl p-6 shadow-lg'>
								<div className='flex items-center justify-between mb-4'>
									<div className='flex items-center space-x-4'>
										<div className='h-10 w-10 rounded-full bg-black flex items-center justify-center'>
											<svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' fill='white' />
											</svg>
										</div>
										<div className='h-2 w-2 rounded-full bg-green-500'></div>
										<div className='h-10 w-10 rounded-full bg-green-500 flex items-center justify-center'>
											<svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path d='M12 5V19M5 12H19' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
											</svg>
										</div>
									</div>
								</div>

								<h3 className='text-xl font-semibold text-center mb-2'>Your AI Agent</h3>

								<div className='w-full h-4 bg-gray-100 rounded-full mb-4'></div>
								<div className='w-3/4 h-3 bg-gray-100 rounded-full mx-auto'></div>
							</div>

							<button
								className='absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors'
								onClick={() => setIsPlaying(!isPlaying)}
							>
								{isPlaying ? <Pause size={20} /> : <Play size={20} />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
