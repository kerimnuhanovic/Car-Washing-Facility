import premium from '../Images/premium.jpg'
import normal from '../Images/normal.png'

import './card.css'
import { useNavigate } from 'react-router-dom'
const Card = ({id, name, surname, tel, email, status}) => {
    const navigate = useNavigate()
    return (
        
        <div className='card' onClick={() => {navigate(`/customer/${id}/`)}}>
            <div className='status-img-div'>
                <img src={status === 'premium'? premium : normal}/>
            </div>
            <div className='customer-data-div'>
                <p>{name} {surname}</p>
                <p>{tel}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default Card