import {Timeline as TimelineType} from "../../services/types/Timeline.type";

export function getWidth(index: number, timeline: TimelineType) {
  const currentItem = timeline.events[index];
  const prevItem = index === 0 ? null : timeline.events[index - 1];

  const currentTimeInMinutes =
    Number(currentItem.localTime.slice(0, 2)) * 60 + Number(currentItem.localTime.slice(2, 4));
  const prevItemTimeInMinutes =
    index === 0
      ? 0
      : Number(prevItem!.localTime.slice(0, 2)) * 60 + Number(prevItem!.localTime.slice(2, 4));

  return ((currentTimeInMinutes - prevItemTimeInMinutes) / (24 * 60)) * 100;
}
