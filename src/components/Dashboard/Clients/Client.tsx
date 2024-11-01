import React from "react"
import Sidebar from "../Sidebar"
import { useEffect } from "react"

const Client = () => {
	useEffect(() => {})

	// Individual client page.
	return (
		<>
			<div className="flex">
				<Sidebar />
			</div>
			<div>Individiual Client Data here..</div>
		</>
	)
}

export default Client
