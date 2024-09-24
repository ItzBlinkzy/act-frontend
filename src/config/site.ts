export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: "Vite",
	description:
		"Beautifully designed components built with Radix UI and Tailwind CSS.",
	mainNav: [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Dashboard",
			href: "/dashboard",
		},
	],
	links: {
		youtube: "https://youtube.com/",
	},
}
