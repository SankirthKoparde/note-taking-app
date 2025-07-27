import React, { forwardRef, ReactNode } from 'react';

export interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label: string;
  icon: ReactNode;
  id: string;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, CustomInputProps & { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string }>(
  ({ label, icon, id, ...props }, ref) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>
      <input
        {...props}
        ref={ref}
        id={id}
        placeholder=" "
        className="peer w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <label
        htmlFor={id}
        className="absolute left-10 -top-2.5 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  )
);

export const FloatingLabelDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, label, icon, id, disabled, required }, ref) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>
      <input
        onClick={onClick} ref={ref} value={value} readOnly id={id} disabled={disabled} required={required} placeholder=" "
        className="peer w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <label
        htmlFor={id}
        className={`absolute left-10 bg-white px-1 transition-all ${ value ? '-top-2.5 text-sm text-blue-600' : 'top-3.5 text-base text-gray-400' } peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600`}
      >
        {label}
      </label>
    </div>
  )
);