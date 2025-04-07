import { FormControl, FormItem, FormLabel } from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { TimeFormItemProps } from "../../types/formItem";

export const TimeFormItem = (props: TimeFormItemProps) => {
  const { field, timeTitle, setTime, disabled } = props;
  return (
    <div>
      <FormItem>
        <FormLabel>{timeTitle}</FormLabel>
        <FormControl>
          <Input
            type="time"
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              setTime(e.target.value)
            }}
            disabled={disabled} // Disable the time input if all day is checked
          />
        </FormControl>
      </FormItem>
    </div>
  );
};
