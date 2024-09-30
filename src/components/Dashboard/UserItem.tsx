import React from "react"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function UserItem() {
	return (
		<div className="flex items-center justify-between gap-2 rounded-[8px] border p-2">
			<div className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-emerald-500 font-[700] text-white">
				<p>KI</p>
			</div>
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="kevin.irabor@mycit.ie" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="email1">johndoe@gmail.com</SelectItem>
					<SelectItem value="email2">kevin.irabor@mycit.ie</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
