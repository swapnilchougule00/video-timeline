import { meeting } from "./constants/index";
import SessionTimeline from "./components/SessionTimeline";
function App() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SessionTimeline
        participantArray={meeting.participantArray}
        meetingStart={meeting.start}
        meetingEnd={meeting.end}
      />
    </div>
  );
}

export default App;
