import React from "react";

const Input = ({ type, id, label, disabled, onChange, value, required }) => {
  return (
    <div className="input-container">
      <input 
        className="form-group__input"
        type={type}
        id={id}
        name={id}
        placeholder={label}
        disabled={disabled}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
};

export default Input; 