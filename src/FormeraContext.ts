import React from 'react';
import { IFormeraContext } from "./types";

function calculateBytes(prev: IFormeraContext, next: IFormeraContext) {
  if (prev.formera !== next.formera) {
    return 1;
  }
  return 0;
}

export const FormeraContext = React.createContext<IFormeraContext>({ formera: null, unregisterFieldOnUnmount: false }, calculateBytes);
