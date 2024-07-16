export type createEventBody = {
  title: string;
  description: string;
  groupId: number;
};

export type updateEventBody = {
  title: string;
  description: string;
  groupId: number;
};

export type getEventParams = {
  eventId: string;
};

export type deleteEventParams = {
  eventId: string;
};
