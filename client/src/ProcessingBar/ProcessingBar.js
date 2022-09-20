import AddCustomer from "../AddCustomer/AddCustomer"
import SortDropdown from "../SortDropdown/SortDropdown"
import Search from "../Search/Search"
import AddProgram from "../AddProgram/AddProgram"
import { useEffect } from "react"
import AddOrder from "../AddOrder/AddOrder"
const ProcessingBar = ({arr, setArr, arrCopy, setArrCopy, criteriaArr, type}) => {

    


    return (
        <div className="mt-3 mx-2 processing-div">
                <div className="buttons-div">
                    {/*Dodat props u processing bar na osnovu kojeg cemo rendati ili add customer ili add washing program ili add order */}
                    {type === 'customer' ?<AddCustomer customers={arr} setCustomers={setArr} customersCopy={arrCopy} setCustomersCopy={setArrCopy}/>
                    :type ==='program' ? <AddProgram programs={arr} setPrograms={setArr} programsCopy={arrCopy}
                    setProgramsCopy={setArrCopy}/>:type === 'orders' ? <AddOrder orders={arr} setOrders={setArr}
                    ordersCopy={arrCopy} setOrdersCopy={setArrCopy}/> : <div></div>}
                    <SortDropdown criteriaArr={criteriaArr} arr={arr} arrCopy={arrCopy} setArr={setArr}
                    setArrCopy={setArrCopy}/>
                    

                </div>
                <Search arr={arr} setArrCopy={setArrCopy} type={type}/>
            </div> 

    )
}

export default ProcessingBar