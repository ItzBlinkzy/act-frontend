import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import ApexCharts from "react-apexcharts"
import Sidebar from "@/components/Dashboard/Sidebar"
import axios from "axios"
import { baseAiUrl } from "@/config/constants"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const IndividualAsset = () => {
	const params = useParams()
	const ticker = params?.ticker

	const [historicalData, setHistoricalData] = useState([])
	const [companyData, setCompanyData] = useState({})

	useEffect(() => {
		const getStockHistory = async () => {
			const response = await axios.post(`${baseAiUrl}/api/search-stock-by-ticker`, { stock_ticker: ticker })
			console.log(response)
			setHistoricalData(response.data.historical_data.slice(0, 200))
			setCompanyData(response.data.stock_data)
			setCompanyData({ ...companyData, company_name: response.data.company_name })
		}
		getStockHistory()
	}, [ticker])

	const candlestickSeries = useMemo(
		() => [
			{
				data: historicalData.map((data) => ({
					x: new Date(data.Date),
					y: [
						parseFloat(data.Open.toFixed(2)),
						parseFloat(data.High.toFixed(2)),
						parseFloat(data.Low.toFixed(2)),
						parseFloat(data.Close.toFixed(2)),
					],
				})),
			},
		],
		[historicalData], // Only recalculate if historicalData changes
	)

	const chartOptions = useMemo(
		() => ({
			chart: {
				type: "candlestick",
				height: 350,
				id: "candlestick-chart",
				zoom: {
					enabled: true,
					autoScaleYaxis: true,
				},
				toolbar: {
					autoSelected: "zoom",
					tools: {
						zoomin: true,
						zoomout: true,
						pan: true,
						reset: true,
					},
				},
			},
			title: {
				text: `${ticker} Price Movements`,
				align: "center",
			},
			xaxis: {
				type: "datetime",
			},
			yaxis: {
				tooltip: {
					enabled: true,
				},
			},
		}),
		[ticker], // Recalculate options only when the ticker changes
	)

	return (
		<div className="flex h-full w-full">
			<Sidebar />
			<div className="w-full p-4">
				<Card className="m-4 p-0">
					<CardHeader>
						<CardTitle className="p-0 text-3xl font-normal">
							{companyData.company_name} (${ticker})
						</CardTitle>
						<CardContent>
							{/* Candlestick Chart */}
							<div className="mb-8">
								<ApexCharts options={chartOptions} series={candlestickSeries} type="candlestick" height={350} />
							</div>
						</CardContent>
					</CardHeader>
				</Card>
			</div>
		</div>
	)
}

export default IndividualAsset
