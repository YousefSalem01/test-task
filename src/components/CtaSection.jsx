import { Button } from "../uikit/Button/Button";

export function CTASection() {
	return (
		<section className='py-16 bg-[#4361EE]'>
			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='flex flex-col items-center text-center'>
					<h2 className='text-3xl font-bold text-white md:text-4xl'>Switch Sides</h2>
					<p className='mt-4 max-w-2xl text-lg text-white/80'>Join #teamarmin!</p>
					<div className='mt-8'>
						<Button size='lg' variant='outline' className='bg-white text-[#4361EE] hover:bg-white/90 hover:text-[#4361EE] border-0 rounded-full'>
							Book a Demo
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
