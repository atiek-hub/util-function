export type MyEventsType = {
  id: string;
  title: string;
  start: Date | undefined;
  end: Date | undefined;
};

export type SelectEventType = {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  allDay: boolean;
  jsEvent: MouseEvent | null;
  view: unknown;
};

export type EventClickArg = {
  el: HTMLElement;
  event: MyEventsType;
  jsEvent: MouseEvent;
  view: unknown;
};