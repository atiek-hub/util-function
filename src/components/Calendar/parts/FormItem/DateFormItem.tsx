import { Button } from "@/shadcn-components/ui/button";
import { Calendar } from "@/shadcn-components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn-components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ja } from "date-fns/locale";
import { DateFormItemProps } from "../../../../types/formItem";

export const DateFormItem = (props: DateFormItemProps) => {
  const { field, dateTitle, setDate, format } = props;
  console.log("value", field);
  return (
    <FormItem className="w-full">
      <FormLabel>{dateTitle}</FormLabel>
      <FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              style={{ width: "98%" }}
            >
              <CalendarIcon />
              <span>{format(field.value)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              locale={ja}
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                setDate(date);
                field.onChange(date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
