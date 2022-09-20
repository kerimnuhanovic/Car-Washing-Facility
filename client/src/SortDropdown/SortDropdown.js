import axios from "axios"
import { useEffect, useState } from "react"

const SortDropdown = ({criteriaArr, arr, setArr,arrCopy,setArrCopy}) => {
    
    const sortBy = (criterion) => {
        let helper = [...arrCopy];
        for(let i = 0; i < criteriaArr.length; i++) {
            if(criteriaArr[i] === criterion) {
                    
                helper = helper.sort((first,second) => {
                    if(first[criteriaArr[i]] <= second[criteriaArr[i]]) return -1
                    else return 1;
                })
                setArrCopy(helper)
            }
        }
    }
    return (
        
        <div className="dropdown">
            <a className="btn  blue-back dropdown-toggle mx-1 button-font" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {criteriaArr.map((criterion, index) => {
                    
                    return <li key={index}><a className="dropdown-item" href="#" onClick={() => {sortBy(criterion)}}>{criterion}</a></li>
                })}
            </ul>
        </div>
    )

}

export default SortDropdown