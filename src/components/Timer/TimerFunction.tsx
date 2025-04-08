import { Button } from "@/shadcn-components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn-components/ui/card";
import { useTimerFunc } from "./hooks/useTimerFunc";
import { Header } from "../Header/header";
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
    <div>
      <Header />
      <div className="flex justify-center">
        <Card className="p-6 rounded-lg shadow-xl mt-20">
          <CardHeader>
            <CardTitle>Simple Timer</CardTitle>
            <CardDescription>
              A simple timer built with React and TypeScript.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex  justify-self-center space-x-9">
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
            <div className="flex  justify-self-center my-2 space-x-2">
              <h1>{formatTime(timerCount)}</h1>
            </div>
            <div className="flex justify-self-center space-x-9">
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
            <div className="flex justify-center space-x-9 mt-4">
              {timerState === "active" ? (
                <Button onClick={stop}>Stop</Button>
              ) : (
                <Button onClick={start}>Start</Button>
              )}
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={stopSound}>Stop Alarm</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
