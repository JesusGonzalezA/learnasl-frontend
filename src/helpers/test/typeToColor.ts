import { AnswerType } from '.'

export const typeToColor = (type : AnswerType) => {
    switch(type) {
        case AnswerType.ERROR:
            return 'red'
        case AnswerType.SUCCESS:
            return 'green'
        case AnswerType.DEFAULT:
            return 'default'
    }
}