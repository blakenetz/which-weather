import React from "react";

import { Endpoints } from "@server/types";

export type AlertCause = Endpoints | "unknown";
export type Cause = AlertCause | "autocomplete";
export interface ErrorContextType {
  setError: (cause: Cause) => void;
}

export const ErrorContext = React.createContext({} as ErrorContextType);
