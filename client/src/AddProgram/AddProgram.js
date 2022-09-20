import axios from "axios"
import { useEffect, useState } from "react"

const AddProgram = ({programs,setPrograms,programsCopy,setProgramsCopy}) => {
    const [newStep, setNewStep] = useState("")
    const [showAddStep, setShowAddStep] = useState(false)
    const [showAddProgram, setShowAddProgram] = useState(false)

    const [programName, setProgramName] = useState("")
    const [price, setPrice] = useState(0)

    const [steps, setSteps] = useState([])

    const [selectedSteps, setSelectedSteps] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3001/customer/getAllSteps/').then((response) => {

            setSteps(response.data.steps)
            
        }).catch((err) => {
            console.log(err)
        } )
    }, [])


    const addStep = () => {
        
        axios.post('http://localhost:3001/customer/addStep/', {
            step:newStep
        }).then((response) => {
            const newEl = {
                id:response.data.id,
                type:newStep
            }
            setNewStep("")
            setSteps(steps => [...steps, newEl]);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSelect = (selectedItems) => {
        
        const helper = []
        for(let i = 0; i < selectedItems.length; i++) {
            helper.push(selectedItems[i].value);
        }
        setSelectedSteps(helper)
        
    }


    const addProgram = () => {
        let helperString = ""
        for(let i = 0; i <selectedSteps.length-1;i++) {
            helperString += selectedSteps[i] + ","
        }
        helperString += selectedSteps[selectedSteps.length-1]
        
        axios.post('http://localhost:3001/customer/addProgram/', {
            name:programName,
            price:price,
            steps:helperString
        }).then((response) => {
            
            const newEl = {
                id:response.data.program_id,
                name:programName,
                price:price
            }
            
            setPrograms(programs => [...programs, newEl]);
            setProgramsCopy(programsCopy => [...programsCopy, newEl])
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <button type="button" className="btn blue-button button-font" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add program
                    </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title blue" id="staticBackdropLabel">Add washing program</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body border text-center bg-image">
                        {!showAddStep ? <button className="btn blue-button" onClick={()=>{setShowAddStep(!showAddStep)}}>Add new step</button> : 
                        <div></div>}
                        {showAddStep ? 
                            <div>
                                <input type='text' value={newStep} onChange={(e) => {setNewStep(e.target.value)}} className="my-2 add-input p-1" placeholder="New step"/><br/>
                                <div>
                                    <button className="btn blue-button mx-1" onClick={()=>{setShowAddStep(!showAddStep)}}>Close</button>
                                    <button className="btn blue-button" onClick={addStep}>Add step</button>
                                </div>
                            </div>:<div></div>}

                        {!showAddProgram ? <button className="btn blue-button mt-1" onClick={()=>{setShowAddProgram(!showAddProgram)}}>Add program</button>:
                        <div></div>}
                        {showAddProgram ? 
                            <div>
                                <input type='text' value={programName} onChange={(e) => {setProgramName(e.target.value)}} className="my-2 add-input p-1" placeholder="Program name"/><br/>
                                <input type='number' step="0.01" value={price} onChange={(e) => {setPrice(e.target.value)}} className="my-2 add-input p-1" placeholder="Price"/><br/>
                                <select multiple onChange={(e)=> {handleSelect(e.target.selectedOptions)}}>
                                    {steps.map((obj) => {
                                        return (
                                            <option key={obj.id} value={obj.id}>{obj.type}</option>  )      
                                    })}
                                </select>
                                        
                            </div>
                        :<div></div>}    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn blue-button"  data-bs-dismiss="modal" onClick={addProgram}>Add</button>
                    </div>
                    </div>
                </div>
                </div>
                    




        </div>
    )
}
export default AddProgram