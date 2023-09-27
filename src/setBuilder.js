import { Exercise } from './exercise'
import { useState, useEffect} from 'react';

// Development values
const MAX_NEW = 1;
const SET_LENGTH = 4;

export default function PracticeSet() {
    const [exercises, setExecises] = useState(null);
    const [round, setRound] = useState(null);
    
    let height = 50;
    return(
        <>
            <h1> Practice Image </h1>
            <Exercise title={ "" } src={ "" } description={""} height={ height }/>
        </>
        
    )
    // const [exerciseList, setExerciseList] = useState(null);

    //     student
    //     ){
    //     this.__student = student;
    //     this.__setExercises = [];
    // }
    
    // buildSet = () => { 
    //     let set =[];
    //     let previousSet = this.__student.previousSet;
    //     if(previousSet === undefined){
    //         for (let i = 0; i < SET_LENGTH; i++){
    //             set.push(this.__student.getProgram()[i]);
    //         };
    //     }
    //     else{
    //         let set = this.__student.previousSet
    //     }    
    //     if (!this.__student.getPreviousSet()){
            
    //     }
    //     else{
    //         // get the new exercise
    //         // place the new exercise in the set list to replace the same category of exercise.
    //         // update the remaining reviewexercises
    //         let nextProgramExercise = this.chooseNewExercise();
    //         for (let i=1; i < this.__student.getPreviousSet; i++){
    //             if (this.__student.getPreviousSet[i].patternType === nextProgramExercise.patternType){
    //                 set[i] = nextProgramExercise;
    //             }
    //             else {
    //                 set[i] = this.chooseReviewExercise(this.__student.getPreviousSet[i])
    //             }
    //         }
    //     };
    // }

    // chooseReviewExercise = (previousExercise) => {
    //     let m = this.__student.getStudentExerciseList().assessment.min();
    //     let possibleExercises = this.__student.getStudentExercises.filter((x) => x.assessment <= m)
    //                             .filter((x) => x.patternType === previousExercise.patternType);
    //     return possibleExercises[Math.floor(Math.random) % possibleExercises.length - 1];
    // };
    
    // chooseNewExercise = () => {
    //     if (this.__student.getCurrentProgramIndex < this.__student.getProgram.length){
    //         this.__student.setProgramIndex(this.student.getCurrentProgramIndex++);
    //         return this.__student.getProgram[this.__student.getCurrentProgramIndex()];
    //     }        
    // };
    // // Fisher-Yates algorithm array shuffling algorithm.
    // shuffleSet = () => {
    //     let exercises = this.__setExercises
    //     for(let i=exercises.length -1; i > 0; i--){
    //     let j = Math.floor(Math.random() * (i+1))
    //     let temp = exercises[i];
    //     exercises[i] = exercises[j];
    //     exercises[j]=temp;
    //     }
    //     this.__setExercises = exercises
    // }
};