import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value }
        }
      };
    case "SET_DATA":
      return { inputs: action.inputs };
    default:
      return state;
  }
};

export const useForm = initialInputs => {
  console.log("Form-hook=>", initialInputs);
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs
  });

  const inputHandler = useCallback((id, value) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      inputId: id
    });
  }, []);

  const setFormData = useCallback(inputData => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
