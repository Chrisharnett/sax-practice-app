import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
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
    const [checked, setchecked] = useState([])

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if(event.target.checked) {
        updatedList = [...checked, event.target.value];
        } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setchecked(updatedList);
    };

    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    let checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    return (
        <div className="checkList">
            <button onClick={() => {
                routineList(checked
                )}} className="btn btn-primary m-3">Create Routine
            </button>
            <h3>Exercise List</h3>
            {/* Have the exercise move into the new routine list as selected?? */}
            <div>
                {`Selected Exercises: ${checkedItems}`}
            </div>
            <Form>
                {exList.map((ex, index) => (
                    <div key={index} className="form-check mb-3">
                        <input id={ index } value={ index } type="checkbox" onChange={handleCheck} />
                        <h4 className={isChecked(ex.title)}>{ ex.title } </h4>
                        <img src={ ex.imageURL } alt={ ex.description } height= { 50 }></img>
                    </div>
                ))}
            </Form>
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