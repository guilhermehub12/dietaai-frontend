import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface OptionsProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OptionsProps[]
}

export function Select({ 
  name, 
  control, 
  placeholder, 
  error, 
  options 
}: SelectProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between"
              >
                {value 
                  ? options.find(option => option.value === value)?.label 
                  : placeholder
                }
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Select an Option</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {options.map((item) => (
                  <Button 
                    key={item.value.toString()}
                    variant="outline" 
                    onClick={() => {
                      onChange(item.value)
                      setOpen(false)
                    }}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}