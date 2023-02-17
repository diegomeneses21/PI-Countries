import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    return (
        <div className={style.container}>
            <div>
                <h1>HENRY COUNTRIES</h1>
            </div>
            <Link to="/home"><button className={style.btn}>HOME</button></Link>
        </div>
    )
};

export default Landing;