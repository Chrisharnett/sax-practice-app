import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/esm/Container";

export function CurrentExercise({ exercise }) {
  return (
    <Exercise
      title={exercise.exerciseName}
      description={exercise.description}
      src={exercise.imageURL}
      height={100}
    />
  );
}

export function ExerciseList({ exList }) {
  return exList.map((exList, i) => {
    return (
      <Exercise
        key={i}
        title={exList.exerciseName}
        description={exList.description}
        src={exList.imageURL}
        height={50}
      />
    );
  });
}

export function ExSelection({ exList, programList }) {
  const [checked, setChecked] = useState([]);
  const [patternTypes, setPatternTypes] = useState(null);
  const [keys, setKeys] = useState(null);
  const [modes, setModes] = useState(null);
  const [sampleExercises, setSampleExercises] = useState(null);
  const [newProgramExercises, setNewProgramExercises] = useState(null);

  useEffect(() => {
    if (exList) {
      // Get unique patternTypes
      const types = exList.map((exercise) => {
        return exercise.patternType;
      });
      const uniquePatternTypes = [...new Set(types)];
      setPatternTypes(uniquePatternTypes);

      // Get unique keys
      const keys = exList.map((ex) => {
        return ex.key;
      });
      const uniqueKeys = [...new Set(keys)];
      setKeys(uniqueKeys);

      //Get unique modes
      const modes = exList.map((ex) => {
        return ex.mode;
      });
      const uniqueModes = [...new Set(modes)];
      setModes(uniqueModes);

      // Get Sample exercises
      setSampleExercises(
        exList.filter((ex) => {
          return ex.key === "g" && ex.mode === "major";
        })
      );
    }
  }, [exList]);

  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [
        ...checked,
        {
          index: event.target.value,
          title: event.target.name,
          imageURL: event.target.id,
        },
      ];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handlePatternFilter = (pType) => {
    if (pType === "all") {
    } else {
      let filteredExercises = exList.filter((ex) => {
        return ex.patternType === pType;
      });
      setSampleExercises(filteredExercises);
    }
  };

  const handleExerciseSelection = (selectedExercise) => {
    setNewProgramExercises([...newProgramExercises, selectedExercise]);
  };

  if (patternTypes && keys && modes && sampleExercises) {
    return (
      <div className="checkList">
        <button
          onClick={() => {
            programList(checked);
          }}
          className="btn btn-primary m-3"
        >
          Create Program
        </button>
        {/* Have the exercise image move into the new routine list as selected */}
        <h3>Selected Exercises</h3>
        <div className="d-inline-flex">
          {checked.map((ex, index) => (
            <div id={index} key={index} className="m-3">
              <p>
                {index + 1}. {ex.exerciseName}
              </p>
              <img src={ex.imageURL} alt={ex.exerciseName} height={35} />
              <p>Key</p>
              <select title="Exercise Key">
                {" "}
                {keys.map((key, index) => {
                  return (
                    <option id={index} key={key}>
                      {" "}
                      {key}
                    </option>
                  );
                })}
              </select>
              <p>Mode</p>
              <select title="Exercise Mode">
                {modes.map((mode, index) => {
                  return (
                    <option id={index} key={mode}>
                      {" "}
                      {mode.replace("_", " ")}
                    </option>
                  );
                })}
              </select>
            </div>
          ))}
        </div>
        <hr></hr>
        <Container className="inline">
          <h3>Exercise List</h3>
          <h4>Filter</h4>
          <DropdownButton variant="success" title="Pattern Type">
            {/* <Dropdown.item
              id={"-1"}
              key={"all"}
              onClick={() => handlePatternFilter("all")}
            >
              Clear Filter
            </Dropdown.item> */}
            {patternTypes.map((patternType, index) => {
              return (
                <Dropdown.Item
                  id={index}
                  key={patternType}
                  onClick={() => handlePatternFilter(patternType)}
                >
                  {" "}
                  {patternType}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Container>
        <div>
          {sampleExercises.map((ex, index) => (
            <div key={index} className="form-check mb-3">
              <input
                id={ex.imageURL}
                value={index}
                name={ex.exerciseName}
                type="checkbox"
                onChange={handleCheck}
              />
              <h4 className={isChecked(ex.exerciseName)}>{ex.exerciseName} </h4>
              <img src={ex.imageURL} alt={ex.description} height={50}></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export function Routines({ studentRoutines }) {
  return (
    <div>
      {studentRoutines && studentRoutines.length > 0 ? (
        <div>
          {studentRoutines.map((routine, index) => (
            <div id={index} key={index}>
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

export function Exercise(props) {
  return (
    <>
      <h4>{props.exerciseName}</h4>
      <img src={props.src} alt={props.description} height={props.height}></img>
      <p>{props.description}</p>
    </>
  );
}
