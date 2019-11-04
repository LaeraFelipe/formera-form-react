import { FieldSubscriptionOptions, Field, FormState } from "formera-form/src/types";
import { FieldValidator } from "formera-form/dist/types";
import { ReactElement } from "react";
import Formera from "formera-form";

export interface FormProps {
  initialValues: any,
  onSubmit: (values: any) => any,
  children: (formState: Partial<FormState>, form: Formera) => ReactElement
  debug?: boolean,
}

export interface FieldProps {
  name: string,
  validators?: Array<string | FieldValidator>,
  subscriptions?: FieldSubscriptionOptions,
  formera?: Formera,
  children: (field: FieldRenderProps) => ReactElement,
}

export interface FieldRenderProps extends Field { }

export interface FieldArrayProps {
  name: string,
  children: (arrayHandler: FieldArrayRenderProps) => ReactElement,
  formera?: Formera,
}

export interface FieldArrayRenderProps {
  map(callback: (arrayItemName: string, arrayItemIndex: number) => ReactElement): ReactElement,
  push(value: any): void,
  remove(index: number): void,
}

export interface IFormeraContext {
  formera: Formera
}
