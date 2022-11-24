function GET_BTN_DICT(id, value, inputType) {
  return { id, value, inputType };
};

export const STATE_INPUT_INITIAL_VALUE = '0';
export const InputType = {
  IsNumber: 0,
  IsOperator: 1,
  IsNone: 2
}

export const BTN_EQUALS = GET_BTN_DICT('equals', '=', InputType.IsOperator);
export const BTN_ZERO = GET_BTN_DICT('zero', '0', InputType.IsNumber);
export const BTN_ONE = GET_BTN_DICT('one', '1', InputType.IsNumber);
export const BTN_TWO = GET_BTN_DICT('two', '2', InputType.IsNumber);
export const BTN_THREE = GET_BTN_DICT('three', '3', InputType.IsNumber);
export const BTN_FOUR = GET_BTN_DICT('four', '4', InputType.IsNumber);
export const BTN_FIVE = GET_BTN_DICT('five', '5', InputType.IsNumber);
export const BTN_SIX = GET_BTN_DICT('six', '6', InputType.IsNumber);
export const BTN_SEVEN = GET_BTN_DICT('seven', '7', InputType.IsNumber);
export const BTN_EIGHT = GET_BTN_DICT('eight', '8', InputType.IsNumber);
export const BTN_NINE = GET_BTN_DICT('nine', '9', InputType.IsNumber);
export const BTN_ADD = GET_BTN_DICT('add', '+', InputType.IsOperator);
export const BTN_SUBTRACT = GET_BTN_DICT('subtract', '-', InputType.IsOperator);
export const BTN_MULTIPLY = GET_BTN_DICT('multiply', 'x', InputType.IsOperator);
export const BTN_DIVIDE = GET_BTN_DICT('divide', '/', InputType.IsOperator);
export const BTN_DECIMAL = GET_BTN_DICT('decimal', '.', InputType.IsNumber);
export const BTN_CLEAR = GET_BTN_DICT('clear', 'AC', InputType.IsNone);
// export const ALL_BUTTONS = [BTN_EQUALS, BTN_ZERO, BTN_ONE, BTN_TWO, BTN_THREE, BTN_FOUR, BTN_FIVE,
//   BTN_SIX, BTN_SEVEN, BTN_EIGHT, BTN_NINE, BTN_ADD, BTN_SUBTRACT, BTN_MULTIPLY, BTN_DIVIDE, BTN_DECIMAL, BTN_CLEAR]\

export const ALL_BUTTONS = [BTN_CLEAR, BTN_DIVIDE, BTN_SEVEN, BTN_EIGHT, BTN_NINE, BTN_MULTIPLY
  , BTN_FOUR, BTN_FIVE, BTN_SIX, BTN_SUBTRACT, BTN_ONE, BTN_TWO, BTN_THREE, BTN_ADD, BTN_ZERO, BTN_DECIMAL, BTN_EQUALS];

export const CALCULATOR_OPERATIONS = [BTN_ADD.id, BTN_SUBTRACT.id, BTN_MULTIPLY.id, BTN_DIVIDE.id];

export const STATE_ACTION_TYPE = 'STATE_ACTION_TYPE';
export const DefaultCalculatorState = {
  CalculatorReducer: {
    output: '0', input: STATE_INPUT_INITIAL_VALUE, inputQueue: [], prevInputType: InputType.IsNone
  }
}

export const ActionType = {
  ConfirmInput: "ConfirmInput",
  OperatorButton: "OperatorButton",
  NumberButton: "NumberButton",
  ClearButton: "ClearButton"
}