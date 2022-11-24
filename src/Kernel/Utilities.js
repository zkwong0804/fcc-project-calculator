import * as Constants from './Constants';


export function isOperator(testSubject) {
    return [
        Constants.BTN_ADD.value, 
        Constants.BTN_SUBTRACT.value, 
        Constants.BTN_MULTIPLY.value, 
        Constants.BTN_DIVIDE.value]
            .includes(testSubject);
}