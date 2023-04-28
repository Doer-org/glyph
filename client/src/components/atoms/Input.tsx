type TInput<T> = {
  type: React.HTMLInputTypeAttribute;
  label?: string;
  content: string | number;
  changeContent: (content: T) => void;
  required?: boolean;
  max?: number | string;
  min?: number | string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  className?: string;
};
export const Input = <T,>({
  type,
  label,
  content,
  changeContent,
  required,
  max,
  min,
  maxLength,
  minLength,
  placeholder,
  className,
}: TInput<T>) => {
  return (
    <div className="my-1">
      <label htmlFor={label} className="py-1">
        {label}
      </label>
      <input
        placeholder={placeholder}
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
        type={type}
        className={`py-1 px-2 bg-origin border-2 rounded-md ${className}`}
        id={label}
        onChange={(e) => changeContent(e.target.value as T)}
        value={content}
        required={required}
      />
    </div>
  );
};
