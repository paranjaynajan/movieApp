import React from 'react';

interface SecondaryButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#093545] mt-2 border-[#FFFFFF] border-[1px] text-white xs:p-4 p-2 w-full rounded-md cursor-pointer ${className}`}
    >
      <div className="flex justify-center">
        {children}
      </div>
    </button>
  );
};

export default SecondaryButton;
