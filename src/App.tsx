import "./App.css";
import { StopWatchFunction } from "./components/StopWatch/StopWatchFunction";
import { TimerFunction } from "./components/Timer/TimerFunction";

function App() {
  return (
    <>
      <TimerFunction />
      <StopWatchFunction/>
    </>
  );
}

export default App;
