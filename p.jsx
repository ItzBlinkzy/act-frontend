<!--
// v0 by Vercel.
// https://v0.dev/t/nVC68jJ5ATs
-->

<div class="flex flex-col min-h-[100dvh]">
  <header class="px-4 lg:px-6 h-14 flex items-center">
    <a class="flex items-center justify-center" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
      </svg>
      <span class="sr-only">Acme Inc</span>
    </a>
    <nav class="ml-auto flex gap-4 sm:gap-6">
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
        Features
      </a>
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
        Pricing
      </a>
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
        About
      </a>
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
        Contact
      </a>
    </nav>
  </header>
  <main class="flex-1">
    <section class="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
      <div class="container px-4 md:px-6">
        <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div class="flex flex-col justify-center space-y-4">
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Stock Market Prediction
              </h1>
              <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Predict the future of the stock market with our AI-powered platform. Sign up now to get started.
              </p>
            </div>
            <div class="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Get Started
              </a>
              <a
                class="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Contact Sales
              </a>
            </div>
          </div>
          <img
            src="/placeholder.svg"
            width="550"
            height="550"
            alt="Hero"
            class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32">
      <div class="container space-y-12 px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="space-y-2">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">How it works</h2>
            <p class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our AI analyzes historical stock market data, news, and social media sentiment to predict future stock
              prices.
            </p>
          </div>
        </div>
        <div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <img
            src="/placeholder.svg"
            width="550"
            height="310"
            alt="Image"
            class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
          />
          <div class="flex flex-col justify-center space-y-4">
            <ul class="grid gap-6">
              <li>
                <div class="grid gap-1">
                  <h3 class="text-xl font-bold">Accurate Predictions</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Our AI uses advanced machine learning algorithms to make accurate predictions.
                  </p>
                </div>
              </li>
              <li>
                <div class="grid gap-1">
                  <h3 class="text-xl font-bold">Real-time Analysis</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Get insights into market trends and stock performance in real-time.
                  </p>
                </div>
              </li>
              <li>
                <div class="grid gap-1">
                  <h3 class="text-xl font-bold">Customized Portfolios</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Build personalized investment portfolios based on the AI's recommendations.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div class="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
        <div class="space-y-3">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience the workflow the best frontend teams love.
          </h2>
          <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.
          </p>
        </div>
        <div class="mx-auto w-full max-w-sm space-y-2">
          <form class="flex space-x-2">
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
              type="email"
              placeholder="Enter your email"
            />
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Sign up to get notified when we launch.
            <a class="underline underline-offset-2" href="#">
              Terms &amp; Conditions
            </a>
          </p>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32">
      <div class="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience the workflow the best frontend teams love.
          </h2>
          <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.
          </p>
        </div>
        <div class="flex space-x-4 lg:justify-end">
          <a
            class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
            href="#"
          >
            Contact Sales
          </a>
          <a
            class="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
            href="#"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32 border-t">
      <div class="container px-4 md:px-6">
        <div class="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
          <div class="space-y-4">
            <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Performance</div>
            <h2 class="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Traffic spikes should be exciting, not scary.
            </h2>
            <a
              class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Get Started
            </a>
          </div>
          <div class="flex flex-col items-start space-y-4">
            <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Security</div>
            <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Fully managed infrastructure designed to scale dynamically with your traffic, a global edge to ensure
              your site is fast for every customer, and the tools to monitor every aspect of your app.
            </p>
            <a
              class="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p class="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
      <a class="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </a>
      <a class="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </a>
    </nav>
  </footer>
</div>