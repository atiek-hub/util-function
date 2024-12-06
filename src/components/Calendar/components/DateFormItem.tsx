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
import { Dispatch, SetStateAction } from "react";
import { ja } from "date-fns/locale";
type Props = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  format: (date: Date | undefined) => string | undefined;
};

export const DateFormItem = (props: Props) => {
  const { date, setDate, format } = props;
  return (
    <div>
      <FormItem>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
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
    </div>
  );
};
