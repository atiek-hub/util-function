import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { DateFormItem } from "./DateFormItem";
import { TimeFormItem } from "./TimeFormItem";
import { Button } from "@/shadcn-components/ui/button";
type Props = {
  addEvent: () => void;
  title: {
    eventsTitle: string;
    setEventsTitle: Dispatch<SetStateAction<string>>;
  };
  startDate: {
    eventsStartDate: Date | undefined;
    setEventsStartDate: Dispatch<SetStateAction<Date | undefined>>;
  };
  startTime: {
    eventsStartTime: string;
    setEventsStartTime: Dispatch<SetStateAction<string>>;
  };
  endDate: {
    eventsEndDate: Date | undefined;
    setEventsEndDate: Dispatch<SetStateAction<Date | undefined>>;
  };
  endTime: {
    eventsEndTime: string;
    setEventsEndTime: Dispatch<SetStateAction<string>>;
  };
  format: (date: Date | undefined) => string | undefined;
};
export const ScheduleForm = (props: Props) => {
  const { addEvent, title, startDate, startTime, endDate, endTime, format } =
    props;
  const { eventsTitle, setEventsTitle } = title;
  const { eventsStartDate, setEventsStartDate } = startDate;
  const { eventsStartTime, setEventsStartTime } = startTime;
  const { eventsEndDate, setEventsEndDate } = endDate;
  const { eventsEndTime, setEventsEndTime } = endTime;

  const scheduleSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Title must be at least 1 characters." }),
    start_date: z.string().date(),
    start_time: z.string().time(),
    end_date: z.string().date(),
    end_time: z.string().time(),
  });

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addEvent)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="title"
                    {...field}
                    value={eventsTitle}
                    onChange={(e) => setEventsTitle(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex">
            <FormField
              control={form.control}
              name="start_date"
              render={() => (
                <DateFormItem
                  date={eventsStartDate}
                  setDate={setEventsStartDate}
                  format={format}
                />
              )}
            />
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <TimeFormItem
                  field={field}
                  time={eventsStartTime}
                  setTime={setEventsStartTime}
                />
              )}
            />
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="end_date"
              render={() => (
                <DateFormItem
                  date={eventsEndDate}
                  setDate={setEventsEndDate}
                  format={format}
                />
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <TimeFormItem
                  field={field}
                  time={eventsEndTime}
                  setTime={setEventsEndTime}
                />
              )}
            />
          </div>
        </form>
      </Form>
      <Button onClick={addEvent}>保存</Button>
    </div>
  );
};
