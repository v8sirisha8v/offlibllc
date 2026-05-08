export default function AuthInput({label, type, id, placeholder, value, onChange, required =  true}){
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-medium">{label}</label>
      <input
        type={type}
        className="form-control form-control-lg rounded-3"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
