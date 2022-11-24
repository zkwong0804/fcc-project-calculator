import { ConfirmInputBehavior } from '../Behaviors/ConfirmInputBehavior';
import { OperatorBtnBehavior } from '../Behaviors/OperatorBtnBehavior';
import { NumberBtnBehavior } from '../Behaviors/NumberBtnBehavior';
import { ClearBtnBehavior } from '../Behaviors/ClearBtnBehavior';
import { EqualsButtonBehavior } from '../Behaviors/EqualsButtonBehavior';
import * as ActionTypes from './ActionTypes';
import * as Constants from '../Kernel/Constants';


export const CalculatorReducer = (state, action) => {
    if (state === undefined) return Constants.DefaultCalculatorState;
    let newState = {};
    switch(action.type) {
        case ActionTypes.ClearButton:
            newState = ClearBtnBehavior();
            break;
        case ActionTypes.ConfirmInput:
            newState = ConfirmInputBehavior(state, action.currentInputType);
            break;
        case ActionTypes.OperatorButton:
            newState = OperatorBtnBehavior(state, action.userInput.value);
            break;
        case ActionTypes.NumberButton:
            newState = NumberBtnBehavior(state, action.userInput.value);
            break;
        case ActionTypes.EqualsButton:
            newState = EqualsButtonBehavior(state);
            break;
        default:
            newState = Constants.DefaultCalculatorState;
            break;
            
    }
    return newState;
}