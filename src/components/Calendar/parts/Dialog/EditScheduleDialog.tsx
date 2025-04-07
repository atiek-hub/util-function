import { Button } from "@/shadcn-components/ui/button";
import { Card, CardContent } from "@/shadcn-components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { ScheduleForm } from "../Form/ScheduleForm";
import { ConfirmationDialog } from "./ConfirmationDialog";

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
  } = props;

  const { isOpenDialog, setIsOpenDialog } = open;
  const { eventsTitle, setEventsTitle } = title;
  const { isAllDay, setIsAllDay } = allDay;
  const { eventsStartDate, setEventsStartDate } = startDate;
  const { eventsStartTime, setEventsStartTime } = startTime;
  const { eventsEndDate, setEventsEndDate } = endDate;
  const { eventsEndTime, setEventsEndTime } = endTime;
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
  const [isEditEvent, setIsEditEvent] = useState<boolean>(false);

  const onClickEventDelete = () => {
    onDeleteEvent();
    setIsOpenDeleteDialog(false);
    setIsOpenDialog(false)
  };

  const onClickEditSaveDialog = () => {
    setIsOpenEditDialog(true)
  }

  const onClickEventSave = () => {
    onEditEvent();
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
                onClick={() => setIsEditEvent(true)}
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
                  <DropdownMenuItem onClick={() => setIsOpenDeleteDialog(true)}>
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
                    allDay={{ isAllDay, setIsAllDay }}
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
