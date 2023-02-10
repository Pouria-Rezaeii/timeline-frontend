import React from "react";
import {Timeline} from "../types/Timeline.type";
import {axios} from "../api/axios";
import {useSearchParams} from "react-router-dom";
import dateFormat from "dateformat";
import {useLoading} from "./LoadingContenxt";

interface InitialValue {
  timelines?: Timeline[];
  setTimelines: React.Dispatch<React.SetStateAction<Timeline[] | undefined>>;
  revalidateTimelines: () => void;
}

const timelinesContext = React.createContext<InitialValue>({
  timelines: [],
  setTimelines: () => {},
  revalidateTimelines: () => {},
});

export default function TimelinesProvider({children}: React.PropsWithChildren<{}>) {
  const [timelines, setTimelines] = React.useState<Timeline[]>();
  const [queryParams] = useSearchParams();
  const {addApiLoadingState} = useLoading();
  const to = queryParams.get("to") || dateFormat(new Date(), "yyyymmdd");
  const from = queryParams.get("from") || Number(to) - 2;

  const fetchTimelines = React.useCallback(() => {
    addApiLoadingState(true, "timelines");
    axios
      .get<Timeline[]>(`events-by-days?from=${from}&to=${to}`)
      .then(({data}) => setTimelines(data))
      .finally(() => addApiLoadingState(false, "timelines"));
  }, []);

  React.useEffect(() => {
    fetchTimelines();
  }, []);

  return (
    <timelinesContext.Provider
      value={{timelines, setTimelines, revalidateTimelines: fetchTimelines}}
    >
      {children}
    </timelinesContext.Provider>
  );
}

export const useTimelines = () => React.useContext(timelinesContext);
