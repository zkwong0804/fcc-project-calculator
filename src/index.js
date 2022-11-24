import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { CalculatorButton } from './Components/CalculatorButton';
import { CalculatorDisplay } from './Components/CalculatorDisplay';
import * as Constants from './Kernel/Constants';
import * as Redux from './State/Redux';
import { Provider } from 'react-redux';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.buttonBehavior = this.buttonBehavior.bind(this);
  }

  buttonBehavior(event) {
    const userInputId = event.target.id;
    const userInputValue = event.target.dataset.value;

    if (userInputId === Constants.BTN_CLEAR.id) {
      this.props.ClearButtonBehavior();
    } else if (userInputId === Constants.BTN_EQUALS.id) {

      this.props.ConfirmInput(Constants.InputType.IsNone);
      this.props.EqualsButtonBehavior();

    } else if (Constants.CALCULATOR_OPERATIONS.includes(userInputId)) {
      // operator buttons logic
      this.props.ConfirmInput(Constants.InputType.IsOperator);
      this.props.OperatorButtonBehavior(userInputId, userInputValue);
    } else {
      // number buttons logic
      this.props.ConfirmInput(Constants.InputType.IsNumber);
      this.props.NumberButtonBehavior(userInputId, userInputValue);
    }
  }

  render() {
    let buttons = [];
    for (let btn of Constants.ALL_BUTTONS) {
      buttons.push(<CalculatorButton
        key={btn.id}
        btnID={btn.id}
        btnSign={btn.value}
        clickBehavior={this.buttonBehavior}
        inputType={btn.inputType} />);
    }

    return (
      <div className='calculator-container'>
        <div className='display-container'>
          <CalculatorDisplay output={this.props.output} input={this.props.input} clickBehavior={this.buttonBehavior} />
        </div>
        <div className='buttons'>
          <div>
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

const MappedCalculator = Redux.getConnectedComponent(Calculator);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={Redux.store}>
  <MappedCalculator />
</Provider>);
