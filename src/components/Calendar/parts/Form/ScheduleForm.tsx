import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { DateFormItem } from "../FormItem/DateFormItem";
import { TimeFormItem } from "../FormItem/TimeFormItem";
import { Switch } from "@/shadcn-components/ui/switch";
import { ScheduleFormProps } from "../../types/form";


export const ScheduleForm = (props: ScheduleFormProps) => {
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
    all_day: z.boolean(),
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
        <form onSubmit={form.handleSubmit(addEvent!)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
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
          <FormField
            control={form.control}
            name="all_day"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>終日</FormLabel>
                <FormControl>
                  <Switch
                    style={{ padding: 0, marginTop: 0 }}
                    checked={field.value}
                    onCheckedChange={field.onChange}
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
    </div>
  );
};
