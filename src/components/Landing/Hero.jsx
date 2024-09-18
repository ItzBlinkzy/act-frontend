import Button from "../subcomponents/Button";
const Hero = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Trade Smarter, Not Harder
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Your all-in-one platform for stocks and crypto trading. Real-time
              data, advanced analytics, and seamless transactions.
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-5">
            <Button link="/">Get Started</Button>
            <Button>Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
