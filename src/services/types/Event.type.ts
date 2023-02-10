export interface Event {
  _id: string;
  title: string;
  localTime: string;
  tags: string[];
  description?: string | null;
}

export type CreateEvent = Omit<Event, "_id"> & {localDate: string};
