import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Zap, BarChart3, Users } from "lucide-react";

const features = [
	{
		icon: <MessageSquare className='h-6 w-6' />,
		title: "Natural Conversations",
		description: "Engage customers with human-like conversations that understand context and intent.",
	},
	{
		icon: <Zap className='h-6 w-6' />,
		title: "Instant Responses",
		description: "Provide immediate answers to customer questions, available 24/7 without waiting.",
	},
	{
		icon: <BarChart3 className='h-6 w-6' />,
		title: "Actionable Insights",
		description: "Gain valuable data on customer needs and behavior to improve your business.",
	},
	{
		icon: <Users className='h-6 w-6' />,
		title: "Seamless Handoff",
		description: "Transition complex issues to human agents without losing conversation context.",
	},
];

export function FeaturesSection() {
	const [hoveredIndex, setHoveredIndex] = useState(null);

	return (
		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold text-[#313131]'>Powerful Features</h2>
					<p className='mt-4 text-lg text-[#6e7687] max-w-2xl mx-auto'>Our platform provides everything you need to create exceptional AI-driven customer experiences</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className='bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-[#4361EE]/10 cursor-pointer'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{
								y: -5,
								boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							onHoverStart={() => setHoveredIndex(index)}
							onHoverEnd={() => setHoveredIndex(null)}
						>
							<motion.div
								className='h-12 w-12 rounded-lg bg-[#4361EE]/10 flex items-center justify-center text-[#4361EE] mb-4'
								animate={{
									scale: hoveredIndex === index ? 1.1 : 1,
									rotate: hoveredIndex === index ? 5 : 0,
								}}
								transition={{ type: "spring", stiffness: 300 }}
							>
								{feature.icon}
							</motion.div>
							<h3 className='text-xl font-semibold text-[#313131] mb-2'>{feature.title}</h3>
							<p className='text-[#6e7687]'>{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
