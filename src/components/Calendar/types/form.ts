import { Dispatch, SetStateAction } from "react";

export type ScheduleFormProps = {
    addEvent?: () => void;
    title: {
      eventsTitle: string;
      setEventsTitle: Dispatch<SetStateAction<string>>;
    };
    allDay: {
      isAllDay: boolean;
      setIsAllDay: Dispatch<SetStateAction<boolean>>;
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