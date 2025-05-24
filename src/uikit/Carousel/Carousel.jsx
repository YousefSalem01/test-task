import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "../../components/TestimonialsSection/TestimonialCard";

const Carousel = ({ items }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Auto play logic
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, items.length]);

	const handlePrevClick = () => {
		setIsAutoPlaying(false);
		setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
	};

	const handleNextClick = () => {
		setIsAutoPlaying(false);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
	};

	// CSS variables moved to inline styles
	const cssVariables = {
		"--num": items.length,
		"--carouselWidth": "100%",
		"--carouselLeftMargin": "0px",
		"--cardWidth": "20%",
		"--card-margin": "10px",
	};

	return (
		<div className='relative overflow-hidden py-8' style={cssVariables}>
			{/* Navigation buttons */}
			<div className='absolute top-1/2 left-4 z-10 transform -translate-y-1/2'>
				<button onClick={handlePrevClick} className='w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100'>
					<ChevronLeft size={20} />
				</button>
			</div>

			<div className='absolute top-1/2 right-4 z-10 transform -translate-y-1/2'>
				<button onClick={handleNextClick} className='w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100'>
					<ChevronRight size={20} />
				</button>
			</div>

			{/* Carousel content */}
			<div className='flex transition-transform duration-500 ease-in-out' style={{ transform: `translateX(-${currentIndex * (100 / items.length)}%)` }}>
				{items.map((item, index) => (
					<div key={index} className='min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4'>
						<TestimonialCard testimonial={item} index={index} />
					</div>
				))}
			</div>

			{/* Pagination indicators */}
			<div className='flex justify-center mt-6'>
				{items.map((_, idx) => (
					<button
						key={idx}
						className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-[#4361EE] w-6" : "bg-gray-300"}`}
						onClick={() => {
							setIsAutoPlaying(false);
							setCurrentIndex(idx);
						}}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;
