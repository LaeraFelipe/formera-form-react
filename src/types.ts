import { FieldSubscriptionOptions, Input, FormState } from "formera-form/src/types";
import { FieldValidator, FormOptions } from "formera-form/dist/types";
import { ReactElement } from "react";
import Formera from "formera-form";

export interface FormProps extends FormOptions {
  children: (formState: Partial<FormState>, form: Formera) => ReactElement
}

export interface FieldProps {
  name: string,
  validators?: Array<string | FieldValidator>,
  validationType?: 'onChange' | 'onBlur',
  subscriptions?: FieldSubscriptionOptions,
  formera?: Formera,
  children: (field: FieldRenderProps) => ReactElement,
}

export interface FieldRenderProps extends Input { }

export interface FieldArrayProps {
  name: string,
  children: (arrayHandler: FieldArrayRenderProps) => ReactElement,
  formera?: Formera,
}

export interface FieldArrayRenderProps {
  length: number,
  map(callback: (arrayItemName: string, arrayItemIndex: number) => ReactElement): ReactElement,
  push(value: any): void,
  remove(index: number): void,
}

export interface IFormeraContext {
  formera: Formera
}
