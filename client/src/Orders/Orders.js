import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"

import ProcessingBar from "../ProcessingBar/ProcessingBar"
const Orders = () => {
    const [orders, setOrders] = useState([])
    const [ordersCopy, setOrdersCopy] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:3001/customer/getAllOrders/').then((response) => {
            
            setOrders(response.data.orders)
            setOrdersCopy(response.data.orders)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <Navbar/>
            <ProcessingBar arr={orders} setArr={setOrders} arrCopy={ordersCopy} setArrCopy={setOrdersCopy} 
            criteriaArr={['name', 'surname', 'program', 'price']} type='orders'/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Program</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersCopy.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{order.name} {order.surname}</td>
                                <td>{order.program}</td>
                                <td>{order.price} BAM</td>
                                <td>{order.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Orders