import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import BarChart from "../Charts/BarChart"
import '../Charts/charts.css'
import PieChart from "../Charts/PieChart"
const Home = () => {
    const [topCustomers, setTopCustomers] = useState(null)
    const [topPrograms, setTopPrograms] = useState(null)
    
    useEffect(() => {
        axios.get('http://localhost:3001/customer/getStatistics/').then((response) => {
            
            setTopCustomers({
                labels:response.data.top_customers.map((obj) => obj.customer),
                datasets: [
                    {
                        label:"Top 5 customers",
                        data: response.data.top_customers.map((obj) => obj.count),
                        backgroundColor: ['#003f5c',
                            '#58508d',
                            '#bc5090',
                            '#ff6361',
                            '#ffa600'],
                        borderColor:"black",
                        borderWidth:2
                    }
                ]
            })
            setTopPrograms({
                labels:response.data.top_programs.map((obj) => obj.name),
                datasets: [
                    {
                        label:"Top 5 programs",
                        data: response.data.top_customers.map((obj) => obj.count),
                        backgroundColor: ['#003f5c',
                            '#58508d',
                            '#bc5090',
                            '#ff6361',
                            '#ffa600'],
                        borderColor:"black",
                        borderWidth:2
                    }
                ]
            })

        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div>
            <Navbar/>
            <h3 className="text-center mt-4 display-6 stats-h">Statistics</h3>
            {topCustomers !== null && topPrograms !== null? 
            
            <div className="mt-3 charts">
                <div className="chart-div-bar">   
                
                    <BarChart data={topCustomers}/> 
                </div>
                <div className="chart-div-pie mb-3 mb-md-2 ">
                    
                    <PieChart data={topPrograms}/>
                </div>
            </div>
            : <div></div>}
        </div>
    )
}
export default Home