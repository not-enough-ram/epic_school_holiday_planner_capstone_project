import { isEmpty } from "ramda";
import React from "react";

export const useValues = (name, props) => {
  React.useEffect(() => {
    if (!isEmpty(props.errors)) {
      props.setFieldError(name, "SubFormError");
    }
  }, [name, props.values]);
};
