export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: "Vite",
	description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
	mainNav: [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Dashboard",
			href: "/dashboard",
		},
		{
			title: "Purchase Credit",
			href: "/dashboard/credit",
		},
	],
	links: {
		youtube: "https://youtube.com/",
	},
}
