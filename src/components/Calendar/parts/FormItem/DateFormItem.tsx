import { Button } from "@/shadcn-components/ui/button";
import { Calendar } from "@/shadcn-components/ui/calendar";
import { FormControl, FormItem } from "@/shadcn-components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn-components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ja } from "date-fns/locale";
import { DateFormItemProps } from "../../types/formItem";



export const DateFormItem = (props: DateFormItemProps) => {
  const { date, setDate, format } = props;
  return (
    <FormItem className="w-full">
      <FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              style={{ width: "98%" }}
            >
              <CalendarIcon />
              <span>{format(date)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              locale={ja}
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormControl>
    </FormItem>
  );
};
