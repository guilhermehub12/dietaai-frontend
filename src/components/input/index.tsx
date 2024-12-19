import React from 'react'
import { Controller } from 'react-hook-form'
import { Input as ShadcnInput } from "@/components/ui/input"

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
}

export function Input({ 
  name, 
  control, 
  placeholder, 
  rules, 
  error, 
  type = 'text'
}: InputProps) {
  return (
    <div className="mb-4">
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }}) => (
          <ShadcnInput
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}