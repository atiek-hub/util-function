import { Button } from "@/shadcn-components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/shadcn-components/ui/card";
import { useTimerFunc } from "./hooks/useTimerFunc";
const ONE_HOURS = 3600000;
const ONE_MINUTES = 60000;
const ONE_SECONDS = 1000;
const BASE_TIME = [
  { label: "Hours", time: ONE_HOURS },
  { label: "Minutes", time: ONE_MINUTES },
  { label: "Seconds", time: ONE_SECONDS },
];
export const TimerFunction = () => {
  const {
    timerCount,
    timerState,
    formatTime,
    plus,
    minus,
    start,
    stop,
    reset,
    stopSound,
  } = useTimerFunc();
  return (
    <div className="flex justify-center">
      <Card className="p-6 rounded-lg shadow-xl">
        <div className="flex  justify-self-center space-x-3">
          {BASE_TIME.map(({ label, time }) => (
            <div key={label}>
              <Button
                onClick={() => plus(time)}
                disabled={timerState === "active"}
                variant="outline"
                size="icon"
              >
                <ChevronUp />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex  justify-self-center text-4xl font-bold my-2">
          {formatTime(timerCount)}
        </div>
        <div className="flex justify-self-center space-x-3">
          {BASE_TIME.map(({ label, time }) => (
            <div key={label}>
              <Button
                onClick={() => minus(time)}
                disabled={timerState === "active"}
                variant="outline"
                size="icon"
              >
                <ChevronDown />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          {timerState === "active" ? (
            <Button onClick={stop}>stop</Button>
          ) : (
            <Button onClick={start}>start</Button>
          )}
          <Button onClick={reset}>reset</Button>
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={stopSound}>Stop Alarm</Button>
        </div>
      </Card>
    </div>
  );
};
