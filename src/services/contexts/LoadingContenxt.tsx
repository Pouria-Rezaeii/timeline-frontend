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
  const queue = React.useRef<Queue[]>([]);

  const addApiLoadingState = (isPending: boolean, key: string) => {
    if (isPending) {
      queue.current = [...queue.current, {key, value: isPending}];
    } else {
      queue.current = queue.current.filter((item) => item.key !== key);
    }
    setLoading(queue.current.length > 0);
  };

  return (
    <loadingContext.Provider value={{isLoading, addApiLoadingState}}>
      {children}
    </loadingContext.Provider>
  );
}

export const useLoading = () => React.useContext(loadingContext);
