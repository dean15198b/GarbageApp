import React, { useState, createContext } from "react";
export const GarbageChoiceContext = createContext();
export const GarbageChoiceActionsContext = createContext();

export const GarbageChoiceProvider = ({ children }) => {
  const [garbageChoice, setGarbageChoice] = useState(null);
  console.log(garbageChoice);
  return (
    <GarbageChoiceContext.Provider
      value={{
        garbageChoice,
      }}
    >
      <GarbageChoiceActionsContext.Provider
        value={{
          setGarbageChoice,
        }}
      >
        {children}
      </GarbageChoiceActionsContext.Provider>
    </GarbageChoiceContext.Provider>
  );
};
