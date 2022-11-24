import * as Constants from '../Kernel/Constants';

function CalculatorButton(props) {
    function getClassName(inputType) {
        switch (inputType) {
            case Constants.InputType.IsNumber:
                return 'button-number';
            case Constants.InputType.IsOperator:
                return 'button-operator';
            default:
                return 'button-clear';
        }
    }

    function getSpanBtn(btnId) {
        switch(btnId) {
            case Constants.BTN_CLEAR.id:
                return 'button-span-3';
            case Constants.BTN_ZERO.id:
                return 'button-span-2';
            default:
                return '';
        }
    }

    return (
        <button type='button'
            className={`button ${props.btnID} ${getClassName(props.inputType)} ${getSpanBtn(props.btnID)}`}
            id={props.btnID}
            onClick={props.clickBehavior}
            data-value={props.btnSign}>
            {props.btnSign}
        </button>
    );
}

export { CalculatorButton };