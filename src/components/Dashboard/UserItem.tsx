import React from "react"

export default function UserItem() {
	return (
		<div className="flex items-center justify-between gap-2 rounded-[8px] border p-2">
			<div className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-emerald-500 font-[700] text-white">
				<p>KI</p>
			</div>
			<div className="grow">
				<p className="text-[16px] font-bold">Kevin Irabor</p>
				<p className="text-[12px] text-neutral-500">kevin.irabor@mycit.ie</p>
			</div>
		</div>
	)
}
