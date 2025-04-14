import { Card, CardContent } from "@/shadcn-components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn-components/ui/dialog";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { EditScheduleDialogProps } from "../../../../types/dialog";
import { ScheduleForm } from "../Form/ScheduleForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { DropDownMenu } from "../DoropdownMenu/DropDownMenu";
import { format as formt_fns } from "date-fns";
import { MyEventsType } from "@/types/hooks";

export const EditScheduleDialog = (props: EditScheduleDialogProps) => {
  const {
    open,
    title,
    allDay,
    startDate,
    startTime,
    endDate,
    endTime,
    format,
    onEditEvent,
    onDeleteEvent,
    eventsId,
    events,
    edit,
  } = props;

  const { isOpenDialog, setIsOpenDialog } = open;
  const { eventsTitle, setEventsTitle } = title;
  const { isAllDay, setIsAllDay } = allDay;
  const { eventsStartDate, setEventsStartDate } = startDate;
  const { eventsStartTime, setEventsStartTime } = startTime;
  const { eventsEndDate, setEventsEndDate } = endDate;
  const { eventsEndTime, setEventsEndTime } = endTime;
  const { myEvents } = events;
  const { isEditEvent, setIsEditEvent } = edit;
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<MyEventsType>();

  const onClickEventDelete = () => {
    onDeleteEvent();
    setIsOpenDeleteDialog(false);
    setIsOpenDialog(false);
  };

  const onClickEventSave = () => {
    onEditEvent();
    setIsOpenDialog(false);
    setIsOpenEditDialog(false);
    setIsEditEvent(false);
  };

  const CustomDisplayDate = (data: MyEventsType) => {
    if (data.start === undefined || data.end === undefined) return;
    const start = new Date(data.start);
    const end = new Date(data.end);
    const start_time = formt_fns(start, "HH:mm");
    const end_time = formt_fns(end, "HH:mm");
    if (data.allDay) {
      return `${format(start)} - ${format(end)}`;
    } else {
      if (start.getDate() === end.getDate()) {
        return `${format(start)} ${start_time} - ${end_time}`;
      } else {
        return `${format(start)} ${start_time} - ${format(end)} ${end_time}`;
      }
    }
  };

  const dropdownParam = [
    { name: "複製", onClick: () => {} },
    { name: "ヘルプ", onClick: () => {} },
    { name: "削除", onClick: () => setIsOpenDeleteDialog(true) },
  ];

  useEffect(() => {
    const getSchedule = () => {
      const schedule = myEvents.find(
        (event: MyEventsType) => Number(event.id) === Number(eventsId)
      );
      if (schedule) {
        setScheduleData(schedule);
      }
      return null;
    };
    getSchedule();
  }, [eventsId, myEvents]);

  return (
    <div>
      <ConfirmationDialog
        isOpen={isOpenDeleteDialog}
        setIsOpen={setIsOpenDeleteDialog}
        dialogTitle="削除してもよろしいですか？"
        buttonText="OK"
        handleClick={onClickEventDelete}
      />
      <ConfirmationDialog
        isOpen={isOpenEditDialog}
        setIsOpen={setIsOpenEditDialog}
        dialogTitle="編集内容を保存してもよろしいですか？"
        buttonText="保存"
        handleClick={onClickEventSave}
      />
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              スケジュールの編集
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm text-gray-500">
                スケジュールを編集するには、ペンのアイコンをクリックし、フォームに必要な情報を入力してください。
              </p>
            </DialogDescription>
            <div className="flex justify-end">
              <Pencil
                onClick={() => setIsEditEvent(isEditEvent ? false : true)}
                className="cursor-pointer hover:text-gray-400 mx-2"
              />
              <DropDownMenu dropdownParam={dropdownParam} />
            </div>
          </DialogHeader>
          <Card>
            <CardContent>
              {isEditEvent ? (
                <div className="mt-2">
                  <ScheduleForm
                    clickEvent={() => setIsOpenEditDialog(true)}
                    allDay={{ isAllDay, setIsAllDay }}
                    title={{ eventsTitle, setEventsTitle }}
                    startDate={{ eventsStartDate, setEventsStartDate }}
                    startTime={{ eventsStartTime, setEventsStartTime }}
                    endDate={{ eventsEndDate, setEventsEndDate }}
                    endTime={{ eventsEndTime, setEventsEndTime }}
                    format={format}
                  />
                </div>
              ) : (
                <div>
                  {scheduleData ? (
                    <div className="mt-2">
                      <div className="text-xl">{scheduleData.title}</div>
                      <div>{CustomDisplayDate(scheduleData)}</div>
                    </div>
                  ) : null}
                </div>
              )}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
