import { Icons } from "@/components/icons"
// import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types/nav"
import { Link } from "react-router-dom"
import useStore, { StoreModel } from "@/store/useStore"
interface MainNavProps {
	items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
	const user = useStore((state: StoreModel) => state.user)

	const userCredit = user?.credit
	console.log(userCredit)
	return (
		<div className="mx-5 flex w-full justify-between">
			<div className="flex items-center space-x-2">
				<Link to="/" className="flex items-center space-x-2">
					<Icons.logo className="h-6 w-6" />
					<span className="inline-block font-bold">ACT</span>
				</Link>
				{items?.length ? (
					<nav className="flex gap-6 pl-5">
						{items.map(
							(item, index) =>
								item.href && (
									<Link
										key={index}
										to={item.href}  
										className={cn(
											"flex items-center text-sm font-medium text-muted-foreground hover:text-green-500",
											item.disabled && "cursor-not-allowed opacity-80",
										)}
									>
										{item.title}
									</Link>
								),
						)}
					</nav>
				) : null}
			</div>
			{user?.email && (
				<div className="mr-4 flex items-center ">
					<span className="min-h-10 min-w-10 rounded-l-sm border border-r-0 border-slate-500 p-2 text-sm font-bold text-green-600">
						{`$${userCredit?.toFixed(2) || "N/A"}`}
					</span>
					<span
						className="min-h-10 min-w-10 rounded-r-sm border border-slate-500 p-2 text-sm font-medium text-sky-600"
						style={{ borderLeftColor: "rgb(203, 213, 225)" }}
					>
						Available Credit
					</span>
				</div>
			)}
		</div>
	)
}
