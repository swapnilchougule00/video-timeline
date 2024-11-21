export type Event = {
    start: string;
    end: string;
  };
  
export type Participant = {
    participantId: string;
    name: string;
    events: {
      mic: Event[];
      webcam: Event[];
      screenShare: Event[];
      screenShareAudio: Event[];
      errors?: { start: string; message: string }[];
    };
    timelog: Event[];
  };
  
export type Meeting = {
    meetingId: string;
    start: string;
    end: string;
    uniqueParticipantsCount: number;
    participantArray: Participant[];
  };

export type SessionTimelinePropType = {
    participantArray: Participant[];
    meetingStart: string;
    meetingEnd: string;
  }