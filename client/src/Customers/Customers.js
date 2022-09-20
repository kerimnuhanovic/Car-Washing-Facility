import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import Card from "../Card/Card"
import './customers.css'
import ProcessingBar from "../ProcessingBar/ProcessingBar"

const Customers = () => {

    const [customers, setCustomers] = useState([])
    const [customersCopy, setCustomersCopy] = useState([])
    

    useEffect(() => {
        axios.get('http://localhost:3001/customer/getAllCustomers/').then((response) => {
            
            setCustomers(response.data.customers)
            setCustomersCopy(response.data.customers)
        }).catch((err)=> {
            console.log(err)
        })

    }, [])


    
    return (
        <div>
            <Navbar/>  
            
            <ProcessingBar arr={customers} setArr={setCustomers} arrCopy={customersCopy} setArrCopy={setCustomersCopy}
            criteriaArr={['name','surname','status']} type='customer'/>
            




            <div className="customers-list">
                {customersCopy.map((el, index) => {
                    const {id,name,surname,tel, email, status} = el
                    return (<Card id={id} name={name} surname={surname} tel={tel} email={email} status={status} key={id}/>)
                })}
            </div>

        </div>
    )
}

export default Customers