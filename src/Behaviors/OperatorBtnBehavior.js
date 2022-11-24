import * as Constants from '../Kernel/Constants';
import { deepCopy } from '../Kernel/DeepCopy';
import * as Utilities from '../Kernel/Utilities';

export const OperatorBtnBehavior = (prevState, userInputValue) => {
  function isNegativeCase(inputQueue, input, op) {
    const tmpResult = [...input, op].join('');
    if (tmpResult.length > 2) return false;
    const result = (tmpResult === Constants.BTN_SUBTRACT.value) ||
      (Utilities.isOperator(tmpResult[0]) && tmpResult[0] !== Constants.BTN_SUBTRACT.value && tmpResult[1] === Constants.BTN_SUBTRACT.value) ||
      (tmpResult[0] === Constants.BTN_SUBTRACT.value && tmpResult[1] === Constants.BTN_SUBTRACT.value && inputQueue.length !== 0);
    return result;
  }

  const prevState2 = deepCopy(prevState);
  const state = prevState2.CalculatorReducer;

  let result = '';
  result = userInputValue;
  if (userInputValue === Constants.BTN_SUBTRACT.value && isNegativeCase(state.inputQueue, state.input, userInputValue)) {
    // reject case of more than two sub operator (no longer negative number case)
    result = (state.prevInputType === Constants.InputType.IsOperator ? state.input : '') + userInputValue;
  }

  state.input = result;
  state.prevInputType = Constants.InputType.IsOperator;
  return prevState2;

}