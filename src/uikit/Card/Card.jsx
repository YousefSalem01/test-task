import React from "react";
import { motion } from "framer-motion";

function Card({ children, className = "", onClick, onMouseEnter, onMouseLeave, hoverEffect = true, animate = {} }) {
	return (
		<motion.div
			className={`bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-[#4361EE]/10 ${className}`}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			whileHover={
				hoverEffect
					? {
							y: -5,
							boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
					  }
					: {}
			}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			{...animate}
		>
			{children}
		</motion.div>
	);
}

export default Card;
