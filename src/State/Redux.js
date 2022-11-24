import * as ReduxToolKit from '@reduxjs/toolkit';
import * as ReactRedux from 'react-redux';

import { CalculatorReducer } from './CalculatorReducer';
import * as Actions from './Actions';

const mapDispatchToProps = (dispatch) => {
    return {
        ClearButtonBehavior: () => {
            dispatch(Actions.ClearButtonAction())
        },
        NumberButtonBehavior: (userInputId, userInputValue) => {
            dispatch(Actions.NumberButtonAction(userInputId, userInputValue));
        },
        OperatorButtonBehavior: (userInputId, userInputValue) => {
            dispatch(Actions.OperatorButtonAction(userInputId, userInputValue));
        },
        ConfirmInput: (currentInputType) => {
            dispatch(Actions.ConfirmInputAction(currentInputType))
        },
        EqualsButtonBehavior: () => {
            dispatch(Actions.EqualsButtonAction());
        }
    }
}
const mapStateToProps = (state) => {
    return {
        output: state.CalculatorReducer.CalculatorReducer.output, 
        input: state.CalculatorReducer.CalculatorReducer.input, 
        inputQueue: state.CalculatorReducer.CalculatorReducer.inputQueue, 
        prevInputType: state.CalculatorReducer.CalculatorReducer.prevInputType
    }
}

const getConnectedComponent = (component) => {
    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(component);
}

// const store = createStore(CalculatorReducer);
const store = ReduxToolKit.configureStore({
    reducer: {
        CalculatorReducer
    }
});


export {store, getConnectedComponent};