
import { useEffect, useState } from "react"
const Search = ({arr,setArrCopy, type}) => {
    const [search, setSearch] = useState("")

    const filterArr = (e) => {
        setSearch(e.target.value)
        let helper = []
        if(type === 'customer' || type === 'orders') {
            helper = arr.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
            obj.surname.toLowerCase().includes(e.target.value.toLowerCase()))
        
        }
        else if(type === 'program') {
            helper = arr.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()))
            
        }
        setArrCopy(helper)
    }

    return (
        <input type='text' value={search} onChange={(e) => {filterArr(e)}} className='search-input' placeholder="Search"/>        
    )
}
export default Search