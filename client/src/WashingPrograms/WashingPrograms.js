import Navbar from "../Navbar/Navbar"
import { useState, useEffect } from "react"
import axios from "axios"
import ProcessingBar from "../ProcessingBar/ProcessingBar"
import './washingProgram.css'
import { Link } from "react-router-dom"
const WashingPrograms = () => {
    const [programs, setPrograms] = useState([])
    const [programsCopy, setProgramsCopy] = useState([])
    

    useEffect(() => {
        axios.get('http://localhost:3001/customer/getAllPrograms/').then((response) => {
            
            setPrograms(response.data.programs)
            setProgramsCopy(response.data.programs)
            
        }).catch((err)=> {
            console.log(err)
        })

    }, [])


    return (
        <div>
            <Navbar/>

            
            <ProcessingBar arr={programs} setArr={setPrograms} arrCopy={programsCopy} setArrCopy={setProgramsCopy}
            criteriaArr={['name','price']} type='program'/>

            <table className="table table-striped">
                <thead>
                    <tr>
                            
                        <th className="p-2">Program</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {programsCopy?.map((program) => {
                        return (
                            <tr key={program.id}>
                                <td className="p-2">{program.name}</td>
                                <td className="p-2">{program.price} <span>BAM</span></td>
                                <td className="p-2"><Link to={'/program/' + program.id} className="details-link p-0">See details</Link></td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default WashingPrograms