import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { DateFormItem } from "../FormItem/DateFormItem";
import { TimeFormItem } from "../FormItem/TimeFormItem";
import { Switch } from "@/shadcn-components/ui/switch";
import { ScheduleFormProps } from "../../../../types/form";
import { useEffect } from "react";
import { Button } from "@/shadcn-components/ui/button";

export const ScheduleForm = (props: ScheduleFormProps) => {
  const {
    clickEvent,
    title,
    allDay,
    startDate,
    startTime,
    endDate,
    endTime,
    format,
  } = props;
  const { eventsTitle, setEventsTitle } = title;
  const { isAllDay, setIsAllDay } = allDay;
  const { eventsStartDate, setEventsStartDate } = startDate;
  const { eventsStartTime, setEventsStartTime } = startTime;
  const { eventsEndDate, setEventsEndDate } = endDate;
  const { eventsEndTime, setEventsEndTime } = endTime;

  const scheduleSchema = z
    .object({
      title: z
        .string()
        .min(1, { message: "Title must be at least 1 characters." }),
      all_day: z.boolean().default(false).optional(),
      start_date: z.date({
        required_error: "A date of start schedule is required.",
      }),
      start_time: z
        .string()
        .min(4, { message: "A time of start schedule is required" }),
      end_date: z.date({
        required_error: "A date of end schedule is required.",
      }),
      end_time: z
        .string()
        .min(4, { message: "A time of end schedule is required" }),
    })
    .refine(
      // 開始日時が終了日時よりも後になっている場合または、一緒の場合エラーを出す
      (data) => {
        const { start_date, end_date, start_time, end_time } = data;
        const [s_hours, s_minutes] = start_time.split(":").map(Number);
        const [e_hours, e_minutes] = end_time.split(":").map(Number);
        start_date.setHours(s_hours);
        end_date.setHours(e_hours);
        start_date.setMinutes(s_minutes);
        end_date.setMinutes(e_minutes);
        return start_date < end_date;
      },
      {
        message: "開始日、または終了日を確認してください",
        path: ["end_date"],
      }
    );

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
  });

  const handleToggle = (e: boolean) => {
    setIsAllDay(e); // 状態をトグルする関数
    if (e) {
      form.setValue("start_time", "00:00");
      setEventsStartTime("00:00");
      form.setValue("end_time", "00:00");
      setEventsEndTime("00:00");
      const EndDateWhenAllDayIsSet = eventsStartDate!.getDate() + 1;
      eventsEndDate!.setDate(EndDateWhenAllDayIsSet);
      form.setValue("end_date", eventsStartDate!);
    }
  };

  useEffect(() => {
    form.setValue("start_date", eventsStartDate!);
    form.setValue("start_time", eventsStartTime);
    form.setValue("end_date", eventsEndDate!);
    form.setValue("end_time", eventsEndTime);
    form.setValue("title", eventsTitle);
    form.setValue("all_day", isAllDay);
  }, [props]);

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(clickEvent!)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="title"
                    onChange={(e) => {
                      field.onChange(e.target.value); // field.onChangeを呼び出す
                      setEventsTitle(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
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
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange();
                      handleToggle(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <DateFormItem
                  field={field}
                  dateTitle="開始日"
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
                  timeTitle="開始時間"
                  setTime={setEventsStartTime}
                  disabled={isAllDay} // Disable the time input if all day is checked
                />
              )}
            />
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <DateFormItem
                  field={field}
                  dateTitle="終了日"
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
                  timeTitle="終了時間"
                  setTime={setEventsEndTime}
                  disabled={isAllDay} // Disable the time input if all day is checked
                />
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">保存</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
