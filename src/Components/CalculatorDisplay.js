function CalculatorDisplay(props) {
    return (
        <div>
            <p id='display'>{props.input}</p>
            {/* <p id='display2'>Output: {props.output}</p> */}
        </div>
    );
}

export {CalculatorDisplay};