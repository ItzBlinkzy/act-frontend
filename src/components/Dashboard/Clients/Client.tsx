import React from "react"
import Sidebar from "../Sidebar"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableHeader, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useEffect } from "react"
import { baseAPIURL } from "@/config/constants"
import axios from "axios"

interface Stock {
	symbol: string
	name: string
	quantity: number
	currentPrice: number
	totalValue: number
	change: number
}
interface IClient {
	id: string
	company_name: string
	created_at: string
	updated_at: string
	deleted_at: Date | null
}
const performanceData = [
	{ month: "Jan", value: 4000 },
	{ month: "Feb", value: 3000 },
	{ month: "Mar", value: 5000 },
	{ month: "Apr", value: 4500 },
	{ month: "May", value: 6000 },
	{ month: "Jun", value: 5500 },
]

const assetAllocationData = [
	{ name: "Stocks", value: 70 },
	{ name: "Bonds", value: 20 },
	{ name: "Cash", value: 10 },
]

const Client = () => {
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
	const [currentClients, setCurrentClients] = useState<IClient | null>()

	useEffect(() => {
		const getClientStockData = async () => {
			const response = await axios.get(`${baseAPIURL}/`)
		}

		// get list of all currentClients

		// client.foreach
	})

	const handleRemoveClient = () => {}
	const handleAddStock = () => {}

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
