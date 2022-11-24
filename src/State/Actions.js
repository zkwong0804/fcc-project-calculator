import * as ActionTypes from './ActionTypes';

const getUserInput = (userInputId = '', userInputValue='') => {
    return {
        id: userInputId, value: userInputValue
    }
}

const getActionWithUserInput = (type, userInput) => {
    return {
        type, userInput
    }
}

const ClearButtonAction = () => {
    return {
        type: ActionTypes.ClearButton
    };
}

const EqualsButtonAction = () => {
    return {
        type: ActionTypes.EqualsButton
    }
}

const ConfirmInputAction = (currentInputType) => {
    return {
        type: ActionTypes.ConfirmInput,
        currentInputType
    };
}

const NumberButtonAction = (userInputId, userInputValue) => {
    return getActionWithUserInput(ActionTypes.NumberButton, getUserInput(userInputId, userInputValue));

}

const OperatorButtonAction = (userInputId, userInputValue) => {
    return getActionWithUserInput(ActionTypes.OperatorButton, getUserInput(userInputId, userInputValue));
}

export { ClearButtonAction, ConfirmInputAction, NumberButtonAction, OperatorButtonAction, EqualsButtonAction }