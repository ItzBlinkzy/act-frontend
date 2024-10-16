import { useNavigate } from "react-router-dom"

const Hero = () => {
	const navigate = useNavigate()
	return (
		<section className="relative flex h-screen w-full items-center justify-center bg-cover bg-no-repeat py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="absolute inset-0 bg-stockbg bg-cover bg-no-repeat opacity-45"></div>
			<div className="container z-10 px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Trade Smarter, Not Harder
						</h1>
						<p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
							Your all-in-one platform for stocks and crypto trading. Real-time data, advanced analytics, and seamless
							transactions.
						</p>
					</div>
					<div className="flex w-full items-center justify-center gap-5">
						<button
							className="bg-green-300 p-2 outline outline-1 outline-slate-400"
							onClick={() => navigate("/dashboard")}
						>
							Get Started
						</button>
						<button
							className="bg-green-300 p-2 outline outline-1 outline-slate-400"
							onClick={() => navigate("/dashboard")}
						>
							Learn More
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
