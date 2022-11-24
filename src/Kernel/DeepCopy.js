export const deepCopy = (src) => {
    console.log(src);
    const target = {...src};
    // const target = {CalculatorReducer:{}};
    const innerSrc = src.CalculatorReducer;
    target.CalculatorReducer = {...src.CalculatorReducer};
    target.CalculatorReducer.input = innerSrc.input;
    target.CalculatorReducer.output = innerSrc.output;
    target.CalculatorReducer.prevInputType = innerSrc.prevInputType;
    target.CalculatorReducer.inputQueue = innerSrc.inputQueue.slice();
    return target;
}