import { Button } from "@/shadcn-components/ui/button";
import { Card, CardContent } from "@/shadcn-components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn-components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn-components/ui/dropdown-menu";
import { Ellipsis, Pencil, X } from "lucide-react";
import { useState } from "react";
import { EditScheduleDialogProps } from "../../types/dialog";
import { deleteSchedule, updateSchedule } from "../../api/schedules";
import { ScheduleForm } from "../Form/ScheduleForm";

export const EditScheduleDialog = (props: EditScheduleDialogProps) => {
  const {
    events,
    open,
    eventsId,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    format
  } = props;

  const { myEvents, setMyEvents } = events;
  const { isOpenDialog, setIsOpenDialog } = open;
  const { eventsTitle, setEventsTitle } = title;
  const { eventsStartDate, setEventsStartDate } = startDate;
  const { eventsStartTime, setEventsStartTime } = startTime;
  const { eventsEndDate, setEventsEndDate } = endDate;
  const { eventsEndTime, setEventsEndTime } = endTime;
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
  const [isEditEvent, setIsEditEvent] = useState<boolean>(false);

  const onClickOpenDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  };
  const onClickOpenEditDialog = () => {
    setIsEditEvent(true);
  };
  const onClickEventDelete = async () => {
    const data = await deleteSchedule(eventsId)
    setMyEvents(myEvents.filter((event) => event.id !== data.id));
    setIsOpenDeleteDialog(false);
    setIsOpenDialog(false)
  };
  const onClickEditSaveDialog = () => {
    setIsOpenEditDialog(true)
  }
  const onClickEventSave = async () => {
    const [sh, sm] = eventsStartTime.split(":").map(Number);
    const [eh, em] = eventsEndTime.split(":").map(Number);
    eventsStartDate!.setHours(sh);
    eventsStartDate!.setMinutes(sm);
    eventsEndDate!.setHours(eh);
    eventsEndDate!.setMinutes(em);
    const data = {
      id: Number(eventsId),
      title: eventsTitle,
      start_date: eventsStartDate,
      end_date: eventsEndDate,
    }
    const updateData = await updateSchedule(eventsId, data)
    setMyEvents(myEvents.map((event) => {
      if (event.id === updateData.id) {
        return {
          id: updateData.id,
          title: updateData.title,
          start: updateData.start_date,
          end: updateData.end_date
        }
      }
      return event
    }));
    setIsOpenDialog(false);
    setIsOpenEditDialog(false)
    setIsEditEvent(false);
  };

  const CustomDisplayDate = () => {
    if (eventsStartDate?.getDate() === eventsEndDate?.getDate()) {
      return format(eventsStartDate)
    }
    else {
      return `${format(eventsStartDate)}-${format(eventsEndDate)}`
    }
  }

  return (
    <div>
      <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>削除してもよろしいですか？</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onClickEventDelete}>OK</Button>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenEditDialog} onOpenChange={setIsOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>編集内容を保存してもよろしいですか？</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onClickEventSave}>保存</Button>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <div className="flex justify-between align-center mb-3">
              <DialogTitle>イベント</DialogTitle>
              <DialogClose asChild onClick={() => setIsEditEvent(false)}>
                <div className="flex space-x-1">
                  <X className="h-4 w-4 my-auto" />
                  <DialogTitle className="text-sm">閉じる</DialogTitle>
                </div>
              </DialogClose>
            </div>
            <div className="flex justify-end">
              <Pencil
                onClick={onClickOpenEditDialog}
                className="cursor-pointer hover:text-gray-400 mx-2"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="cursor-pointer hover:text-gray-400 mx-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>複製</DropdownMenuItem>
                  <DropdownMenuItem>ヘルプ</DropdownMenuItem>
                  <DropdownMenuItem onClick={onClickOpenDeleteDialog}>
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DialogHeader>
          <Card>
            <CardContent >
              {isEditEvent ? (
                <div className="mt-2">
                  <ScheduleForm
                    // allDay={{ allDay, setAllDay }}
                    title={{ eventsTitle, setEventsTitle }}
                    startDate={{ eventsStartDate, setEventsStartDate }}
                    startTime={{ eventsStartTime, setEventsStartTime }}
                    endDate={{ eventsEndDate, setEventsEndDate }}
                    endTime={{ eventsEndTime, setEventsEndTime }}
                    format={format}
                  />
                  <div className="mt-3 flex justify-evenly">
                    <Button onClick={onClickEditSaveDialog}>保存</Button>
                    <DialogClose asChild onClick={() => setIsEditEvent(false)}>
                      <Button>キャンセル</Button>
                    </DialogClose>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="text-xl">{eventsTitle}</div>
                  <div>{CustomDisplayDate()}</div>
                  <div>{eventsStartTime}-{eventsEndTime}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
