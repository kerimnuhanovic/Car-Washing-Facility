import { Link } from 'react-router-dom'
import logo from '../Images/car_wash_logo_cropped.png'
import './navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='logo-div'>
                <img src={logo}/>
            </div>
            <div className='navbar-links'>
                <Link className='mx-1 mx-sm-3' to="/">Home</Link>
                <Link className='mx-1 mx-sm-3' to="/customers">Customers</Link>
                <Link className='mx-1 mx-sm-3' to="/programs">Washing programs</Link>
                <Link className='mx-1 mx-sm-3' to="/orders">Orders</Link>
            </div>
        </div>
    )
}

export default Navbar