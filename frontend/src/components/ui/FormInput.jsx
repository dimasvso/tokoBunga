function FormInput({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  classNameInput,
  multiple,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        {...(type !== "file" ? { value } : {})}
        accept={type === "file" ? "image/*" : undefined}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${classNameInput} `}
        {...(multiple ? { multiple: true } : {})}
      />
    </div>
  );
}
export default FormInput;
