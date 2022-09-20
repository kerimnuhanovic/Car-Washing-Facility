import axios from "axios"
import { useEffect, useState } from "react"
import './addOrder.css'

const AddOrder = ({orders,setOrders,ordersCopy,setOrdersCopy}) => {
    const [customers, setCustomers] = useState([])
    const [programs, setPrograms] = useState([])
    //programName i datum fale
    const [customerName, setCustomerName] = useState("")
    const [customerSurname, setCustomerSurname] = useState("")
    const [customerID, setCustomerID] = useState(null)
    const [discount, setDiscount] = useState(0)
    const [programID, setProgramID] = useState(null)
    const [programPrice, setProgramPrice] = useState(null)
    const [programName, setProgramName] = useState("")
    const [price, setPrice] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:3001/customer/getDataForAddOrder/').then((response) => {
            setCustomers(response.data.customers)
            
            setPrograms(response.data.programs)
            
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const calculateDiscount = (id) => {
        let counter = 0
        
        for(let i = 0; i < orders.length; i++) {
            if(orders[i].customer_id === id)
                counter += 1
        }
        if(counter < 10)
            return 0
        else if(counter < 20)
            return 0.05
        else if(counter < 30)
            return 0.1
        else if(counter < 40)
            return 0.15
        else return 0.2
    }

    const setData = () => {
        if(customerName === "") {
            setCustomerName(customers[0].name)
            setCustomerSurname(customers[0].surname)
            setCustomerID(customers[0].id)
            setProgramID(programs[0].id)
            setProgramPrice(programs[0].price)
            setProgramName(programs[0].name)
            let discount_ = calculateDiscount(customers[0].id)
            
            if(customers[0].status === 'premium')
                discount_ += 0.05
            setDiscount(discount_)
            setPrice(programs[0].price - discount_*programs[0].price)
        }
    }
    const updateCustomer = (e) => {
        const helper = e[0].value.split(',');
        setCustomerName(helper[0])
        setCustomerSurname(helper[1])
        setCustomerID(parseInt(helper[2]))
        
        let discount_ = calculateDiscount(parseInt(helper[2]))

        if(helper[3] === 'premium')
            discount_ += 0.05
        setDiscount(discount_)
        setPrice(programPrice - discount_*programPrice)
    }
    const updateProgram = (e) => {
        const helper = e[0].value.split(',')
        setProgramID(parseInt(helper[0]))
        setProgramPrice(parseInt(helper[1]))
        setProgramName(helper[2])
        
        setPrice(parseInt(helper[1]) - discount*parseInt(helper[1]))
    }
    const addOrder = () => {
        
        axios.post('http://localhost:3001/customer/addOrder/', {
            customer_id:customerID,
            program_id:programID,
            discount:discount,
            price:price
        }).then((response) => {
            const d = new Date(response.data.date)
            
            
            const newEl = {
                customer_id:customerID,
                date:d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear(),
                name:customerName,
                price:price,
                program:programName,
                program_id:programID,
                surname:customerSurname
            }         
              
            setOrders(orders => [...orders,newEl]);
            setOrdersCopy(ordersCopy => [...ordersCopy, newEl])
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            <button type="button" className="btn blue-button button-font" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                onClick={setData}>
                        Add Order
                    </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title blue" id="staticBackdropLabel">Add order</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body border text-center bg-image">
                        <select className="sel" onChange={(e) => updateCustomer(e.target.selectedOptions)}>
                            {customers.map((customer) => {
                                return (
                                    
                                    <option key= {customer.id} value={`${customer.name},${customer.surname},${customer.id},${customer.status}`}>
                                        {customer.name} {customer.surname}</option>
                                )
                            })}
                        </select>
                        <br/>
                        <select className="sel" onChange={(e) => updateProgram(e.target.selectedOptions)}>
                            {programs.map((program) => {
                                return (
                                    <option key={program.id} value={`${program.id},${program.price},${program.name}`}>
                                        {program.name}        
                                    </option>
                                )
                            })}
                        </select>
                        <p className="text-white mt-2 mb-0">{customerName} {customerSurname} has {discount*100}% discount</p>
                        <p className="text-white mt-0">Cost: {price} BAM</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn blue-button" data-bs-dismiss="modal" onClick={addOrder}>Add</button>
                    </div>
                    </div>
                </div>
                </div>
                    




        </div>
    )
}
export default AddOrder