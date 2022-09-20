import {Bar} from "react-chartjs-2"

import {Chart as ChartJS} from "chart.js/auto"
import { useEffect } from "react"
const BarChart = ({data}) => {
    useEffect(()=> {
        console.log(data)
    }, [])
    return <Bar data={data} />
}

export default BarChart