import { NavLink } from 'react-router'
import { Link } from './Link'
// import { useAuth } from '../context/AuthContext.jsx'
import {useAuthStore} from "../store/autStore.js"


export function Header () {
  return (
    <header>
      <Link href='/' style={{ textDecoration: 'none' }}>
        <h1 style={{ color: 'white' }}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            DevJobs
        </h1>
      </Link>

      <nav>
        <NavLink
          className={({ isActive }) => isActive ? 'nav-link-active' : ''}
          to="/search">Empleos</NavLink>
      </nav>
      <HeaderUserButtom />
    </header>
  )
}


const HeaderUserButtom = () =>{
  const {isLoggedIn, logout, login} = useAuthStore();
  return isLoggedIn
    ? <button onClick={logout} className="apply-button">Cerrar sesión</button> 
    : <button onClick={login} className="apply-button:disable">Iniciar sesión</button>   
}