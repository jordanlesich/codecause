import { useState, useEffect } from "react";

const useInput = (
  initialValue,
  rules = [],
  msg = "Don't forget to set a default err msg"
) => {
  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(true);
  const [active, setActive] = useState(false);
  const [errMsg, setErrMsg] = useState(msg);

  useEffect(() => {
    if (rules.length && active) {
      setValid(
        rules.map((ruleFn) => ruleFn(value)).every((result) => result === true)
      );
      setErrMsg(msg);
    }
  }, [value, rules, active, msg]);

  return {
    value,
    setValue,
    valid,
    setValid,
    setErrMsg,
    reset: () => setValue(""),
    bind: {
      value,
      errMsg,
      active,
      onType: (event) => {
        if (!active) {
          setActive(true);
        }
        setValue(event.target.value);
      },
      valid,
    },
  };
};

export default useInput;
