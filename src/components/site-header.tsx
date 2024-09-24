import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="flex h-16 w-screen space-x-4 px-5 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav} />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						{/* <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.gitHub className="h-5 w-5" />
								<span className="sr-only">GitHub</span>
							</div>
						</Link>
						<Link
							to={siteConfig.links.youtube}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.youtube className="h-5 w-5" />
								<span className="sr-only">YouTube</span>
							</div>
						</Link> */}
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	)
}
