import { ChevronRight } from "lucide-react";
import EventMarker from "./EventMarker";
import { format } from "date-fns";
import { Participant } from "../types";
import { toZonedTime } from "date-fns-tz";

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
    const timeMs = toZonedTime(time, "UTC").getTime();
    const startMs = toZonedTime(startTime, "UTC").getTime();
    const endMs = toZonedTime(endTime, "UTC").getTime();
    return ((timeMs - startMs) / (endMs - startMs)) * 100;
  };

  return (
    <div className="relative hover:bg-neutral-800/50 border-b border-neutral-700 px-6 pt-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-medium text-white">
            {participant.name} ({participant.participantId})
          </h3>
          <p className="text-xs text-neutral-400">
            {participant?.timelog && participant.timelog.length > 0
              ? `${format(
                  toZonedTime(participant.timelog[0].start, "UTC"),
                  "dd MMM yyyy, HH:mm"
                )} | Duration: ${format(
                  toZonedTime(
                    participant.timelog[participant.timelog.length - 1].end ||
                      endTime,
                    "UTC"
                  ).getTime() -
                    toZonedTime(participant.timelog[0].start, "UTC").getTime(),
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
          {/* Active timeline segments */}
          {participant.timelog?.map((timelog, index) => {
            const segmentStart = getPosition(timelog.start);
            const segmentEnd = getPosition(timelog.end || endTime);

            return (
              <div
                key={`timelog-${index}`}
                className="absolute inset-y-0 bg-selected-blue rounded-full"
                style={{
                  left: `${segmentStart}%`,
                  width: `${segmentEnd - segmentStart}%`,
                }}
              />
            );
          })}

          {/* Join/Leave markers */}
          {participant.timelog?.map((timelog, index) => (
            <div key={`timelog-markers-${index}`}>
              <EventMarker
                type="join"
                position={getPosition(timelog.start)}
                time={timelog.start}
              />
              <EventMarker
                type="leave"
                position={getPosition(timelog.end || endTime)}
                time={timelog.end || endTime}
              />
            </div>
          ))}

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
