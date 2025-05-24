export function Footer() {
	return (
		<footer className='bg-white py-12 border-t'>
			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
					<div>
						<div className='flex items-center'>
							<span className='text-2xl font-bold text-[#4361EE]'>armin</span>
							<span className='text-xl font-bold bg-gradient-to-r from-[#4361EE] to-[#1FB7DD] bg-clip-text text-transparent'>cx</span>
						</div>
						<p className='mt-4 text-[#6e7687]'>Transforming customer experiences with conversational AI</p>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-[#313131] mb-4'>Product</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Features
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Pricing
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Integrations
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Roadmap
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-[#313131] mb-4'>Resources</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Documentation
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Guides
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									API Reference
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Blog
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-[#313131] mb-4'>Company</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									About
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Careers
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Contact
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Legal
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='mt-12 border-t pt-8'>
					<p className='text-center text-[#6e7687]'>© {new Date().getFullYear()} armin.cx. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
