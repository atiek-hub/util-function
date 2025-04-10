import { createRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import { MyEventsType, SelectEventType } from "../../../types/hooks";
import { EventClickArg } from "@fullcalendar/core/index.js";
import {
  createSchedule,
  deleteSchedule,
  updateSchedule,
} from "../api/schedules";
import { supabase } from "@/lib/supabaseClient";

export const useCalendarFunc = () => {
  const ref = createRef<FullCalendar>();
  const [eventsId, setEventsId] = useState<string>("");
  const [eventsTitle, setEventsTitle] = useState<string>("");
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [eventsStartDate, setEventsStartDate] = useState<Date>();
  const [eventsStartTime, setEventsStartTime] = useState<string>("");
  const [eventsEndDate, setEventsEndDate] = useState<Date>();
  const [eventsEndTime, setEventsEndTime] = useState<string>("");
  const [myEvents, setMyEvents] = useState<MyEventsType[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

  //追加済みのイベントをクリックした時
  const handleClick = (addedInfo: EventClickArg) => {
    const { id, title, start, end, allDay } = addedInfo.event;
    setEventsId(id);
    setEventsTitle(title);
    setIsAllDay(allDay);
    setEventsStartDate(start!);
    setEventsStartTime(format(start!, "HH:mm"));
    setEventsEndDate(end!);
    setEventsEndTime(format(end!, "HH:mm"));
    setIsOpenDialog(true);
  };

  //カレンダーの空欄をクリックした時
  const handleSelect = (selectedInfo: SelectEventType) => {
    const start_date = new Date(selectedInfo.start);
    const start_time = format(start_date, "HH:mm");
    const end_date = new Date(selectedInfo.end);
    const end_time = format(end_date, "HH:mm");
    setEventsTitle("");
    setIsAllDay(false);
    setEventsStartDate(start_date);
    setEventsStartTime(start_time);
    setEventsEndDate(end_date);
    setEventsEndTime(end_time);
    setIsOpenSheet(true);
  };

  const onAddEvent = async () => {
    if (!ref.current) {
      return;
    }
    if (!eventsStartDate || !eventsEndDate) {
      return;
    }
    setEventTitme(eventsStartDate, eventsStartTime);
    setEventTitme(eventsEndDate, eventsEndTime);

    if (eventsStartDate >= eventsEndDate) {
      alert("開始時間と終了時間を確認してください");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const event = {
      title: eventsTitle,
      allDay: isAllDay,
      start: eventsStartDate,
      end: eventsEndDate,
      id: user!.id,
    };
    const data = await createSchedule(event);
    if (data) {
      setMyEvents([...myEvents, data]);
    }
    setIsOpenSheet(false);
  };

  const onEditEvent = async () => {
    if (!eventsStartDate || !eventsEndDate) {
      return;
    }
    setEventTitme(eventsStartDate, eventsStartTime);
    setEventTitme(eventsEndDate, eventsEndTime);
    if (eventsStartDate >= eventsEndDate) {
      alert("開始時間と終了時間を確認してください");
      return;
    }
    const [sh, sm] = eventsStartTime.split(":").map(Number);
    const [eh, em] = eventsEndTime.split(":").map(Number);
    eventsStartDate!.setHours(sh);
    eventsStartDate!.setMinutes(sm);
    eventsEndDate!.setHours(eh);
    eventsEndDate!.setMinutes(em);
    const data = {
      title: eventsTitle,
      allDay: isAllDay,
      start: eventsStartDate,
      end: eventsEndDate,
    };
    const updateData = await updateSchedule(eventsId, data);
    setMyEvents((prevEvents: MyEventsType[]) =>
      prevEvents.map((event: MyEventsType) => {
        if (event.id === updateData.id) {
          return {
            ...event,
            id: updateData.id,
            title: updateData.title,
            allDay: updateData.allDay,
            start: updateData.start,
            end: updateData.end,
          };
        }
        return event;
      })
    );
  };

  const onDeleteEvent = async () => {
    const res = await deleteSchedule(eventsId);
    if (!res) {
      alert("スケジュールの削除に失敗しました");
      return;
    }
    setMyEvents((prevEvent: MyEventsType[]) =>
      prevEvent.filter((event: MyEventsType) => event.id !== res.id)
    );
  };

  const formatCaption = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    const dayArr = ["日", "月", "火", "水", "木", "金", "土"];
    const day = format(date, "MM月dd日");
    return `${day}(${dayArr[date.getDay()]})`;
  };
  //時間をセットする関数
  const setEventTitme = (eventDate: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);
  };

  return {
    ref,
    eventsId,
    eventsTitle,
    setEventsTitle,
    isAllDay,
    setIsAllDay,
    eventsStartDate,
    setEventsStartDate,
    eventsStartTime,
    setEventsStartTime,
    eventsEndDate,
    setEventsEndDate,
    eventsEndTime,
    setEventsEndTime,
    myEvents,
    setMyEvents,
    formatCaption,
    handleClick,
    handleSelect,
    onAddEvent,
    onEditEvent,
    onDeleteEvent,
    isOpenSheet,
    setIsOpenSheet,
    isOpenDialog,
    setIsOpenDialog,
  };
};
