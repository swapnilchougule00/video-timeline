import { format, parseISO } from "date-fns";

const TimeMarkers = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const start = parseISO(startTime);
  const end = parseISO(endTime);
  const duration = end.getTime() - start.getTime();
  const interval = duration / 10;

  console.log(startTime);

  return (
    <div className="relative h-6 flex flex-wrap justify-between w-full px-6 pt-4 pb-8 border-b border-neutral-700">
      {Array.from({ length: 11 }).map((_, i) => {
        const time = new Date(start.getTime() + interval * i);
        return (
          <p
            key={i}
            className=" text-xs text-wrap text-muted-foreground"
            style={{ left: `${(i / 10) * 100}%` }}
          >
            {format(time, "HH:mm")}
          </p>
        );
      })}
    </div>
  );
};

export default TimeMarkers;
