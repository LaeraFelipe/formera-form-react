import React, { PureComponent, } from 'react';
import Formizer from 'formera-form';
import Formera from 'formera-form';
import { FormeraContext } from './FormeraContext';
import { FormProps } from './types';
import { FormState } from 'formera-form/dist/types';

interface State {
  formera: Formizer,
  formState: FormState
}

export default class Form extends PureComponent<FormProps, State> {
  constructor(props: FormProps) {
    super(props);

    const { debug, initialValues, onSubmit, validationType, customValidators, customValidationMessages } = props;

    const formera = new Formera({ debug, initialValues, onSubmit, validationType, customValidationMessages, customValidators });

    formera.formSubscribe(this.handleChange.bind(this));

    this.state = {
      formera,
      formState: formera.getState().formState
    };
  }

  handleChange(formState: FormState) {
    this.setState({ formState: { ...formState } });
  }

  render() {
    const { children } = this.props;
    const { formera, formState } = this.state;

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FORM`);

    return (
      <form>
        <FormeraContext.Provider value={{ formera }}>
          {children(formState, formera)}
        </FormeraContext.Provider>
      </form>
    )
  }
}
