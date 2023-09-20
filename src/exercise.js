import { useState } from 'react'

export function CurrentExercise( { exercise } ) {    
    return (
        <Exercise title={ exercise.title } description={ exercise.description } src={ exercise.imageURL } height={ 100 }/>
    )
}

export function ExerciseList( {exList} ) {    
    return (
        exList.map((exList, i) => {
            return <Exercise title={ exList.title } description={ exList.description } src={ exList.imageURL } height={50}/>
        })
    )
};

export function ExSelection( {exList, routineList} ) {
    const [checked, setChecked] = useState([])

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if(event.target.checked) {
        updatedList = [...checked, { index: event.target.value,
                                    title: event.target.name,
                                    imageURL: event.target.id}];
        } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
        <div className="checkList">
            <button onClick={() => {
                routineList(checked
                )}} className="btn btn-primary m-3">Create Routine
            </button>
            {/* Have the exercise image move into the new routine list as selected?? */}
            <h3>Selected Exercises</h3>
            <div className="d-inline-flex">                
                {checked.map((ex, index) => (
                    <div className="m-3">
                        <p>{ex.title}</p>
                        <img src={ ex.imageURL } alt={ ex.title } height={ 35 }/>
                    </div>
                ))}
            </div>
            <h3>Exercise List</h3>
            <div>
                {exList.map((ex, index) => (
                    <div key={index} className="form-check mb-3">
                        <input id={ ex.imageURL } value={ index } name={ ex.title }type="checkbox" onChange={handleCheck} />
                        <h4 className={isChecked(ex.title)}>{ ex.title } </h4>
                        <img src={ ex.imageURL } alt={ ex.description } height= { 50 }></img>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function Routines({ studentRoutines }) {
    return (
      <div>
        {studentRoutines && studentRoutines.length > 0 ? (
          <div>
            {studentRoutines.map((routine, index) => (
              <div key={index}>
                <p>
                  {index + 1}. Student: {routine.student}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No routines available.</p>
        )}
      </div>
    );
  }
  
function Exercise( props ) {
    return (
        <>
            <h4>{ props.title }</h4>
            <img src={ props.src } alt={ props.descriptin } height={ props.height }></img>
            <p>{ props.description }</p>
        </>
    )
}
