import React from "react";
import { Tag } from "./types/Tag.type";
import { axios } from "./axios";

const tagsContext = React.createContext<{ tags: Tag[]; revalidateTags: () => void }>({
  tags: [],
  revalidateTags: () => {},
});

export default function TagsProvider({ children }: React.PropsWithChildren<{}>) {
  const [tags, setTags] = React.useState<Tag[]>([]);

  const fetchTags = React.useCallback(() => {
    axios.get<Tag[]>("tags").then(({ data }) => setTags(data));
  }, []);

  React.useEffect(() => {
    fetchTags();
  }, []);

  return (
    <tagsContext.Provider value={{ tags, revalidateTags: fetchTags }}>
      {children}
    </tagsContext.Provider>
  );
}

export const useTags = () => React.useContext(tagsContext);
