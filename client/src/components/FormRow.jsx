const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};

export default FormRow;
