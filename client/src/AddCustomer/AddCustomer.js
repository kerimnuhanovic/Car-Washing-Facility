import axios from "axios"
import { useEffect, useState } from "react"
const AddCustomer = ({customers,setCustomers,customersCopy, setCustomersCopy}) => {

    
    const [customerName, setCustomerName] = useState("")
    const [customerSurname, setCustomerSurname] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerNumber, setCustomerNumber] = useState("")
    const [customerStatus, setCustomerStatus] = useState('normal')


    
    const addCustomer = () => {
        if(customerName === "" || customerSurname === "") {
            alert("Please enter name and surname of a customer")
            return;
        }
        axios.post('http://localhost:3001/customer/addCustomer/', {
            name:customerName,
            surname:customerSurname,
            email:customerEmail,
            tel:customerNumber,
            status:customerStatus
        }).then((response) => {
            const newEl = {
                id:response.data.customer_id,
                name:customerName,
                surname:customerSurname,
                email:customerEmail,
                tel:customerNumber,
                status:customerStatus
            }
            setCustomerName("")
            setCustomerEmail("")
            setCustomerNumber("")
            setCustomerSurname("")
            
            setCustomers(customers => [...customers, newEl]);
            setCustomersCopy(customersCopy => [...customersCopy, newEl])

        }).catch((err) => {
            console.log(err)
        })
        
    }


    return (
        <div>
            <button type="button" className="btn blue-button button-font" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add customer
                    </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title blue" id="staticBackdropLabel">Add customer</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body border text-center bg-image">
                        
                        <input type='text' value={customerName} onChange={(e) => {setCustomerName(e.target.value)}} className="my-2 add-input p-1" placeholder="name"/><br/>
                        <input type='text' value={customerSurname} onChange={(e) => {setCustomerSurname(e.target.value)}} className="my-2 add-input p-1" placeholder="surname"/><br/>
                        <input type='email' value={customerEmail} onChange={(e) => {setCustomerEmail(e.target.value)}} className="my-2 add-input p-1" placeholder="email"/><br/>
                        <input type='text' value={customerNumber} onChange={(e) => {setCustomerNumber(e.target.value)}} className="my-2 add-input p-1" placeholder="number"/><br/>
                        
                        <select className="sel" onChange={(e) => {setCustomerStatus(e.target.value)}}>
                            <option value='normal'>Normal</option>
                            <option value='premium'>Premium</option>
                        </select>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn blue-button" onClick={addCustomer} data-bs-dismiss="modal">Add</button>
                    </div>
                    </div>
                </div>
                </div>
                    




        </div>
    )
}
export default AddCustomer