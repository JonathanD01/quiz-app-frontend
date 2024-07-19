import { useState } from "react";

const useFormInputs = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return {
    inputs,
    handleChange,
  };
};

export default useFormInputs;
