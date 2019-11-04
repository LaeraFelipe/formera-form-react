import React from 'react';
import { FormeraContext } from './FormeraContext';

export default function withFormera<P extends any>(Component: any): React.FC<Omit<P, 'formera'>> {
  return (componentProps: any) => {
    return (
      <FormeraContext.Consumer>
        {
          (contextProps) => (
            <Component {...contextProps} {...componentProps} />
          )
        }
      </FormeraContext.Consumer>
    )
  }
}
