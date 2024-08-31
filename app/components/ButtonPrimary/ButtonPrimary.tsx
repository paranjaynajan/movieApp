import React from 'react';

interface PrimaryButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#2BD17E] mt-2 text-white xs:p-4 p-2 w-full rounded-md cursor-pointer ${className}`}
    >
      <div className="flex justify-center">
        {children}
      </div>
    </button>
  );
};

export default PrimaryButton;
