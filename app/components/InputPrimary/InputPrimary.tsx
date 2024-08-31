import React from 'react';

interface InputFieldProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const InputFieldPrimary: React.FC<InputFieldProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
}) => {
  return (
    <div className="h-20">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`p-4 h-[55px] bg-[#224957] xs:h-[59px] rounded-lg w-full block text-sm text-white appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-white text-xs pt-1">{error}</p>}
    </div>
  );
};

export default InputFieldPrimary;
