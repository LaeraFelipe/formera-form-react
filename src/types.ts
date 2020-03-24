import Formera, { FormOptions, FieldValidator, FieldSubscriptionOptions, FieldHandler, FormState, FieldState } from "formera-form";
import { ReactElement } from "react";

/**Form props. */
export interface FormProps extends Partial<FormOptions> {
  /**Formera instance. If not passed will create a new one using the other properties entered. */
  formeraInstance?: Formera,
  /**Class to form tag. */
  className?: string
  /**Child element. This should contain the field elements. */
  children: (formState: Partial<FormState>, form: Formera) => ReactElement | ReactElement,
}

/**Field props. */
export interface FieldProps {
  /**Field name. This name will be used as a key within the form's value object to identify the value of the field. */
  name: string,
  /**Validators used by the field. */
  validators?: Array<string | FieldValidator>,
  /**Validation type. */
  validationType?: 'onChange' | 'onBlur',
  /**Parts of the field state to observe changes. */
  subscriptions?: FieldSubscriptionOptions,
  /**Whether validation should stop at the first error. */
  stopValidationOnFirstError?: boolean,
  /**Formera instance. It is not necessary to enter this property as it is already received via context. */
  formera?: Formera,
  /**Field element. */
  children: (field: FieldRenderProps) => ReactElement,
}

/**Field render props. */
export interface FieldRenderProps {
  /**Properties for field state manipulation. */
  input: Input,
  /**Field state. */
  meta: Meta,
}

/**Field array props. */
export interface FieldArrayProps {
  /**Field name. This name will be used as a key within the form's value object to identify the value of the field. */
  name: string,
  /**Field element. */
  children: (arrayHandler: FieldArrayRenderProps) => ReactElement,
  /**Formera instance. It is not necessary to enter this property as it is already received via context. */
  formera?: Formera,
}

/**
 * Map callback
 * @param arrayItemName Field name of current array level.
 * @param arrayItemIndex Current index of array.
 */
export type MapCallback = (arrayItemName: string, arrayItemIndex: number) => ReactElement

/**Field array render props. */
export interface FieldArrayRenderProps {
  /**Size of array. */
  length: number,
  /**Mapping function to generate array items.  */
  map(callback: MapCallback): ReactElement,
  /**Push function to add items in array. */
  push(value: any): void,
  /**Remove function to remove items from array. */
  remove(index: number): void,
}

/**This context provides the instance of the formera.  */
export interface IFormeraContext {
  /**Formera instance. */
  formera: Formera
}

/**Parts of field state to pass to field component or field array component. */
export interface Meta extends Omit<FieldState, 'value' | 'previousState' | 'disabled'> { }

/**Properties for field state manipulation. */
export interface Input extends Omit<FieldHandler, 'subscribe' | 'setData' | 'disable' | 'enable'> {
  /**Field name. */
  name: string,
  /**If field is disabled. */
  disabled: boolean,
  /**Field value. */
  value: any
}
