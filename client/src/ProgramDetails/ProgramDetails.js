import axios from "axios"
import { useState, useEffect } from "react"
import './programDetails.css'
import ProgramOrders from "../ProgramOrders/ProgramOrders"
const ProgramDetails = ({id}) => {
    const [programDetails, setProgramDetails] = useState([])
    useEffect(() => {
        
        axios.get(`http://localhost:3001/customer/getProgramDetails/${id}/`).then((response) => {
            
            setProgramDetails(response.data.program_details)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <h1 className="mt-4 mx-3 program-details-h">{programDetails !== [] ? programDetails[0]?.name: ""}</h1>
            <div className="mt-2 mx-3">
                {programDetails?.map((obj, index) => {
                    return (
                        <p className="program-steps" key={index}>- {obj.type}</p>
                    )
                })}
            </div>
            <ProgramOrders id={id}/>
            

        </div>
    )
}
export default ProgramDetails