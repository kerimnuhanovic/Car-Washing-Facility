import axios from "axios"
import { useEffect, useState } from "react"
const ProgramOrders = ({id}) => {
    const [programOrders, setProgramOrders] = useState([])
    useEffect(() => {
            axios.get(`http://localhost:3001/customer/getProgramOrders/${id}/`).then((response) => {
            
            setProgramOrders(response.data.program_orders)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                        
                    <th className="p-2">Customer</th>
                    <th className="p-2">Date</th>
                </tr>
            </thead>
            <tbody>
                {programOrders.map((obj, index) => {
                    const {name,surname,date} = obj
                    return (
                        <tr key={index}>
                            <td>{name} {surname}</td>
                            <td className="p-2">{date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ProgramOrders