
export const answerToLabel = (allAnswers : string[], answer? : string) : string | null =>  {
    if (!answer) return null

    const index = allAnswers.indexOf(answer as string)
    
    switch(index){
        case 0: 
            return 'A'
        case 1: 
            return 'B'
        case 2: 
            return 'C'
        case 3: 
            return 'D'
        default: 
            return null
    }
}