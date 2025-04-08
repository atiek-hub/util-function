import { Dispatch, SetStateAction } from "react";
import { ControllerRenderProps } from "react-hook-form";


export type DateFormItemProps = {
    field:any
    dateTitle: string;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    format: (date: Date | undefined) => string | undefined;
  };

export type TimeFormItemProps = {
    field: any
    timeTitle: string;
    setTime: Dispatch<SetStateAction<string>>;
    disabled: boolean; // Disable the time input if all day is checked
  };