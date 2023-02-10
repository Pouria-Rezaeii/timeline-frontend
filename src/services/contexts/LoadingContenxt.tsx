import React from "react";

interface InitialValue {
  isLoading: boolean;
  addApiLoadingState: (isPending: boolean, key: string) => void;
}
interface Queue {
  key: string;
  value: boolean;
}

const loadingContext = React.createContext<InitialValue>({
  isLoading: true,
  addApiLoadingState: () => {},
});

export default function LoadingProvider({children}: React.PropsWithChildren<{}>) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [queue, setQueue] = React.useState<Queue[]>([]);

  const addApiLoadingState = (isPending: boolean, key: string) => {
    if (isPending) {
      setQueue((prev) => [...prev, {key, value: isPending}]);
    } else {
      setQueue((prev) => prev.filter((item) => item.key !== key));
    }
    setLoading(queue.length ? true : false);
  };

  return (
    <loadingContext.Provider value={{isLoading, addApiLoadingState}}>
      {children}
    </loadingContext.Provider>
  );
}

export const useLoading = () => React.useContext(loadingContext);
