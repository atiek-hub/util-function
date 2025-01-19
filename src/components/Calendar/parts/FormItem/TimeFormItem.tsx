import { FormControl, FormItem } from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { TimeFormItemProps } from "../../types/formItem";

export const TimeFormItem = (props: TimeFormItemProps) => {
  const { field, time, setTime } = props;
  return (
    <div>
      <FormItem>
        <FormControl>
          <Input
            {...field}
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </FormControl>
      </FormItem>
    </div>
  );
};
