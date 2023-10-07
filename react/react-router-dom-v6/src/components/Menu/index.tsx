import { Link } from 'react-router-dom'

import './style.css'

const Menu = () => {
    return (
        <nav className="menu">
            <ul>
                <li><Link state={'This is state from Posts'} to="/"> Home </Link></li>
                <li><Link to="/about"> about </Link></li>
                <li><Link to="/posts"> Posts </Link></li>
                <li><Link to="/posts/10"> Posts 10 </Link></li>
                <li><Link to="/redirect"> Redirect </Link></li>
            </ul>
        </nav>
    )
}

export default Menu