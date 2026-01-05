import { NavLink } from "react-router-dom";
import './styles/Navigation.css';

const NavBar = () => {
    return (
        <>
            <div className="navigation">
                <NavLink className="addPage" to="/addUser"> Add User </NavLink>
                <NavLink className="listPage" to="/"> Users List</NavLink>
            </div>
        </>
    );
}

export default NavBar;