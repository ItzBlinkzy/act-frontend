import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Hero = () => {
	const navigate = useNavigate()

	return (
		<section className="relative flex h-screen w-full items-center justify-center bg-stockbg bg-cover bg-no-repeat py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="absolute z-0 bg-stockbg bg-cover bg-no-repeat"></div>
			<div className="absolute inset-0"></div>
			<div className="container z-10 px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter text-green-950 sm:text-4xl md:text-5xl lg:text-6xl/none">
							Trade Smarter, Not Harder
						</h1>
						<p className="mx-auto max-w-[900px] text-sky-700 md:text-2xl">
							Your all-in-one platform for stocks and crypto trading. Real-time data, advanced analytics, and seamless
							transactions powered by AI.
						</p>
					</div>
					<div className="flex w-full items-center justify-center gap-5">
						<Button
							className="rounded-md bg-green-500 p-7 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-green-600 hover:shadow-xl"
							onClick={() => navigate("/dashboard")}
						>
							Get Started
						</Button>
						<Button
							className="rounded-md bg-sky-500 p-7 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-sky-600 hover:shadow-xl"
							onClick={() => navigate("/dashboard")}
						>
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
