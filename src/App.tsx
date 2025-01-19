import "./App.css";

import { StopWatchFunction } from "./components/StopWatch/StopWatchFunction";
import { TimerFunction } from "./components/Timer/TimerFunction";
import { CalendarPage } from "./components/Calendar/CalendarPage";

function App() {
  return (
    <>
      <TimerFunction />
      <StopWatchFunction/>
      <CalendarPage/>
    </>
  );
}

export default App;
