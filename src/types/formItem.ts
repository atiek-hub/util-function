import { Dispatch, SetStateAction } from "react";
import { Ref } from "react-hook-form";
// import { ControllerRenderProps } from "react-hook-form";
type DateFieldType = {
  name: string;
  onBlur: () => void;
  onChange: (date: Date | undefined) => void;
  ref: Ref;
  value: Date | undefined;
};

type TimeFieldType = {
  name: string;
  onBlur: () => void;
  onChange: (date: string) => void;
  ref: Ref;
  value: string;
};
export type DateFormItemProps = {
  field: DateFieldType;
  dateTitle: string;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  format: (date: Date | undefined) => string | undefined;
};

export type TimeFormItemProps = {
  field: TimeFieldType;
  timeTitle: string;
  setTime: Dispatch<SetStateAction<string>>;
  disabled: boolean; // Disable the time input if all day is checked
};
