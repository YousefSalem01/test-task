import { motion } from "framer-motion";
import { Button } from "../../uikit/Button/Button";
import videoSrc from "../../assets/videos/invideo-ai-720 Revolutionize Your E-Commerce Support wi 2025-05-23.mp4";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
	const [isPlaying, setIsPlaying] = useState(true);
	const videoRef = useRef(null);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<section className='relative min-h-screen overflow-hidden bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] py-16 md:py-24'>
			{/* Animated background elements */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
				<motion.div
					className='absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4361EE]/5'
					animate={{
						x: [0, 50, 0],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 15,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className='absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#1FB7DD]/5'
					animate={{
						x: [0, -40, 0],
						y: [0, -40, 0],
					}}
					transition={{
						duration: 18,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					{/* Left side - Content */}
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='flex flex-col'>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-[#313131]'
						>
							The E-Commerce Customer Support Suite
						</motion.h1>

						<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className='mt-6 text-lg text-[#6e7687]'>
							WhatsApp, Email, Phone and Social Media in one ticketing tool. armincx is the only E-Commerce-first Customer Experience Suite.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className='mt-8 flex flex-col sm:flex-row gap-4'
						>
							<Button size='lg' className='rounded-full'>
								Book a Demo
							</Button>
							<Link to='/signin'>
								<Button size='lg' variant='outline' className='rounded-full'>
									Sign In
								</Button>
							</Link>
						</motion.div>

						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className='mt-12 flex items-center'>
							<div className='flex -space-x-2'>
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className='w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold'>
										{String.fromCharCode(64 + i)}
									</div>
								))}
							</div>
							<div className='ml-4'>
								<p className='text-sm font-medium text-[#313131]'>Trusted by 9000+ businesses worldwide</p>
							</div>
						</motion.div>
					</motion.div>

					{/* Right side - Video */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className='relative rounded-xl overflow-hidden shadow-2xl'
					>
						<div className='aspect-video bg-gradient-to-br from-[#4361EE] to-[#1FB7DD] relative overflow-hidden'>
							<video ref={videoRef} className='w-full h-full object-cover' autoPlay={isPlaying} muted loop playsInline src={videoSrc} />
							<div className='absolute inset-0 bg-gradient-to-r from-[#4361EE]/10 to-[#1FB7DD]/10'></div>

							{/* Video controls */}
							<button
								onClick={togglePlay}
								className='absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors'
							>
								{isPlaying ? <Pause size={20} /> : <Play size={20} />}
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
