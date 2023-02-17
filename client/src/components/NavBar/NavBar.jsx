import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {

    const location = useLocation();

    return (
        <div className={style.container}>
            <div className={style.links}>
                <Link to="/" style={{textDecorationLine:"none"}}>Landing</Link>
                <Link to="/home" style={{textDecorationLine:"none"}}>Home</Link>
                <Link to="/create" style={{textDecorationLine:"none"}}>Create activity</Link>
            </div>
            {location.pathname === "/home" && <SearchBar />}
        </div>
    )
};