import { ChevronRight } from "lucide-react";
import EventMarker from "./EventMarker";
import { format, parseISO } from "date-fns";
import { Participant } from "../types";

const ParticipantTimeline = ({
  participant,
  startTime,
  endTime,
}: {
  participant: Participant;
  startTime: string;
  endTime: string;
}) => {
  const getPosition = (time: string) => {
    const timeMs = parseISO(time).getTime();
    const startMs = parseISO(startTime).getTime();
    const endMs = parseISO(endTime).getTime();
    return ((timeMs - startMs) / (endMs - startMs)) * 100;
  };

  const timelineStart =
    participant.timelog && participant.timelog.length > 0
      ? getPosition(participant.timelog[0].start)
      : 0;
  const timelineEnd =
    participant.timelog && participant.timelog.length > 0
      ? getPosition(
          participant.timelog[participant.timelog.length - 1].end || endTime
        )
      : 100;

  return (
    <div className="relative hover:bg-neutral-800/50 border-b border-neutral-700 px-6 pt-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-medium text-white">
            {participant.name} ({participant.participantId})
          </h3>
          <p className="text-xs text-neutral-400">
            {participant.timelog && participant.timelog.length > 0
              ? `${format(
                  parseISO(participant.timelog[0].start),
                  "dd MMM yyyy, HH:mm"
                )} | Duration: ${format(
                  parseISO(
                    participant.timelog[participant.timelog.length - 1].end ||
                      endTime
                  ).getTime() -
                    parseISO(participant.timelog[0].start).getTime(),
                  "mm"
                )} Mins`
              : "No timeline data available"}
          </p>
        </div>
        <button className="flex items-center text-sm text-selected-blue hover:text-blue-400">
          View details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="py-5 w-full">
        <div className="relative h-1">
          {/* Active timeline */}
          <div
            className="absolute inset-y-0 bg-selected-blue rounded-full"
            style={{
              left: `${timelineStart}%`,
              width: `${timelineEnd - timelineStart}%`,
            }}
          />

          {/* Join/Leave markers */}
          <EventMarker
            type="join"
            position={timelineStart}
            time={participant.timelog[0].start}
          />
          <EventMarker
            type="leave"
            position={timelineEnd}
            time={
              participant.timelog[participant.timelog.length - 1].end || endTime
            }
          />

          {/* Event markers */}
          {participant.events.mic &&
            participant.events.mic.map((event, index) => (
              <EventMarker
                key={`mic-${index}`}
                type="mic"
                position={getPosition(event.start)}
                number={index + 1}
                time={event.start}
              />
            ))}

          {participant.events.webcam &&
            participant.events.webcam.map((event, index) => (
              <EventMarker
                key={`webcam-${index}`}
                type="webcam"
                position={getPosition(event.start)}
                number={index + 1}
                time={event.start}
              />
            ))}

          {participant.events.errors &&
            participant.events.errors.map((event, index) => (
              <EventMarker
                key={`error-${index}`}
                type="error"
                position={getPosition(event.start)}
                time={event.start}
                message={event.message}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantTimeline;
