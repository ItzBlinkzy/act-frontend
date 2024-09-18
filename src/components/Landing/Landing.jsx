import React from "react";
import Navbar from "../Navbar";
import Button from "../subcomponents/Button";
import Hero from "./Hero";
const Landing = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Navbar />
      <Hero />
      <section className="w-full bg-green-100 py-12 text-center md:py-24 lg:py-32">
        <div className="flex w-full flex-col items-center justify-center space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How it works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI analyzes historical stock market data more more Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
                enim saepe quidem!
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="https://picsum.photos/550/"
              width="550"
              height="310"
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Accurate Predictions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Our AI uses advanced machine learning algorithms to make
                      accurate predictions.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Real-time Analysis</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get insights into market trends and stock performance in
                      real-time.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Customized Portfolios</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Build personalized investment portfolios based on the
                      AI&apos;s recommendations.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="b flex h-screen w-full justify-center bg-gray-100 py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Experience the Advanced AI trader today!
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate laudantium officiis obcaecati!
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <input
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full max-w-lg flex-1 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter your email"
              />
              <Button
                className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign up to get notified when we launch.
              <a className="underline underline-offset-2" href="#">
                Terms &amp; Conditions
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
