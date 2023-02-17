function Activity({activity}) {

    return (
        <div>
            <h1>Name: {activity.name}</h1>
            <h2>Difficulty: {activity.difficulty}</h2>
            <h2>Duration: {activity.duration} min</h2>
            <h2>Season: {activity.season}</h2>
        </div>
    )
};

export default Activity;