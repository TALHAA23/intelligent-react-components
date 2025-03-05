const stringToFunctionDefination = (funcAsString: undefined | string) => {
  if (!funcAsString) return false;
  console.log(funcAsString);
  const wrapperAnonyousFunction = new Function(`return ${funcAsString}`);
  const generatedFunction = wrapperAnonyousFunction();
  return generatedFunction;
};

export default stringToFunctionDefination;
