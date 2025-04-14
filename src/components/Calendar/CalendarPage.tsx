import FullCalendar from "@fullcalendar/react";
import { useCalendarFunc } from "./hooks/useCalendarFunc";
import { SetScheduleSheet } from "./parts/Sheet/SetScheduleSheet";
import { ScheduleForm } from "./parts/Form/ScheduleForm";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EditScheduleDialog } from "./parts/Dialog/EditScheduleDialog";
import { useEffect } from "react";
import { getAllSchedules } from "./api/schedules";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "../Header/header";
export const CalendarPage = () => {
  const {
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
    isEditEvent,
    setIsEditEvent,
  } = useCalendarFunc();

  useEffect(() => {
    const schedules = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.id) {
        try {
          const schedules = await getAllSchedules(user.id);
          setMyEvents(schedules);
        } catch (e) {
          console.error(e);
        }
      }
    };
    schedules();
  }, []);

  return (
    <div>
      <SetScheduleSheet open={{ isOpenSheet, setIsOpenSheet }}>
        <ScheduleForm
          clickEvent={onAddEvent}
          allDay={{ isAllDay, setIsAllDay }}
          title={{ eventsTitle, setEventsTitle }}
          startDate={{ eventsStartDate, setEventsStartDate }}
          startTime={{ eventsStartTime, setEventsStartTime }}
          endDate={{ eventsEndDate, setEventsEndDate }}
          endTime={{ eventsEndTime, setEventsEndTime }}
          format={formatCaption}
        />
      </SetScheduleSheet>
      <EditScheduleDialog
        open={{ isOpenDialog, setIsOpenDialog }}
        title={{ eventsTitle, setEventsTitle }}
        allDay={{ isAllDay, setIsAllDay }}
        startDate={{ eventsStartDate, setEventsStartDate }}
        startTime={{ eventsStartTime, setEventsStartTime }}
        endDate={{ eventsEndDate, setEventsEndDate }}
        endTime={{ eventsEndTime, setEventsEndTime }}
        format={formatCaption}
        onEditEvent={onEditEvent}
        onDeleteEvent={onDeleteEvent}
        eventsId={eventsId}
        events={{ myEvents, setMyEvents }}
        edit={{ isEditEvent, setIsEditEvent }}
      />
      <div>
        <Header />
        <div className="flex justify-center">
          <div className="w-10/12 mt-20">
            <FullCalendar
              locale="ja"
              allDayText="終日"
              contentHeight={700}
              expandRows={true}
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              slotDuration="00:30:00"
              selectable={true}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: "00:00",
                endTime: "24:00",
              }}
              weekends={true}
              titleFormat={{
                year: "numeric",
                month: "short",
              }}
              headerToolbar={{
                start: "title",
                center: "prev,next,today",
                end: "dayGridMonth,timeGridWeek",
              }}
              ref={ref}
              eventClick={handleClick}
              select={handleSelect}
              events={myEvents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
