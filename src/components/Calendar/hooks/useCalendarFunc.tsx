import { createRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";

type MyEventsType = {
  id: string;
  title: string;
  start: Date | null;
  end: Date | null;
};

type SelectEventType = {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  allDay: boolean;
  jsEvent: MouseEvent | null;
  view: unknown;
};

type EventClickArg = {
  el: HTMLElement;
  event: MyEventsType;
  jsEvent: MouseEvent;
  view: unknown;
};

export const useCalendarFunc = () => {
  const ref = createRef<FullCalendar>();
  const [eventsTitle, setEventsTitle] = useState<string>("");
  const [eventsStartDate, setEventsStartDate] = useState<Date>();
  const [eventsStartTime, setEventsStartTime] = useState<string>("");
  const [eventsEndDate, setEventsEndDate] = useState<Date>();
  const [eventsEndTime, setEventsEndTime] = useState<string>("");
  const [myEvents, setMyEvents] = useState<MyEventsType[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleClick = (addedInfo: EventClickArg) => {
    const { title, start, end } = myEvents[Number(addedInfo.event.id)];
    if (!start || !end) {
      return;
    }
    setEventsTitle(title);
    setEventsStartDate(start);
    setEventsStartTime(format(start, "HH:mm"));
    setEventsEndDate(end);
    setEventsEndTime(format(end, "HH:mm"));
    setIsOpenDialog(true);
  };
  const formatCaption = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    const dayArr = ["日", "月", "火", "水", "木", "金", "土"];
    const day = format(date, "MM月dd日");
    return `${day}(${dayArr[date.getDay()]})`;
  };

  const handleSelect = (selectedInfo: SelectEventType) => {
    const start_date = new Date(selectedInfo.start);
    const start_time = format(start_date, "HH:mm");
    const end_date = new Date(selectedInfo.end);
    const end_time = format(end_date, "HH:mm");
    setEventsTitle("");
    setEventsStartDate(start_date);
    setEventsStartTime(start_time);
    setEventsEndDate(end_date);
    setEventsEndTime(end_time);
    setIsOpenDialog(true);
  };
  const onAddEvent = () => {
    if (!ref.current) {
      return;
    }
    if (!eventsStartDate || !eventsEndDate) {
      return;
    }
    const [sh, sm] = eventsStartTime.split(":").map(Number);
    const [eh, em] = eventsEndTime.split(":").map(Number);
    eventsStartDate.setHours(sh);
    eventsStartDate.setMinutes(sm);
    eventsEndDate.setHours(eh);
    eventsEndDate.setMinutes(em);

    if (eventsStartDate >= eventsEndDate) {
      alert("開始時間と終了時間を確認してください");
      return;
    }
    const event = {
      id: String(myEvents.length),
      title: eventsTitle,
      start: eventsStartDate,
      end: eventsEndDate,
    };

    setMyEvents([...myEvents, event]);
    ref.current.getApi().addEvent(event);
    setIsOpenDialog(false);
  };
  return {
    formatCaption,
    eventsTitle,
    setEventsTitle,
    eventsStartDate,
    setEventsStartDate,
    eventsStartTime,
    setEventsStartTime,
    eventsEndDate,
    setEventsEndDate,
    eventsEndTime,
    setEventsEndTime,
    handleClick,
    handleSelect,
    onAddEvent,
    isOpenDialog,
    setIsOpenDialog,
    ref,
  };
};
