import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, continent, population }) => {
    return (
        <div className={style.container}>
            <Link to={`/detail/${id}`} style={{textDecorationLine:"none"}}>
                <h2 className={style.h3}>{name}</h2>
                <div className={style.container2}>
                    <img className={style.img} src={image} alt={name} />
                    <p className={style.p}>{continent}</p>
                </div>
            </Link>

        </div>
    )
};

export default Card;