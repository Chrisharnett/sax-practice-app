

export function CurrentExercise( {ex} ) {    
    return (
        // <Exercise title={ ex.title } description={ ex.description } src={ ex.imageURL }/>
        ex.map((ex) => {
            return <Exercise title={ ex.title } description={ ex.description } src={ ex.imageURL }/>
        })
    )
}

export function ExerciseList( {exList} ) {
    
    return (
        // <Exercise title={ thisExercise.title } description={ thisExercise.description } src={ thisExercise.imageURL }/>
        exList.map((exList, i) => {
            return <Exercise title={ exList.title } description={ exList.description } src={ exList.imageURL }/>
        })
    )
}

function Exercise( props ) {
    return (
        <>
            <h1>{ props.title }</h1>
            <img src={ props.src } alt={ props.descriptin }></img>
            <p>{ props.description }</p>
        </>
    )
}