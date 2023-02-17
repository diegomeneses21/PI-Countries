import axios from "axios";

import { GET_COUNTRIES, GET_COUNTRY, GET_COUNTRY_BY_NAME, ORDER, FILTER_CONTINENT, GET_ACTIVITIES, FILTER_BY_ACTIVITY, PAGINATED } from "./types";

export const getCountries = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001/countries"
        );
        const users = apiData.data;
        dispatch({ type: GET_COUNTRIES, payload: users });
    };
};

export const getDetailCountry = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `http://localhost:3001/countries/${id}`
        );
        const user = apiData.data;
        dispatch({ type: GET_COUNTRY, payload: user });
    };
};

export const getCountryByName = (name) => {
    return {
        type: GET_COUNTRY_BY_NAME,
        payload: name
    }
};

export const getActivities = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001/activities"
        );
        const activities = apiData.data;
        dispatch({ type: GET_ACTIVITIES, payload: activities })
    };
};

export const orderCountries = (value) => {
    return {
        type: ORDER,
        payload: value
    }
};

export const filterCountries = (value) => {
    return {
        type: FILTER_CONTINENT,
        payload: value
    }
};


export const filterByActivity = (value) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: value
    }
};

export const paginated = (page) => {
    return {
        type: PAGINATED,
        payload: page
    }
};