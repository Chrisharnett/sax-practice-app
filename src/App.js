import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './App.css';
import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentExercise, ExSelection, ExerciseList } from './exercise';

// let directJSON = 'https://mysaxpracticeexercisebucket.s3.amazonaws.com/exerciseJSON.json'
// let localJSON = 'exerciseJSON.json'

let studentRoutines=[];
const storedData = localStorage.getItem("studentRoutines");
if (storedData) {
  studentRoutines=JSON.parse(storedData)
}

function Home() {
  return (
    <div>
      <Navigation></Navigation>
      <h1>Home</h1>
      <p>Please note. A teacher must first create a routine for a student before they can sign in</p>
    </div>
  )
};

// TODO: Move to new file.
function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark p-2">
      <Container>
        <Navbar.Brand href="/">Harnett Music Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/teacher">Teacher</Nav.Link>
            <Nav.Link href="/studentSignIn">Student Sign-In</Nav.Link>
            <Nav.Link href="/exerciseList">Exercise List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export function Student() {
  const location = useLocation();
  const { currentStudent } = location.state
  const [routine, setRoutine] = useState(null)
  // TODO: Set number of rounds in student sign-in and teacher page.
  const [rounds, setRounds] = useState(4)
  const [currentRound, setCurrentRounds]= useState(0)
  const [count, setCount] = useState(0)  
  const [currentExercise, setCurrentExercise] = useState(null)
  const [exerciseCount, setExerciseCount] = useState(1)
  
  // Randomize a round of exercises with Fisher-Yates algorithm.
  // Add logic to prevent the same exercise happening twice in a row.
  const shuffleExercises = (exercises) => {
    for(let i=exercises.length -1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1))
      const temp = exercises[i];
      exercises[i] = exercises[j];
      exercises[j]=temp;
    }
    return exercises
  }
  useEffect(() => {
    const studentRoutine = studentRoutines.find((r) =>r.student === currentStudent);
    if (studentRoutine) {
      setRoutine(studentRoutine.routine);
      setCurrentExercise(studentRoutine.routine[0]);
    }
  }, [currentStudent]);
  
  useEffect(() => {
    if (routine && currentRound < rounds){
      let thisRound = [];
      if (currentRound === 0){
        thisRound = routine;
      } else {
        for (let i=0; i < routine.length; i++){
          thisRound.push(routine[i]);
        }
        thisRound = shuffleExercises(thisRound);
        // Add the to the rountine with setRoutine
        setRoutine(thisRound);
      } 
  }}, [routine, count, rounds, currentRound]);

  const handleNextExercise = () => {
    if (count < routine.length - 1) {
      setCount(count + 1);
      setExerciseCount(exerciseCount + 1)
      setCurrentExercise(routine[count + 1]);
    }
    else {
      setCurrentRounds(currentRound + 1);
      setCount(0);
      setCurrentExercise(routine[0]);
      setExerciseCount(exerciseCount + 1)
    };
  }
    if (routine && currentRound < rounds) {
      if (routine){
        return (
          <div>
            <h1>{ currentStudent }'s exercise page</h1>
            <h2>Exercise { exerciseCount } of { routine.length * rounds }</h2>
            {currentExercise && (
              <div>
                <CurrentExercise exercise={ currentExercise } />
                <button onClick={handleNextExercise} className="btn btn-primary">Next Exercise</button>
              </div>
            )}
            
          </div>
        );
      } 
    };    
    if (currentRound === rounds) {
      return (
        <div>
          <Navigation></Navigation>
          <h1>Great job, today's routine is complete</h1>
        </div>
      )
  }
};

// TODO: Create student file?
export function StudentSignIn() {
  const [currentStudent, setCurrentStudent] = useState("Horatio")
  const navigate = useNavigate();

  // TODO: Set number of rounds in student sign-in and teacher page.
  const handleStartRoutine = () => {
    navigate("/student", {
      state: { currentStudent: currentStudent }
    });
  };

  const handleStudentChange= (event) => {
    setCurrentStudent(event.target.value);
  };

  return (
    <div>
      <Navigation></Navigation>
      <h1>Select student</h1>
      <select value={ currentStudent } onChange={handleStudentChange}>
          <option key="n/a" />
        {studentRoutines.map((routine, index) => (
            <option key={ routine.student }>
              {routine.student}
            </option>
        ))}
      </select>
      <Button onClick={() => {
        handleStartRoutine()
      }} variant="primary" className="m-2">Start Routine</Button>
    </div>
  )};

export function Teacher() {
  const [data, setData] = useState(null);
  const [student, setStudent] = useState("");
  const [currentStudent, setCurrentStudent] = useState("Horatio")
  const [routine, setRoutine] = useState(null);
  const [routines, setRoutines] = useState(studentRoutines);

  useEffect(() => {
     fetch(
      'exerciseJSON.json'
    ).then(response => response.json())
    .then(setData);
  }, []);

    useEffect(() => {
      setRoutines(studentRoutines);
    }, []);

    // TODO: Set number of rounds in student sign-in and teacher page.
    const createRoutine = (newRoutine) => {
    let exList = [];
    for (let i of newRoutine){  
      exList.push(data[i]);
    }
    setRoutine(exList);
    let updatedRoutines = [...routines, { student, routine: exList }];    
    studentRoutines = updatedRoutines;    
    localStorage.setItem('studentRoutines', JSON.stringify(studentRoutines));
    setRoutines(updatedRoutines);
    submit();
  };

  const clearRoutine = () => {
    let updatedRoutines = routines.filter((routine) => {
      if(routine.student !== currentStudent) {
        return routine
      }
    })
    setRoutines(updatedRoutines)
    studentRoutines = updatedRoutines
    localStorage.setItem('studentRoutines', JSON.stringify(studentRoutines));
  }

  const submit = (e) => {
    // e.preventDefault(); Mentioned in LinkedIn video. HAS BEEN CAUSING ERRORS
    if (student && routine) {
      setStudent("");
      setRoutine(null);
    }
  };

  const handleStudentChange= (event) => {
    setCurrentStudent(event.target.value);
  };

  if(data) 
    return (
      <div>
        <Navigation></Navigation>
        <h1>Student Routine Builder</h1>
        <Container>
          <h2>Current Routines</h2>
          <Container>
          <h3 className="">Remove current routine</h3>
          <div className="inline-flex">
            <select value={ currentStudent } onChange={ handleStudentChange }>
              <option key="n/a" />
              {studentRoutines.map((routine, index) => (
              <option key={ routine.student }>
                {routine.student}
              </option>
              ))}
            </select>
            <button onClick={ clearRoutine } className="btn btn-danger m-2">Clear Student</button>
          </div>
          </Container>
        </Container>
        <Container>
          <h2>Routine Builder</h2>
          <Container>
            <Form onSubmit={ submit }>
              <div className="inline">
                <input
                  value={ student }
                  onChange={(event) =>
                    setStudent(event.target.value)}
                  type="text"
                  placeholder="Enter Student Name"
                  id="student">
                </input>
              </div>          
              <div id="exerciseSelector">
                <ExSelection exList={ data } routineList = { createRoutine } />
              </div>
            </Form>
          </Container>          
        </Container>  
      </div>
    )
};


export function Exercises() {
  const [exercises, setExercises] = useState(null)
    useEffect(() => {
      fetch(
      'exerciseJSON.json'
    ).then(response => response.json())
    .then(setExercises);
    }, []);
    if (exercises)
      return (
        <div>
          <Navigation></Navigation>
          <h1>Exercise List</h1>
          <ExerciseList exList={ exercises } />
        </div>
      )};

export function App() {

  return <Home />;
}
