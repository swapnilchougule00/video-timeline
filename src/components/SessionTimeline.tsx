import {
  Clipboard
} from "lucide-react";
import { useState } from "react";
import ParticipantTimeline from "./ParticipantTimeline";
import TimeMarkers from "./TimeMarkers";
import { Switch } from "./ui/switch";
import { SessionTimelinePropType } from "../types";


const SessionTimeline =({
  meetingStart,
  meetingEnd,
  participantArray,
}: SessionTimelinePropType) => {
  const [showTimeline, setShowTimeline] = useState(true);

  return (
    <div className="w-full bg-[#181818] text-white min-h-screen">
      <div className=" mx-auto">
        <div className="bg-[#1F1F1F] flex items-center justify-between p-6 border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <Clipboard className="w-4 h-4" />
            <h2 className="text-sm font-medium">
              Participants wise Session Timeline
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400">
              Show participant timeline
            </span>
            <Switch
              checked={showTimeline}
              onCheckedChange={setShowTimeline}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>

        {showTimeline && (
          <>
            <TimeMarkers startTime={meetingStart} endTime={meetingEnd} />

            {participantArray.length ? (
              participantArray.map((participant) => (
                <ParticipantTimeline
                  key={participant.participantId}
                  participant={participant}
                  startTime={meetingStart}
                  endTime={meetingEnd}
                />
              ))
            ) : (
              <div className="text-center text-neutral-400 py-4">
                No participant data available
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


export default SessionTimeline