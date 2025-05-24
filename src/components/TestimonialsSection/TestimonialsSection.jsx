import Carousel from "../../uikit/Carousel/Carousel";

const testimonials = [
	{
		name: "Philipp Riedl",
		company: "vetain",
		testimonial:
			"All channels, one AI, including ERP integration with billbee and hands-on customer support with the founders on Slack-Connect. Including WhatsApp marketing and email. It was a no-brainer for us to switch from Gorgias to armincx.",
	},
	{
		name: "Nico Schlomm",
		company: "onemate",
		testimonial: "Finally an AI workflow builder for the DACH e-commerce space.",
	},
	{
		name: "Christoph Lung",
		company: "Duschbrocken",
		testimonial: "armincx integrates with our entire tech stack and even automates Asana tickets for our logistics. I'm very impressed with the tool.",
	},
	{
		name: "Anes Hodzic",
		company: "kazaarfragrances",
		testimonial: "An AI chatbot for all channels, the best WhatsApp marketing tool, integrated with klaviyo, Shopify, billbee and 8returns. At fair conditions. We are happy.",
	},
	{
		name: "Dominik Englputzeder",
		company: "myHarry",
		testimonial: "To be honest, we are very excited about the tool. It's exactly what we need.",
	},
	{
		name: "Eren Karacabay",
		company: "vitabay",
		testimonial: "Finally an AI that doesn't hallucinate.",
	},
	{
		name: "Finn Fleischer",
		company: "FarbenLöwe",
		testimonial: "POV how to scale ecom business to 20M with 2.5 FTE in customer support",
	},
];

export function TestimonialsSection() {
	return (
		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4 max-w-6xl'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold text-[#313131]'>armincx Testimonials</h2>
					<p className='mt-4 text-lg text-[#6e7687] max-w-2xl mx-auto'>What leading E-Com brands from the DACH region say about armincx</p>
				</div>

				<div className='relative'>
					<Carousel items={testimonials} />
				</div>
			</div>
		</section>
	);
}
