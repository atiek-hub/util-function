import FullCalendar from "@fullcalendar/react";
import { useCalendarFunc } from "./hooks/useCalendarFunc";
import { SetScheduleDialog } from "./components/SetScheduleDialog";
import { ScheduleForm } from "./components/ScheduleForm";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
export const CalendarPage = () => {
  const {
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
  } = useCalendarFunc();
  return (
<div>
    <SetScheduleDialog open={{isOpenDialog,setIsOpenDialog}}>
        <ScheduleForm
          addEvent={onAddEvent}
          title={{eventsTitle,setEventsTitle}}
          startDate={{eventsStartDate,setEventsStartDate}}
          startTime={{eventsStartTime,setEventsStartTime}}
          endDate={{eventsEndDate,setEventsEndDate}}
          endTime={{eventsEndTime,setEventsEndTime}}
          format={formatCaption}
        />
    </SetScheduleDialog>
    <div>
        <FullCalendar
            locale='ja'
            allDayText="終日"
            height="auto"
            plugins={[timeGridPlugin,dayGridPlugin,interactionPlugin]}
            initialView="dayGridMonth"
            slotDuration="00:30:00"
            selectable={true}
            businessHours={{
                daysOfWeek:[1,2,3,4,5],
                startTime:"00:00",
                endTime:"24:00"
            }}
            weekends={true}
            titleFormat={{
                year:"numeric",
                month:"short"
            }}
            headerToolbar={{
                start:"title",
                center:"prev,next,today",
                end:"dayGridMonth,timeGridWeek"
            }}
            ref={ref}
            eventClick={handleClick}
            select={handleSelect}
        />
    </div>
</div>  
);
};
