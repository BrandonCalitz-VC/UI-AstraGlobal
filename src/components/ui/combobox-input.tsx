import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormField } from "./form";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: Option[];
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  ({ options, placeholder = "Select...", className, ...props }, ref) => {
    const { name, formItemId, formDescriptionId, formMessageId } =
      useFormField();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState((props.value as string) || "");

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      props.onChange?.({
        target: { name, value: newValue },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-labelledby={formItemId}
            aria-describedby={`${formDescriptionId} ${formMessageId}`}
            className={cn(
              "flex h-10 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-800 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}...`}
            />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      handleValueChange(
                        currentValue === value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        <input
          type="hidden"
          name={name}
          ref={ref}
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          {...props}
        />
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";

export { Combobox };
