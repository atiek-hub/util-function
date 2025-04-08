import { useRef, useState } from "react";
import { Header } from "../Header/header";
import { Button } from "@/shadcn-components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn-components/ui/card";

export const StopWatchFunction = () => {
  const [elapsedTime, setElapsedTime] = useState(0); // 経過時間（ms）
  const [isRunning, setIsRunning] = useState(false); // ストップウォッチの状態
  const startTimeRef = useRef(0); // 開始時間
  const requestRef = useRef<number | null>(null); // requestAnimationFrameのID

  const startStopwatch = () => {
    if (isRunning) return; // すでに動作中なら何もしない
    setIsRunning(true);
    startTimeRef.current = performance.now() - elapsedTime; // 前回の経過時間から再開
    requestRef.current = requestAnimationFrame(update);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current); // アニメーションを停止
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setElapsedTime(0); // 経過時間をリセット
  };

  const update = () => {
    const now = performance.now();
    setElapsedTime(now - startTimeRef.current); // 現在の経過時間を計算
    requestRef.current = requestAnimationFrame(update); // 次のフレームで再実行
  };
  // 時間のフォーマット関数
  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const milliseconds = Math.floor((time % 1000) / 10); // 小数点2桁に変換
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <Card className="p-6 rounded-lg shadow-xl mt-20 ">
          <CardHeader>
            <CardTitle>Simple Stopwatch</CardTitle>
            <CardDescription>
              A simple stopwatch built with React and TypeScript.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center">
                <h1>{formatTime(elapsedTime)}</h1>
              </div>
              <div className="flex  justify-self-center space-x-3">
                <Button onClick={startStopwatch} disabled={isRunning}>
                  Start
                </Button>
                <Button onClick={stopStopwatch} disabled={!isRunning}>
                  Stop
                </Button>
                <Button
                  onClick={resetStopwatch}
                  disabled={isRunning && elapsedTime === 0}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
