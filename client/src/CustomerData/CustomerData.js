import { useEffect } from "react"
import './customerData.css'
const CustomerData = ({id, name,surname, email, status, tel}) => {
    
    return (
        <div className="mt-3 mx-3">
            <p className="customer-data-name">{name} {surname}</p>
            <p className="m-0">Tel: {tel}</p>
            <p className="m-0">Email: {email}</p>
            <p className="m-0">Status: {status}</p>
        </div>
    )
}
export default CustomerData