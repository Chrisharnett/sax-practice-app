class Student{
    constructor(
        studentName="Donovan",            
    ){
        this.__studentName = studentName;
        this.__program = "";
        this.__currentProgramIndex = 0;
        this.__studentExerciseList = 
            [{exercise: {title: "",
                        imageName: "",
                        imageURL: "",
                        description: "",
                        patternType: ""
                        },
            playCount: 0,
            assessment: 0}]
        this.__previousSet = []
    } ;
    getPreviousSet = () => {
        return this.__previousSet;
    };
    getProgram = () => {
        return this.__program;
    };
    getCurrentProgramIndex = () =>{
        return this.__currentProgramIndex;
    };
    setCurrentProgramIndex = (index) => {
        this.__routineIndex = index;
    };
    getStudentExerciseList = () => {
        return this.__studentExerciseList
    }
    updateExerciseList = (exercise, assessment) => {
        if(!this.__studentExerciseList.includes(exercise.title)){
            this.__studentExerciseList.push([{exercise: exercise, 
                                            playCount: 1, 
                                            assessment:assessment}]);
        } else {
            this.__studentExerciseList.map(ex => {
                if(ex.exercise.title === exercise.title) {
                   return { ...ex, playCount: this.playCount++, assessment: assessment  } 
                }
                else{return null;}
            });
        }
    }
}