import * as Constants from '../Kernel/Constants';
import { deepCopy } from '../Kernel/DeepCopy';

export const ConfirmInputBehavior = (prevState, curInputType) => {
    function getOutputString(queue) {
        return queue.join('');
    }
    const prevState2 = deepCopy(prevState);
    const state = prevState2.CalculatorReducer;

    if (state.prevInputType !== Constants.InputType.IsNone && curInputType !== state.prevInputType) {
        const queue = state.inputQueue;
        if (state.prevInputType === Constants.InputType.IsOperator
            && state.input.length === 2 && state.input[1] === Constants.BTN_SUBTRACT.value) {
            queue.push(state.input[0]);
            queue.push(state.input[1]);
        } else if (state.prevInputType === Constants.InputType.IsOperator
            && state.input.length === 2 && state.input[1] !== Constants.BTN_SUBTRACT.value) {
            console.error(`Confirm input error: double operator is not negative case, 
            second input: ${state.input[1]}. Please check calculator operator logic!`);
        } else if (state.prevInputType === Constants.InputType.IsOperator && state.input.length > 2) {
            console.error(`Confirm input error: state.input.length [${state.input.length}] > 2. 
            Current state.input: ${state.input.length}. Please check calculator operator logic!`);
        } else {
            queue.push(state.input);
        }
        state.inputQueue = queue;
        state.input = Constants.STATE_INPUT_INITIAL_VALUE;
        state.output = getOutputString(queue);
        return prevState2;
    }
    return prevState;
}