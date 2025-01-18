import { Common } from "@/types";

interface Result {
  [key: string]: any;
}

function extractInfoFromProps(props: Common): Result {
  const result: Result = {};

  if (props.supportingProps) {
    const { utils = {}, variables = {} } = props.supportingProps;
    Object.keys(utils).forEach((key) => {
      result[`${key}`] = utils[key];
    });
    Object.keys(variables).forEach((key) => {
      result[`${key}`] = variables[key];
    });
  }

  if (props.mutation) {
    props.mutation.forEach((mutation) => {
      result[mutation.id] = mutation.mutate;
    });
  }

  const callbacks = [props.callbacks?.independent, props.callbacks?.dependent];
  callbacks.map((callbackSet) => {
    callbackSet?.map((callback, index) => {
      const callbackName = callback?.callback?.name;
      const key =
        callbackName == "callback"
          ? `callback${index == 0 ? "independent" : "dependent"}${index}`
          : callbackName;
      result[key] = callback.callback;
    });
  });
  return result;
}
export default extractInfoFromProps;
