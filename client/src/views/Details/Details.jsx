import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDetailCountry } from "../../redux/actions";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Activity from "../../components/Activity/Activity";

export default function Details() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailCountry(id));
        return () => {
            console.log('Limpiando antes de que el ID cambie');
        };
    }, [dispatch, id]);

    const country = useSelector(state => state.detailCountry);
    console.log(country);

    return (
        <div >
            {country.map((c, i) => (
                <div key={i}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{margin:"20px"}}>
                            <h1>{c.name}</h1>
                            <img src={c.image} alt={c.name} />
                        </div>
                        <div style={{margin:"20px"}}>
                            <h3>Details</h3>
                            <h4>Code: {c.id}</h4>
                            <h2>Capital: {c.capital}</h2>
                            <h2>Continent: {c.continent}</h2>
                            <h2>Area: {c.area + " km2"}</h2>
                            <h2>Population: {c.population + " habitantes"} </h2>
                        </div>
                        <div>
                            <h1>Activities</h1>
                            <div style={{ margin: "20px", display: "flex", flexDirection: "row" }}>
                                {c.activities.length
                                    ? c.activities.map((activity, i) => <Activity activity={activity} key={i} />)
                                    : <div><h1>Not found activities!</h1></div>}
                            </div>
                        </div>

                    </div>
                    <div>
                        <Link to="/home">Go back!</Link>
                    </div>
                </div>
            ))}
        </div>
    )
};