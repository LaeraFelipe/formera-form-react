import React from 'react';
import { IFormeraContext } from "./types";

export const FormeraContext = React.createContext<IFormeraContext>({ formera: null });
