export interface Timeline {
  date: string;
  events: {
    _id: string;
    title: string;
    localTime: string;
    tags: string[];
    description?: string;
  }[];
}
