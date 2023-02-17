import { FILTER_BY_ACTIVITY, FILTER_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY, GET_COUNTRY_BY_NAME, ORDER, PAGINATED } from "./types"

const initialState = {
    countries: [],
    allCountries: [],
    detailCountry: [],
    filteredCountries: [],
    activities: [],
    itemsPerPage: 10,
    currentPage: 1,
    loading: false
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case GET_COUNTRIES:
            return { ...state, countries: payload, allCountries: payload}

        case GET_COUNTRY:
            return { ...state, detailCountry: payload }

        case GET_COUNTRY_BY_NAME:
            const filterCopyByName = [...state.allCountries];
            const filterByName = filterCopyByName.filter(c => c.name.toLowerCase() === payload.toLowerCase());
            return { ...state, countries: filterByName };

        case GET_ACTIVITIES:
            return { ...state, activities: payload }

        case ORDER:
            const orderCopy = [...state.countries];
            if (payload === "Ascendente") {
                const orderAsc = orderCopy.sort((a, b) => a.name.localeCompare(b.name));
                return { ...state, countries: orderAsc }
            }
            else if (payload === "Descendente") {
                const orderDes = orderCopy.sort((a, b) => b.name.localeCompare(a.name));
                return { ...state, countries: orderDes }
            }
            else if (payload === "Max") {
                const maxPob = orderCopy.sort((a, b) => b.population - a.population);
                return { ...state, countries: maxPob }
            } else if (payload === "Min") {
                const orderPob = orderCopy.sort((a, b) => a.population - b.population);
                return { ...state, countries: orderPob }
            }
            return { ...state }

        case FILTER_CONTINENT:
           const allCountries = [...state.allCountries];
           if(payload === "All"){
            return {...state, countries: allCountries}
           } 
           const filter = allCountries.filter(c => c.continent === payload);
           return {...state, countries: filter}
        
        case FILTER_BY_ACTIVITY:
            const allCountries2 = [...state.allCountries];
            if(payload === "All"){
                return {...state, countries: allCountries2};
            }
            const filter2 = allCountries2.filter(c => c.activities.find((element) => element.name.toLowerCase() === payload.toLowerCase())) // payload="Ski")
            return {...state, countries: filter2}
        
        case PAGINATED:
            return { ...state, currentPage: payload }

        default:
            return { ...state };
    }
};