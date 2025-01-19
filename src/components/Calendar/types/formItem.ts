import { Dispatch, SetStateAction } from "react";
import { ControllerRenderProps } from "react-hook-form";


export type DateFormItemProps = {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    format: (date: Date | undefined) => string | undefined;
  };

export type TimeFormItemProps = {
    field: ControllerRenderProps<{
      title: string;
      all_day: boolean;
      start_date: string;
      start_time: string;
      end_date: string;
      end_time: string;
    }>;
    time: string;
    setTime: Dispatch<SetStateAction<string>>;
  };