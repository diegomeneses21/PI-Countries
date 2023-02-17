import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";

export default function Form() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);
    const countries = useSelector(state => state.countries).sort((a, b) => a.name.localeCompare(b.name));

    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    });

    const [errors, setErrors] = useState({
        duration: "",
    });

    const validate = (activity) => {
        console.log(activity)
        if (activity.duration <= 0) {
            setErrors({ ...errors, duration: "cannot be less than 0" })
        } else {
            setErrors({ ...errors, duration: "" })
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setActivity({
            ...activity,
            [name]: value
        });
        validate(activity)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (errors.duration) alert(errors.duration);
        if (errors.countries) alert("add at least one country");
        else axios.post("http://localhost:3001/activities", activity)
            .then(res => alert(res.data))
            .catch(err => alert(err));
        setActivity({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: []
        })
    };

    const difficultyHandle = (e) => {
        const { value } = e.target;
        setActivity({
            ...activity,
            difficulty: value
        })
    };

    const seasonHandle = (e) => {
        const { value } = e.target;
        setActivity({
            ...activity,
            season: value
        })
    };

    const handlerClick = (e) => {
        const { value } = e.target;
        if(activity.countries.includes(value)) alert('El pais ya esta incluido')
        else setActivity({
            ...activity,
            countries: [...activity.countries, value]
        })
    };

    const handleDelete = (e) => {
        setActivity({
            ...activity,
            countries: activity.countries.filter(c => c !== e)
        })
    };

    const season = ['Autumn', 'Spring', 'Summer', 'Winter'];
    const difficulty = [1, 2, 3, 4, 5];
    return (
        <div className={styles.container}>
            <div className={styles.container2}>
                <h2>Create Activity</h2>
                <div >
                    <form onSubmit={submitHandler}>

                        <div className={styles.divs}>
                            <label className={styles.label}>Activity: </label>
                            <input className={styles.input} type="text" value={activity.name} onChange={changeHandler} name="name" placeholder="activity name" required />
                            {/* {errors.name && (
                                <p className={styles.errors}>{errors.name}</p>
                            )} */}
                        </div>
                        <div className={styles.divs}>
                            <label>Difficulty: </label>
                            <select className={styles.select} onChange={difficultyHandle} required>
                                <option value="" hidden>Select difficulty: </option>
                                {difficulty.map(d => (
                                    <option value={d} name="difficulty" key={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.divs}>
                            <label>Duration: </label>
                            <input className={styles.input} type="number" value={activity.duration} onChange={changeHandler} name="duration" placeholder="in minutes" />
                            {errors.duration && (
                                <p className={styles.errors}>{errors.duration}</p>
                            )}
                        </div>
                        <div className={styles.divs}>
                            <label>Season: </label>
                            <select className={styles.select} onChange={seasonHandle} required>
                                <option value="" hidden>Select season: </option>
                                {season.map(s => (
                                    <option value={s} name="season" key={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.divs}>
                            <label>Country: </label>
                            <select className={styles.select} onChange={handlerClick} required>
                                <option value="default" hidden>Select country: </option>
                                {countries.map(c => (
                                    <option key={c.id} value={c.id} name="countries">{c.name}</option>
                                ))}
                            </select>
                            {/* {errors.countries && (
                                <p className={styles.errors}>{errors.countries}</p>
                            )} */}
                        </div>

                        <div>
                            {activity.countries.map(i => (
                                <p key={i}>
                                    {i}
                                    <button className={styles.btn} onClick={() => handleDelete(i)} type="button">X</button>
                                </p>
                            ))}
                        </div>

                        <button className={styles.btnSubmit} type="submit">Create activity!</button>

                    </form>
                </div>
            </div>
        </div>
    )
};