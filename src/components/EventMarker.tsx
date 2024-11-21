import { AlertCircle, Camera, LogOut, Mic, Monitor } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { format, parseISO } from "date-fns";

const EventMarker = ({
    type,
    position,
    number,
    time,
    message,
  }: {
    type: "mic" | "webcam" | "error" | "join" | "leave";
    position: number;
    number?: number;
    time: string;
    message?: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="absolute -translate-x-1/2 z-10 top-1/2 -translate-y-1/2"
            style={{ left: `${position}%` }}
          >
            <div
              className={`
              flex items-center justify-center rounded-[10px] p-[6px] cursor-pointer
              ${
                type === "join" || type === "leave"
                  ? "bg-neutral-700"
                  : "bg-selected-blue"
              }
              ${type === "error" ? "bg-selected-red p-[4px] rounded-[8px]" : ""}
            `}
            >
              {/* {number && (
                <span className="text-xs text-white font-medium">{number}</span>
              )} */}
              {type === "mic" && <Mic className="w-4 h-4 text-white" />}
              {type === "leave" && <LogOut className="w-4 h-4 text-white" />}
              {type === "join" && <Monitor className="w-4 h-4 text-white" />}
              {type === "webcam" && <Camera className="w-4 h-4 text-white" />}
              {type === "error" && <AlertCircle className="w-3 h-3 text-white" />}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-neutral-800 text-white border-neutral-700"
        >
          <p>
            {type.charAt(0).toUpperCase() + type.slice(1)} event at{" "}
            {format(parseISO(time), "HH:mm:ss")}
          </p>
          {message && <p className="text-sm text-neutral-400">{message}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  export default EventMarker