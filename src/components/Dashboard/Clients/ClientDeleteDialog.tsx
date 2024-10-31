import React, { useState } from "react"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog" // Import these components accordingly

const ClientDeleteDialog = ({ alertDialogOpen, setAlertDialogOpen, clientToDelete, handleDeleteClient }) => {
	const [inputValue, setInputValue] = useState("")

	const isDeleteEnabled = inputValue === clientToDelete?.company_name

	return (
		<AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-green-800">Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete <span className="font-bold text-sky-700">{clientToDelete?.company_name}</span>{" "}
						and remove their data from our servers. This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="mt-4">
					<p className="text-sm text-gray-700">
						Please type <span className="font-bold text-sky-700">{clientToDelete?.company_name}</span> to confirm.
					</p>
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Enter client name"
						className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-green-500"
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDeleteClient(clientToDelete)}
						className="bg-red-600 text-white hover:bg-red-700"
						disabled={!isDeleteEnabled}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ClientDeleteDialog
