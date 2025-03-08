import { createContext, ReactNode, useContext, useState } from "react";

export const NestLevelContext = createContext(0);

export const NestLevelGuard = ({
  children = undefined as ReactNode | ReactNode[],
  maxLevel = 10,
}) => {
  const nestLevel = useContext(NestLevelContext);
  const [showMore, setShowMore] = useState(false);
  return (
    <NestLevelContext.Provider value={nestLevel + 1}>
      {showMore || nestLevel < maxLevel ? children : null}
    </NestLevelContext.Provider>
  );
};
