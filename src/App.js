import './App.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { CurrentExercise, ExerciseList } from './exercise';

let json = 'https://practiceroutine.s3.us-east-1.amazonaws.com/exerciseJSON.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLWVhc3QtMSJHMEUCIQDkstmYpuynxdnXUuRqjQkfKWArC%2BaiHVwLOpgW7PTFuQIgNTyceWUG1cEKeHiOkjc4kBx0HeXBVtJWcdxzTcuEQyoq6AIIXRAAGgw0NDEyODE0NTI4ODAiDJfdBgoVAjAVayYt6yrFAtV5ALfiTCsJWeJ8f1%2Fm87dCtlwcMdYrsRF9hAcehZ2YnuvAvdBTWebhP9Fim78HQSFIwKIxdA4T0bbDJTiK30jxIKIx1DOZ%2FLYPA4uk%2FpmRu5B%2Bz%2FidYuHPb2y9aBVjeJ0BupkoL8AdeBzZu7jTfnxxQbWyYLmbOzXhq1bHRui6V6Ary3CmZG9gFD4UsmK%2FsNrsw7umC%2BIn%2F8u2RBX21K5h%2BqM2RyCLUB%2B6swuoa3jO3TGQBs6VWmozvedBCNq9Sz4Jzt8uhk1AAlTj%2FPf4GioMrRBgxkjjA%2F5Xm9bxT3kf12MRP4AxoqpVykuPEpRkkwYMkupydwJX7FAA4MwfBPT2LmLACY6DOQHI7t06VY1athrXWboPAkQS%2F2t3JMMxRuHGNSJ9XAg8DDAEJ10u5QCGzENQxTw9JfYMwKSy2n2z67GcOGwwooiRqAY6swJFd31t8pxZo71ZizEOMPbF8g3zjV2FM5Muvd5Q3D4JBTnI7wMn%2BQuHEmcQjL%2FAnvlSb%2FH3p5EwmKt73kc88HPpqXEIw27eJItWv0jnKY6vKvRd2%2BkdXckRp6i23o31lXvzUIi0s4wGhHxyxEC2HZCRrQwyC53lWq%2Fw7TdYFWG2ARKc%2FAiTaQnO%2FIK4hgpJT7qcmr8ti3MRCXNcu%2FerzhJv6FHdOtRCPta8EdaRO9djYuuANSRzS0Fd8jlmAii9laC0foV8LaRQ1MJA2mIcj5hMtvIPm5vZopKPmiWaHRxQi7gNI3fcjf%2B7yySyUNLs0Bb4ussxk0DBxKlo%2BvhRSj2m9VtyHiJRmWcEXUF%2BScTPVycu7EAKc7nH%2BEZeO25dgtI1%2BQbWw1faNI0XpA78EoDYkMW0&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230915T162220Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAWNPTMTNIIAVLHCNJ%2F20230915%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=d836eecfd0164b11b458884cd5bb5452c14362f5e856f3e166cf59eaf4fe0354'
let directJSON = 'https://mysaxpracticeexercisebucket.s3.amazonaws.com/exerciseJSON.json'
let localJSON = 'exerciseJSON.json'
let exerciseIndex = 0

function Home() {
  return (
    <div>
      <nav>
        <Link to="/teacher">Teacher</Link>
        <Link to="/student">Student</Link>
      </nav>
      <h1>Home & sign in page</h1>
    </div>
  )
};

export function Student() {
  const [data, setData] = useState(null);
  const [routine, setRoutine] = useState([1,2,3])

  useEffect(() => {
     fetch(
      localJSON
    ).then((response) => response.json())
    .then(setData);
  }, []);

  let thisRoutine = [];

  if(data){
    for (let i in routine){
      thisRoutine.push(data[i])
    }
    
  }     
    return (
      <div>
        <nav>
        <Link to="/teacher">Teacher</Link>
        <Link to="/student">Student</Link>
        </nav>
        <h1>Student View</h1>        
        < CurrentExercise ex={ thisRoutine }/>
        <button onClick="">Next Exercise</button>            
      </div>
    )
    // exerciseIndex ++;

};

export function Teacher() {
  const [data, setData] = useState(null);

  useEffect(() => {
     fetch(
      // json
      'exerciseJSON.json'
      // 'https://mysaxpracticeexercisebucket.s3.amazonaws.com/exerciseJSON.json'
    ).then(response => response.json())
    .then(setData);
  }, []);

  if(data) 
    return (
      <div>
        <nav>
          <Link to="/teacher">Teacher</Link>
          <Link to="/student">Student</Link>
        </nav>
        <h1>Exercise List</h1>
        <ExerciseList exList={ data } />
      </div>
    )
};


export function App() {

  return <Home />;
}
