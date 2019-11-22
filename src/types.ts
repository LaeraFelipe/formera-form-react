import Formera, { FormOptions, FieldValidator, FieldSubscriptionOptions, FieldHandler, FormState, FieldState } from "formera-form";
import { ReactElement } from "react";

export interface FormProps extends FormOptions {
  formeraInstance?: Formera,
  children: (formState: Partial<FormState>, form: Formera) => ReactElement
}

export interface FieldProps {
  name: string,
  validators?: Array<string | FieldValidator>,
  validationType?: 'onChange' | 'onBlur',
  subscriptions?: FieldSubscriptionOptions,
  stopValidationOnFirstError?: boolean,
  formera?: Formera,
  children: (field: FieldRenderProps) => ReactElement,
}

export interface FieldRenderProps {
  input: Input,
  meta: Meta,
}

export interface FieldArrayProps {
  name: string,
  children: (arrayHandler: FieldArrayRenderProps) => ReactElement,
  formera?: Formera,
}

export type MapCallback = (arrayItemName: string, arrayItemIndex: number) => ReactElement

export interface FieldArrayRenderProps {
  length: number,
  map(callback: MapCallback): ReactElement,
  push(value: any): void,
  remove(index: number): void,
}

export interface IFormeraContext {
  formera: Formera
}

export interface Meta extends Omit<FieldState, 'value' | 'previousState' | 'disabled'> { }

export interface Input extends Omit<FieldHandler, 'subscribe'> {
  name: string,
  disabled: boolean,
  value: any
}
