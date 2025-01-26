const stringToFunctionDefination = (funcAsString:undefined|string)=>{
    if(!funcAsString) return false;
    const wrapperAnonyousFunction = new Function(
        `return ${funcAsString}`
      );
      const generatedFunction = wrapperAnonyousFunction();
      return generatedFunction
};

export default stringToFunctionDefination;