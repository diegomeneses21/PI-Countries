import { useDispatch } from "react-redux";
import {  paginated } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = (props) => {

    const dispatch = useDispatch();

    const totalItems = props.countries.length - 9;
    const startIndex = (props.currentPage - 1) * props.itemsPerPage; // 1: (1-1) * 10 = 0 // 2: (2-1) * 10 = 10
    const endIndex = startIndex + props.itemsPerPage; // 0 + 10, 10 + 10
    const itemsToShow = (props.currentPage === 1) ? props.countries.slice(0, 9) : props.countries.slice(startIndex - 1, endIndex - 1);

    const totalPage = Math.ceil(totalItems / props.itemsPerPage) + 1;

    const handleNext = (e) => {
        if (props.currentPage >= totalPage) return;
        dispatch(paginated(props.currentPage + 1));
    };

    const handlePrev = (e) => {
        if (endIndex === props.itemsPerPage) return;
        dispatch(paginated(props.currentPage - 1));
    };

    return (
        <div className={style.container}>
            <div>
                <h2>Page {props.currentPage} of {totalPage}</h2>
                <button onClick={handlePrev}>Prev</button>
                <button onClick={handleNext}>Next</button>
              
            </div>
            <div className={style.container}>
                {itemsToShow.map((country, i) => {
                    return <Card
                        key={i}
                        id={country.id}
                        name={country.name}
                        image={country.image}
                        continent={country.continent}
                        capital={country.capital}
                        subregion={country.subregion}
                        area={country.area}
                        population={country.population}
                    />
                })}
            </div>
        </div>
    )
};

export default CardsContainer;