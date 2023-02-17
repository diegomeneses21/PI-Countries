import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries, getCountryByName, paginated } from "../../redux/actions";
import style from "./SearchBar.module.css";

function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value)
    }

    const handleClick = (e) => {
        if(!name) dispatch(getCountries);
        dispatch(getCountryByName(name));
        dispatch(paginated(1));
    }

    return (
        <div className={style.container}>
            <input type="search" name="search" onChange={handleChange} placeholder="search by name"/>
            <button onClick={handleClick}>Submit</button>
        </div>
    )

};

export default SearchBar;