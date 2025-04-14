import { Dispatch, ReactNode, SetStateAction } from "react";
import { MyEventsType } from "./hooks";

export type SetScheduleSheetProps = {
  open: {
    isOpenSheet: boolean;
    setIsOpenSheet: Dispatch<SetStateAction<boolean>>;
  };
  children: ReactNode;
};

export type EditScheduleDialogProps = {
  open: {
    isOpenDialog: boolean;
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
  };
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
  onEditEvent: () => void;
  onDeleteEvent: () => void;
  eventsId: string;
  events: {
    myEvents: MyEventsType[];
    setMyEvents: Dispatch<SetStateAction<MyEventsType[]>>;
  };
  edit: {
    isEditEvent: boolean;
    setIsEditEvent: Dispatch<SetStateAction<boolean>>;
  };
};

export type ConfirmationDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dialogTitle: string;
  buttonText: string;
  handleClick: () => void;
};
