import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TimeMarkers = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const start = toZonedTime(startTime, "UTC");
  const end = toZonedTime(endTime, "UTC");

  const duration = end.getTime() - start.getTime();
  const interval = duration / 10;

  return (
    <div className="relative h-6 flex flex-wrap justify-between w-full px-6 pt-4 pb-8 border-b border-neutral-700">
      {Array.from({ length: 11 }).map((_, i) => {
        const time = new Date(start.getTime() + interval * i);
        return (
          <p
            key={i}
            className="text-xs text-wrap text-muted-foreground"
            style={{ left: `${(i / 10) * 100}%` }}
          >
            {format(time, "HH:mm 'UTC'")}
          </p>
        );
      })}
    </div>
  );
};

export default TimeMarkers;
