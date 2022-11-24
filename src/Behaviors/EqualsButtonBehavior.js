import * as Constants from '../Kernel/Constants';
import { deepCopy } from '../Kernel/DeepCopy';
export const EqualsButtonBehavior = (prevState) => {
    const prevState2 = deepCopy(prevState);
    const state = prevState2.CalculatorReducer;

    function replaceAnswer(answer, opIndex, queue) {
        const index1 = opIndex - 1;
        const index2 = opIndex + 1;
        let part1 = [];
        let part2 = [];
        if (index1 === 0) {
            part1 = [answer];
            part2 = queue.slice(index2 + 1);
        } else {
            part1 = queue.slice(0, index1);
            part2 = queue.slice(index2 + 1);
            part1.push(answer);
        }

        return part1.concat(part2);
    }

    function findExistingMultiplyAndDivide(queue) {
        const mulIndex = queue.indexOf(Constants.BTN_MULTIPLY.value);
        const divIndex = queue.indexOf(Constants.BTN_DIVIDE.value);
        if (mulIndex === -1 && divIndex === -1) return -1;
        if (mulIndex === -1 && divIndex > -1) return divIndex;
        if (mulIndex > -1 && divIndex === -1) return mulIndex;

        return (mulIndex > divIndex) ? divIndex : mulIndex
    }

    let inputQueue = state.inputQueue;
    console.log(inputQueue);

    // after calculate an operation, replace the existing elements with final answer
    // settle all multiply and divide case
    let index = findExistingMultiplyAndDivide(inputQueue);
    while (index !== -1) {
        try {
            const n1 = inputQueue[index - 1];
            const n2 = inputQueue[index + 1];
            const op = inputQueue[index];
            let answer = 0;
            switch (op) {
                case Constants.BTN_MULTIPLY.value:
                    answer = Number(n1) * Number(n2);
                    break;
                case Constants.BTN_DIVIDE.value:
                    answer = Number(n1) / Number(n2);
                    break;
                default:
                    console.error(`Invalid case! Current operation button: ${op}`);
                    return prevState;
            }
            inputQueue = replaceAnswer(answer, index, inputQueue);
            index = findExistingMultiplyAndDivide(inputQueue)
        } catch (ex) {
            console.error(`Error thrown during calculating m&d case: ${ex}`);
            return prevState;
        }
    }

    // settle all addition and subtraction case
    let finalAnswer = Number(inputQueue.shift());
    while (inputQueue.length > 0) {
        const node = inputQueue.shift();
        switch (node) {
            case Constants.BTN_ADD.value:
                const numAdd = Number(inputQueue.shift());
                finalAnswer += numAdd;
                break;
            case Constants.BTN_SUBTRACT.value:
                const numSub = Number(inputQueue.shift());
                finalAnswer -= Number(numSub);
                break;
            default:
                console.error("Performing Add & Sub: You are not supposed to be in here!");
                return prevState;
        }
    }

    // let result = Constants.DefaultCalculatorState;
    state.output = finalAnswer;
    state.input = finalAnswer;
    state.prevInputType = Constants.InputType.IsNumber;
    state.inputQueue = [];
    return prevState2;
}