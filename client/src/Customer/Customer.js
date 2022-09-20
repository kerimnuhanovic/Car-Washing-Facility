import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import CustomerData from "../CustomerData/CustomerData"
const Customer = () => {
    const {id} = useParams()
    const [customerOrders, setCustomerOrders] = useState([])
    const [customer, setCustomer] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3001/customer/getCustomerOrders/${id}/`).then((response) => {
            
            setCustomerOrders(response.data.customer_orders)
            
            setCustomer(response.data.customer[0])
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <Navbar/>
            <CustomerData name={customer?.name} surname={customer?.surname} id={customer?.id}
            email={customer?.email} tel={customer?.tel} status={customer?.status}/>
            
            <h3 className="mx-3 my-3 customer-data-name">{customer?.name}'s orders</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        
                        <th>Program</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {customerOrders.map(((order, index) => {
                    return (
                        <tr key={index}>
                            <td>{order.program_name}</td>
                            <td>{order.date}</td>
                            <td>{order.price} BAM</td>
                        </tr>
                    )
                }))}
                
                </tbody>
            </table>
        </div>
    )
}
export default Customer