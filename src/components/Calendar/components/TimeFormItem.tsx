import { FormControl, FormItem } from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { ControllerRenderProps } from "react-hook-form";
type Props = {
  field: ControllerRenderProps<{
    title: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
  }>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
};
export const TimeFormItem = (props: Props) => {
  const { field, time, setTime } = props;
  return (
    <div>
      <FormItem className="w-full">
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
