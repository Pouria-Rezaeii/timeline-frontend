import React from "react";
import {Tag} from "../types/Tag.type";
import {axios} from "../api/axios";
import {useLoading} from "./LoadingContenxt";

interface InitialValue {
  tags: Tag[] | undefined;
  setTags: React.Dispatch<React.SetStateAction<Tag[] | undefined>>;
  revalidateTags: () => void;
}

const tagsContext = React.createContext<InitialValue>({
  tags: [],
  setTags: () => {},
  revalidateTags: () => {},
});

export default function TagsProvider({children}: React.PropsWithChildren<{}>) {
  const [tags, setTags] = React.useState<Tag[]>();
  const {addApiLoadingState} = useLoading();

  const fetchTags = React.useCallback(() => {
    addApiLoadingState(true, "tags");
    axios
      .get<Tag[]>("tags")
      .then(({data}) => setTags(data))
      .finally(() => addApiLoadingState(false, "tags"));
  }, []);

  React.useEffect(() => {
    fetchTags();
  }, []);

  return (
    <tagsContext.Provider value={{tags, setTags, revalidateTags: fetchTags}}>
      {children}
    </tagsContext.Provider>
  );
}

export const useTags = () => React.useContext(tagsContext);
