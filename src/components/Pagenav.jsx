import {  NavLink } from "react-router-dom";
import styles from "./PageNav.module.css"
import Logo from "./Logo"
export default function Pagenav (){
    return <nav className={styles.nav}>
<Logo/>
        <ul>
        <li>

        <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
            <NavLink to="/Product">Product</NavLink>
            </li>
        <li>
            <NavLink className={styles.ctaLink} to="/Login">Login</NavLink>
         
        </li>
       
        </ul>
    </nav>
}