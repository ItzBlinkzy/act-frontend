import React, { useState, useRef, useEffect } from "react"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, User, Loader } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { baseApiUrl } from "@/config/constants"
import axios from "axios"

interface ChatMessage {
	role: "user" | "ai"
	content: string
}

const AiChat = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{ role: "ai", content: "Hello! How can I assist you today?" },
	])
	const [input, setInput] = useState("")
	const [loading, setLoading] = useState(false)
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
		}
	}, [messages])

	const handleSendMessage = async () => {
		if (input.trim() && !loading) {
			const userMessage: ChatMessage = { role: "user", content: input }
			setMessages((prev) => [...prev, userMessage])
			setLoading(true)

			try {
				const response = await axios.post(
					`${baseApiUrl}/chat-bot`,
					{
						context: messages.map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`).join("\n"),
						message: input,
					},
					{
						withCredentials: true,
						headers: {
							"Content-Type": "application/json",
						},
					},
				)

				const data = response.data

				setMessages((prev) => [
					...prev,
					{ role: "ai", content: data.choices[0]?.message?.content || "No response from AI" },
				])
			} catch (error) {
				console.error("Error fetching AI response:", error)
				setMessages((prev) => [
					...prev,
					{ role: "ai", content: "Sorry, I couldn't process your request at the moment. Please try again later." },
				])
			} finally {
				setLoading(false)
				setInput("")
			}
		}
	}

	return (
		<div className="flex h-screen w-full bg-gradient-to-br from-green-50 to-sky-100">
			<Sidebar />
			<div className="flex w-full flex-col p-4">
				<Card className="mb-4 border-green-200 shadow-lg">
					<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
						<CardTitle className="flex items-center text-2xl font-bold text-green-800">
							<MessageSquare className="mr-2 h-6 w-6 text-green-600" />
							AI Chat Assistant
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className="flex flex-1 flex-col border-green-200 shadow-lg">
					<CardContent className="flex flex-1 flex-col p-4">
						<ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
							<div className="flex flex-col space-y-4">
								{messages.map((message, index) => (
									<div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
										<div
											className={`flex max-w-[70%] items-start space-x-2 ${
												message.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
											}`}
										>
											<Avatar className={message.role === "user" ? "bg-green-500" : "bg-sky-500"}>
												<AvatarFallback>{message.role === "user" ? <User size={24} /> : "AI"}</AvatarFallback>
											</Avatar>
											<div
												className={`rounded-lg p-3 ${
													message.role === "user" ? "bg-green-500 text-white" : "bg-sky-100 text-sky-800"
												}`}
											>
												{message.content}
											</div>
										</div>
									</div>
								))}
								{loading && (
									<div className="flex justify-start">
										<div className="flex max-w-[70%] flex-row items-start space-x-2">
											<Avatar className="bg-sky-500">
												<AvatarFallback>AI</AvatarFallback>
											</Avatar>
											<div className="rounded-lg bg-sky-100 p-3 text-sky-800">Typing...</div>
										</div>
									</div>
								)}
							</div>
						</ScrollArea>
						<div className="mt-4 flex items-center">
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type your message here..."
								className="mr-2 flex-1 border-green-300 focus:border-green-500 focus:ring-green-500"
								onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
								disabled={loading}
							/>
							<Button
								onClick={handleSendMessage}
								className="bg-green-500 text-white hover:bg-green-600"
								disabled={loading}
							>
								{loading ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default AiChat
