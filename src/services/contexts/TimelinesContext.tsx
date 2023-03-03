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
  const toQParam = queryParams.get("to");
  const fromQParam = queryParams.get("from");
  const today = new Date();
  const from = fromQParam || dateFormat(today.setDate(today.getDate() - 2), "yyyymmdd");
  const to = toQParam || dateFormat(new Date(), "yyyymmdd");

  const fetchTimelines = React.useCallback(() => {
    addApiLoadingState(true, "timelines");
    axios
      .get<{result: Timeline[]; page: number}>(`events-by-days?from=${from}&to=${to}`)
      .then(({data}) => setTimelines(data.result))
      .finally(() => addApiLoadingState(false, "timelines"));
  }, [from, to]);

  React.useEffect(() => {
    fetchTimelines();
  }, [fromQParam, toQParam]);

  return (
    <timelinesContext.Provider
      value={{timelines, setTimelines, revalidateTimelines: fetchTimelines}}
    >
      {children}
    </timelinesContext.Provider>
  );
}

export const useTimelines = () => React.useContext(timelinesContext);
