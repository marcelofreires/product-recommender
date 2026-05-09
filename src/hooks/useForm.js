// useForm.js
import { useState } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (field, value) => {
    setFormData((previousFormDataState) => ({
      ...previousFormDataState,
      [field]: value,
    }));
  };

  return { formData, handleChange };
};

export default useForm;
