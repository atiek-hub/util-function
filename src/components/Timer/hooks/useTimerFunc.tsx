import { useEffect, useRef, useState } from "react";

const ONE_HOURS = 3600000;
const ONE_MINUTES = 60000;
const ONE_SECONDS = 1000;
const MAX_COUNT = 86400000;
const MIN_COUNT = 0;

const formatTime = (milliseconds: number) => {
  const hh = Math.floor(milliseconds / ONE_HOURS);
  const mm = Math.floor((milliseconds % ONE_HOURS) / ONE_MINUTES);
  const ss = Math.floor((milliseconds % ONE_MINUTES) / ONE_SECONDS);
  return [hh, mm, ss].map((val) => String(val).padStart(2, "0")).join(":");
};

export const useTimerFunc = () => {
  const [timerCount, setTimerCount] = useState(0);
  const [timerState, setTimerState] = useState("standby");
  const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const plus = (plusCount: number) => {
    if (timerCount + plusCount <= MAX_COUNT) {
      setTimerCount((prevVal) => prevVal + plusCount);
    }
  };

  const minus = (minusCount: number) => {
    if (timerCount - minusCount >= MIN_COUNT) {
      setTimerCount((prevVal) => prevVal - minusCount);
    }
  };

  const start = () => {
    // stopSound();
    setTimerState("active");
  };
  const stop = () => {
    setTimerState("standby");
  };
  const reset = () => {
    stopSound();
    setTimerState("standby");
    setTimerCount(0);
  };

  useEffect(() => {
    //Audioインスタンスを初期化
    audioRef.current = new Audio("/sound/alarm.mp3");
    //クリーンアップ関数 余計なリソースを開放する。
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) audioRef.current.play();
  };
  const stopSound = () => {
    setTimerState("standby");
    if (audioRef.current) {
      audioRef.current.pause(); //音楽を一時停止
      audioRef.current.currentTime = 0; //再生位置を最初に戻す
    }
  };
  useEffect(() => {
    //タイマーの状態がActiveの時は早期リターン
    if (timerState !== "active") {
      return;
    }
    //タイマーのカウントが0を超えているときタイマーをスタート
    if (timerCount > 0) {
      //setIntervalで1秒(1000ms)おきに、タイマーのカウントを減らす
      //setIntervalのIDをRefに保持しておく
      timerIdRef.current = setInterval(() => {
        setTimerCount((prevVal) => prevVal - ONE_SECONDS);
      }, ONE_SECONDS);
    } else {
      //タイマーカウントが0になったら、clearIntervalでタイマーを止め、タイマーの状態をEndにする。
      clearInterval(timerIdRef.current);
      setTimerState("end");
      playSound();
    }

    //クリーンアップ関数 useEffectが再実行される前や、コンポーネントのアンマウント時に呼び出され、古いタイマーを停止する。
    //これがないと、ストップやリセットボタンを押しても、タイマーが止まらない。
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [timerState, timerCount]);
  return {
    timerCount,
    timerState,
    formatTime,
    plus,
    minus,
    start,
    stop,
    reset,
    stopSound,
  };
};
