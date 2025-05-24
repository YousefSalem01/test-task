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
						<p className='mt-4 text-[#6e7687]'>The E-Commerce Customer Support Suite with WhatsApp, Email, Phone and Social Media in one ticketing tool.</p>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-[#313131] mb-4'>Channels</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									WhatsApp
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Email
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Phone
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Social Media
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-[#313131] mb-4'>Support</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Book a Demo
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Features
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Blog
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									About Us
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-[#313131] mb-4'>Legal</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Imprint
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Data Processing Agreement
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Privacy Policy
								</a>
							</li>
							<li>
								<a href='#' className='text-[#6e7687] hover:text-[#4361EE]'>
									Terms of Service
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='mt-12 pt-4'>
					<p className='text-center text-[#6e7687]'>© {new Date().getFullYear()} armin.cx. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
