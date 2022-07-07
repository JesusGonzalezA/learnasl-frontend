import { AnswerType } from '.'

export const typeToRadioColor = (type : AnswerType) => {
    switch(type) {
        case AnswerType.DEFAULT: 
            return 'default'
        case AnswerType.ERROR:
            return 'error'
        case AnswerType.SUCCESS:
            return 'success'
    }
}