import Hero from "@/components/Landing/Hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Landing = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-white to-green-100">
			<Hero />
			<section className="w-full bg-gradient-to-r from-green-200 to-sky-200 py-12 text-center md:py-24 lg:py-32">
				<div className="flex w-full flex-col items-center justify-center space-y-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-5xl">How it works</h2>
							<p className="max-w-[900px] text-sky-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Our AI analyzes historical stock market data to provide accurate predictions and insights. Experience
								the power of advanced machine learning in your investment decisions.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
						<img
							src="https://picsum.photos/550/"
							width="550"
							height="310"
							alt="AI Trading Visualization"
							className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
						/>
						<div className="flex flex-col justify-center space-y-4">
							<ul className="grid gap-6">
								<li className="rounded-lg bg-white p-4 shadow-md">
									<div className="grid gap-1">
										<h3 className="text-xl font-bold text-green-700">Accurate Predictions</h3>
										<p className="text-sm text-sky-600">
											Our AI uses advanced machine learning algorithms to make accurate predictions, giving you a
											competitive edge in the market.
										</p>
									</div>
								</li>
								<li className="rounded-lg bg-white p-4 shadow-md">
									<div className="grid gap-1">
										<h3 className="text-xl font-bold text-green-700">Real-time Analysis</h3>
										<p className="text-sm text-sky-600">
											Get insights into market trends and stock performance in real-time, allowing you to make informed
											decisions quickly.
										</p>
									</div>
								</li>
								<li className="rounded-lg bg-white p-4 shadow-md">
									<div className="grid gap-1">
										<h3 className="text-xl font-bold text-green-700">Customized Portfolios</h3>
										<p className="text-sm text-sky-600">
											Build personalized investment portfolios based on the AI's recommendations, tailored to your risk
											tolerance and financial goals.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="flex w-full justify-center bg-gradient-to-r from-green-100 to-sky-100 py-12 md:py-24 lg:py-32">
				<div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
					<div className="space-y-3">
						<h2 className="text-3xl font-bold tracking-tighter text-green-800 md:text-4xl/tight">
							Experience the Advanced AI trader today!
						</h2>
						<p className="mx-auto max-w-[600px] text-sky-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Join our community of successful traders and investors. Let our AI-powered platform guide you to better
							investment decisions.
						</p>
					</div>
					<div className="mx-auto w-full max-w-sm space-y-2">
						<form className="flex space-x-2">
							<Input
								className="flex-1 border-green-300 focus:border-green-500 focus:ring-green-500"
								type="email"
								placeholder="Enter your email"
							/>
							<Button className="bg-green-500 text-white hover:bg-green-600" type="submit">
								Sign Up
							</Button>
						</form>
						<p className="text-xs text-sky-600">
							Sign up to get notified when we launch.
							<a className="text-green-700 underline underline-offset-2 hover:text-green-800" href="#">
								Terms &amp; Conditions
							</a>
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Landing
