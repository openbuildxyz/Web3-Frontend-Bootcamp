import { KeyboardEvent, useCallback } from "react";

interface IProps {
  onSubmit: any;
  placeholder?: any;
  label: any;
  defaultValue?: any;
  onBlur?: any;
}

const sanitize = (string: string) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match: any) => map[match as keyof typeof map]);
};

const hasValidMin = (value: any, min: any) => {
  return value.length >= min;
};

export function Input({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur,
}: IProps) {
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = e.currentTarget.value.trim();

        if (!hasValidMin(value, 2)) return;

        onSubmit(sanitize(value));
        e.currentTarget.value = "";
      }
    },
    [onSubmit]
  );

  return (
    <div className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label className="visually-hidden" htmlFor="todo-input">
        {label}
      </label>
    </div>
  );
}
