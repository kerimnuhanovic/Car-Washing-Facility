import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import ProgramDetails from "../ProgramDetails/ProgramDetails"

const Program = () => {
    const {id} = useParams()
    
    return (
        <div>
            <Navbar/>
            <ProgramDetails id={id}/>
        </div>
    )
}

export default Program