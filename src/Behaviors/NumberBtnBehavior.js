import * as Constants from '../Kernel/Constants';
import { deepCopy } from '../Kernel/DeepCopy';
import * as Utilities from '../Kernel/Utilities';

export const NumberBtnBehavior = (prevState, userInputValue) => {
  // this.confirmInput(Constants.InputType.IsNumber);
  const prevState2 = deepCopy(prevState);
  const state = prevState2.CalculatorReducer;

  if (state.input.startsWith('0') && userInputValue === Constants.BTN_ZERO.value) return prevState; // handle double zero case
  const appendedInput = (state.input.startsWith(Constants.BTN_ZERO.value) ? '' : state.input) + userInputValue;
  try {
    const numbered = Number(appendedInput); // fail if appendedInput is not a number, use this mechanism to filter out bad number string like 1..2, 1.2., 01 [coverted to 1]
    if (numbered || numbered === 0) {
      let result = '';
      result = appendedInput;

      // validate negative number case
      if (state.prevInputType === Constants.InputType.IsOperator) {
        const firstOp = state.inputQueue.at(-1);
        const secondOp = state.inputQueue.at(-2) ? state.inputQueue.at(-2) : Constants.BTN_ADD.value;
        if (firstOp && secondOp && Utilities.isOperator(firstOp) && Utilities.isOperator(secondOp) && firstOp === Constants.BTN_SUBTRACT.value) {
          state.inputQueue = state.inputQueue.slice(0, state.inputQueue.length - 1);
          result = -1 * result;
        }
      }

      state.input = result;
      state.prevInputType = Constants.InputType.IsNumber;
      return prevState2;
    }
  } catch (ex) {
    console.error(`Exception (${ex}) thrown during conversion of appended input: ${appendedInput}.`);
  }

  return prevState;
};