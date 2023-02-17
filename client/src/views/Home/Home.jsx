import style from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getCountries, orderCountries, filterCountries, getActivities, filterByActivity, paginated } from "../../redux/actions";
import { useSelector } from "react-redux";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);

    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);
    const itemsPerPage = useSelector(state => state.itemsPerPage);
    const currentPage = useSelector(state => state.currentPage);
    console.log("activities----->", activities);

    const handleChangeOrder = (e) => {
        const { value } = e.target;
        return dispatch(orderCountries(value));
    };

    const handleChangeFilterContinent = (e) => {
        const { value } = e.target;
        dispatch(filterCountries(value));
        dispatch(paginated(1));
    };

    const handleChangeFilterActivity = (e) => {
        const { value } = e.target;
        dispatch(filterByActivity(value));
        dispatch(paginated(1));
    };

    const handleClick = () => {
        dispatch(getCountries());
    };

    return (
        <div className={style.container}>
            <div>
            <button className={style.allCountries} onClick={handleClick}>Reload countries</button>
                <select className={style.select} name="order" onChange={handleChangeOrder}>
                    <option value="" hidden>Sort view</option>
                    <option value="Ascendente">A-Z</option>
                    <option value="Descendente">Z-A</option>
                    <option value="Max">Max population</option>
                    <option value="Min">Min population</option>
                </select>
                <select className={style.select} name="filter" onChange={handleChangeFilterContinent}>
                    <option value="All">All continents</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Asia">Asia</option>
                    <option value="Antarctica">Antarctica</option>
                </select>
                <select className={style.select} name="activities" onChange={handleChangeFilterActivity}>
                    <option value="All">All activities</option>
                    {activities.map((a, i) => (
                        <option key={i} value={a.name}>{a.name}</option>
                    ))}
                </select>
            </div>
            <div className={style.cards}>
                {countries.length 
                ? <CardsContainer countries={countries} itemsPerPage={itemsPerPage} currentPage={currentPage} />
                : <p>No se encontro el pais!</p>}
                {/* <CardsContainer countries={countries} itemsPerPage={itemsPerPage} currentPage={currentPage} /> */}
            </div>
        </div>
    )
};

export default Home;