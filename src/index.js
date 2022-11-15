import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const STATE_INPUT_INITIAL_VALUE = '0';
const InputType = {
  IsNumber: 0,
  IsOperator: 1,
  IsNone: 2
}
const BTN_EQUALS = GET_BTN_DICT('equals', '=');
const BTN_ZERO = GET_BTN_DICT('zero', '0');
const BTN_ONE = GET_BTN_DICT('one', '1');
const BTN_TWO = GET_BTN_DICT('two', '2');
const BTN_THREE = GET_BTN_DICT('three', '3');
const BTN_FOUR = GET_BTN_DICT('four', '4');
const BTN_FIVE = GET_BTN_DICT('five', '5');
const BTN_SIX = GET_BTN_DICT('six', '6');
const BTN_SEVEN = GET_BTN_DICT('seven', '7');
const BTN_EIGHT = GET_BTN_DICT('eight', '8');
const BTN_NINE = GET_BTN_DICT('nine', '9');
const BTN_ADD = GET_BTN_DICT('add', '+');
const BTN_SUBTRACT = GET_BTN_DICT('subtract', '-');
const BTN_MULTIPLY = GET_BTN_DICT('multiply', '*');
const BTN_DIVIDE = GET_BTN_DICT('divide', '/');
const BTN_DECIMAL = GET_BTN_DICT('decimal', '.');
const BTN_CLEAR = GET_BTN_DICT('clear', 'CLS');

function GET_BTN_DICT(id, value) {
  return { id, value };
};

const ALL_BUTTONS = [BTN_EQUALS, BTN_ZERO, BTN_ONE, BTN_TWO, BTN_THREE, BTN_FOUR, BTN_FIVE,
  BTN_SIX, BTN_SEVEN, BTN_EIGHT, BTN_NINE, BTN_ADD, BTN_SUBTRACT, BTN_MULTIPLY, BTN_DIVIDE, BTN_DECIMAL, BTN_CLEAR]

const CALCULATOR_OPERATIONS = [BTN_ADD.id, BTN_SUBTRACT.id, BTN_MULTIPLY.id, BTN_DIVIDE.id];

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.defaultCalculatorState();
    this.buttonBehavior = this.buttonBehavior.bind(this);
    this.getOutputString = this.getOutputString.bind(this);
  }

  defaultCalculatorState() {
    return { output: '0', input: STATE_INPUT_INITIAL_VALUE, inputQueue: [], prevInputType: InputType.IsNone };
  }

  buttonBehavior(event) {
    const userInputId = event.target.id;
    const userInputValue = event.target.dataset.value;

    if (userInputId === BTN_CLEAR.id) {
      this.setState(this.defaultCalculatorState());

    } else if (userInputId === BTN_EQUALS.id) {
      function replaceAnswer(answer, opIndex, queue) {
        const index1 = opIndex-1;
        const index2 = opIndex+1;
        let part1 = [];
        let part2 = [];
        if (index1 === 0) {
          part1 = [answer];
          part2 = queue.slice(index2+1);
        } else {
          part1 = queue.slice(0, index1);
          part2 = queue.slice(index2+1);
          part1.push(answer);
        }

        return part1.concat(part2);
      }

      function findExistingMultiplyAndDivide(queue) {
        const mulIndex = queue.indexOf(BTN_MULTIPLY.value);
        const divIndex = queue.indexOf(BTN_DIVIDE.value);
        if (mulIndex === -1 && divIndex === -1) return -1;
        if (mulIndex === -1 && divIndex > -1) return divIndex;
        if (mulIndex > -1 && divIndex === -1) return mulIndex;
        
        return (mulIndex > divIndex) ? divIndex : mulIndex
      }

      this.confirmInput(InputType.IsNone);
      this.setState(state => {
        let inputQueue = state.inputQueue;
        
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
              case BTN_MULTIPLY.value:
                answer = Number(n1) * Number(n2);
                break;
              case BTN_DIVIDE.value:
                answer = Number(n1) / Number(n2);
                break;
              default:
                console.error(`Invalid case! Current operation button: ${op}`);
                return;
            }
            inputQueue = replaceAnswer(answer, index, inputQueue);
            index = findExistingMultiplyAndDivide(inputQueue)
          } catch (ex) {
            console.error(`Error thrown during calculating m&d case: ${ex}`);
            return;
          }
        }
        
      // settle all addition and subtraction case
      let finalAnswer = Number(inputQueue.shift());
      while (inputQueue.length > 0) {
        const node = inputQueue.shift();
        switch(node) {
          case BTN_ADD.value:
            const numAdd = Number(inputQueue.shift());
            finalAnswer += numAdd;
            break;
          case BTN_SUBTRACT.value:
            const numSub = Number(inputQueue.shift());
            finalAnswer -= Number(numSub);
            break;
          default:
            console.error("Performing Add & Sub: You are not supposed to be in here!");
            return;
        }
      }
      
      let result = this.defaultCalculatorState();
      result.output = finalAnswer;
      result.input = finalAnswer;
      result.prevInputType = InputType.IsNumber;
      return result;
      });


    } else if (CALCULATOR_OPERATIONS.includes(userInputId)) {
      // operator buttons logic
      this.confirmInput(InputType.IsOperator);

      // handle double '-' case (minus a negative number)
      this.setState(state => {
        if (userInputValue !== BTN_SUBTRACT.value && state.prevInputType === InputType.IsNone) return {}; // reject case of fist input is operator
        let result = {};
        result.input = userInputValue;
        result.prevInputType = InputType.IsOperator;
        if (userInputValue === BTN_SUBTRACT.value && this.isNegativeCase(state.inputQueue, state.input, userInputValue)) {
          // reject case of more than two sub operator (no longer negative number case)
          result.input = (state.prevInputType === InputType.IsOperator ? state.input : '') + userInputValue;
        }
        return result;
      });


    } else {
      // number buttons logic
      this.confirmInput(InputType.IsNumber);

      this.setState(state => {
        if (state.input.startsWith('0') && userInputValue === BTN_ZERO.value) return {}; // handle double zero case
        const appendedInput = (state.input.startsWith(BTN_ZERO.value) ? '' : state.input) + userInputValue;
        try {
          const numbered = Number(appendedInput); // fail if appendedInput is not a number, use this mechanism to filter out bad number string like 1..2, 1.2., 01 [coverted to 1]
          if (numbered || numbered === 0) {
            let result = {};
            result.input = appendedInput;
            result.prevInputType = InputType.IsNumber;

            // validate negative number case
            if (state.prevInputType === InputType.IsOperator) {
              const firstOp = state.inputQueue.at(-1);
              const secondOp = state.inputQueue.at(-2) ? state.inputQueue.at(-2) : BTN_ADD.value;
              if (firstOp && secondOp && this.isOperator(firstOp) && this.isOperator(secondOp) && firstOp === BTN_SUBTRACT.value) {
                result.inputQueue = state.inputQueue.slice(0,state.inputQueue.length-1);
                result.input = -1*result.input;
              }
            }
            return result;
          }
        } catch (ex) {
          console.error(`Exception (${ex}) thrown during conversion of appended input: ${appendedInput}.`);
        }

        return {};
      });
    }
  }

  isOperator(testSubject) {
    return [BTN_ADD.value, BTN_SUBTRACT.value, BTN_MULTIPLY.value, BTN_DIVIDE.value].includes(testSubject);
  }

  isNegativeCase(inputQueue, input, op) {
    const tmpResult = [...input, op].join('');
    if (tmpResult.length > 2) return false;
    const result = (tmpResult === BTN_SUBTRACT.value) || 
      (this.isOperator(tmpResult[0]) && tmpResult[0] !== BTN_SUBTRACT.value && tmpResult[1] === BTN_SUBTRACT.value) || 
      (tmpResult[0] === BTN_SUBTRACT.value && tmpResult[1] === BTN_SUBTRACT.value && inputQueue.length !== 0);
    return result;
  }

  confirmInput(curInputType) {
    this.setState(state => {
      if (state.prevInputType !== InputType.IsNone && curInputType !== state.prevInputType) {
        const queue = state.inputQueue;
        if (state.prevInputType === InputType.IsOperator && state.input.length === 2 && state.input[1] === BTN_SUBTRACT.value) {
          queue.push(state.input[0]);
          queue.push(state.input[1]);
        } else if (state.prevInputType === InputType.IsOperator && state.input.length === 2 && state.input[1] !== BTN_SUBTRACT.value) {
          console.error(`Confirm input error: double operator is not negative case, second input: ${state.input[1]}. Please check calculator operator logic!`);
        } else if (state.prevInputType === InputType.IsOperator && state.input.length > 2) {
          console.error(`Confirm input error: state.input.length [${state.input.length}] > 2. Current state.input: ${state.input.length}. Please check calculator operator logic!`);
        } else {
          queue.push(state.input);
        }
        console.log(`[${queue.join('],[')}]`);
        return {
          inputQueue: queue,
          input: STATE_INPUT_INITIAL_VALUE,
          output: this.getOutputString(queue)
        }
      }
    });
  }

  getOutputString(queue) {
    return queue.join('');
  }

  render() {
    let buttons = [];
    for (let btn of ALL_BUTTONS) {
      buttons.push(<CalculatorButton key={btn.id} btnID={btn.id} btnSign={btn.value} clickBehavior={this.buttonBehavior} />);
    }

    return (
      <div>
        {buttons}
        <CalculatorDisplay output={this.state.output} input={this.state.input} clickBehavior={this.buttonBehavior} />
      </div>
    );
  }
}


function CalculatorButton(props) {
  return (
    <button type='button' id={props.btnID} onClick={props.clickBehavior} data-value={props.btnSign}>{props.btnSign}</button>
  );
}

function CalculatorDisplay(props) {
  return (
    <div>
      <p id='display'>{props.output}</p>
      <p id='display2'>Output: {props.output}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);
