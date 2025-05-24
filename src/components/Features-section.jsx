import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const features = [
	{
		icon: <FaWhatsapp className='h-6 w-6' />,
		title: "WhatsApp",
		description: "Send personalized WhatsApp newsletters, automate workflows with Flows and let AI handle your WhatsApp support.",
	},
	{
		icon: <Phone className='h-6 w-6' />,
		title: "Phone",
		description: "Automate up to 95% of your phone support requests with a smart AI agent that knows your entire product portfolio in detail.",
	},
	{
		icon: <Mail className='h-6 w-6' />,
		title: "Email",
		description: "Save valuable time in support with AI assistants that independently answer customer inquiries and perform actions like address changes or cancellations.",
	},
	{
		icon: <Users className='h-6 w-6' />,
		title: "Social Media",
		description:
			"Let AI automatically respond to your social media comments and DMs. Let the AI interact directly or review the message beforehand and send it with just one click.",
	},
];

export function FeaturesSection() {
	const [hoveredIndex, setHoveredIndex] = useState(null);

	return (
		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold text-[#313131]'>All Channels, One Solution</h2>
					<p className='mt-4 text-lg text-[#6e7687] max-w-2xl mx-auto'>armincx unites all features centrally in one ticketing tool</p>
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
