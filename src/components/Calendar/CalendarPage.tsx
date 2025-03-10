import FullCalendar from "@fullcalendar/react";
import { useCalendarFunc } from "./hooks/useCalendarFunc";
import { SetScheduleSheet } from "./parts/Dialog/SetScheduleSheet";
import { ScheduleForm } from "./parts/Form/ScheduleForm";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EditScheduleDialog } from "./parts/Dialog/EditScheduleDialog";
import { useEffect } from "react";
import { getAllSchedules } from "./api/schedules";
import { ApiEventsType } from "./types/api";
import { supabase } from "@/lib/supabaseClient";
export const CalendarPage = () => {
  const {
    myEvents,
    setMyEvents,
    formatCaption,
    eventsId,
    allDay,
    setAllDay,
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
    isOpenSheet,
    setIsOpenSheet,
    isOpenDialog,
    setIsOpenDialog,
    ref,
  } = useCalendarFunc();

  useEffect(() => {
    const schedules = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        try {
          const schedules = await getAllSchedules(user.id)
          const formatSchedules = schedules.map((schedule: ApiEventsType) => {
            return {
              id: schedule.id,
              title: schedule.title,
              start: schedule.start_date,
              end: schedule.end_date
            }
          })
          setMyEvents(formatSchedules)
        } catch (e) {
          console.error(e)
        }
      }
    }
    schedules()
  }, [])

  return (
    <div>
      <SetScheduleSheet open={{ isOpenSheet, setIsOpenSheet }} onAddEvent={onAddEvent}>
        <ScheduleForm
          addEvent={onAddEvent}
          allDay={{ allDay, setAllDay }}
          title={{ eventsTitle, setEventsTitle }}
          startDate={{ eventsStartDate, setEventsStartDate }}
          startTime={{ eventsStartTime, setEventsStartTime }}
          endDate={{ eventsEndDate, setEventsEndDate }}
          endTime={{ eventsEndTime, setEventsEndTime }}
          format={formatCaption}
        />
      </SetScheduleSheet>
      <EditScheduleDialog
        events={{ myEvents, setMyEvents }}
        eventsId={eventsId}
        open={{ isOpenDialog, setIsOpenDialog }}
        title={{ eventsTitle, setEventsTitle }}
        allDay={{ allDay, setAllDay }}
        startDate={{ eventsStartDate, setEventsStartDate }}
        startTime={{ eventsStartTime, setEventsStartTime }}
        endDate={{ eventsEndDate, setEventsEndDate }}
        endTime={{ eventsEndTime, setEventsEndTime }}
        format={formatCaption}
      />
      <div>
        <FullCalendar
          locale='ja'
          allDayText="終日"
          height="auto"
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          slotDuration="00:30:00"
          selectable={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "00:00",
            endTime: "24:00"
          }}
          weekends={true}
          titleFormat={{
            year: "numeric",
            month: "short"
          }}
          headerToolbar={{
            start: "title",
            center: "prev,next,today",
            end: "dayGridMonth,timeGridWeek"
          }}
          ref={ref}
          eventClick={handleClick}
          select={handleSelect}
          events={myEvents}
        />
      </div>
    </div>
  );
};
