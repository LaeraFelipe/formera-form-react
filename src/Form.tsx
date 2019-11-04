import React, { PureComponent, } from 'react';
import Formizer from 'formera-forms';
import Formera from 'formera-forms';
import { FormeraContext } from './FormeraContext';
import { FormProps } from './types';
import { FormState } from 'formera-forms/dist/types';

interface State {
  formera: Formizer,
  formState: FormState
}

export default class Form extends PureComponent<FormProps, State> {
  constructor(props: any) {
    super(props);

    const { debug, initialValues, onSubmit } = props;

    const formera = new Formera({ debug, initialValues, onSubmit });

    formera.formSubscribe(this.handleChange.bind(this));

    this.state = {
      formera,
      formState: formera.getState()
    };
  }

  handleChange(formState: FormState) {
    this.setState({ formState })
  }

  handleSubmit(values: any) {
    const { formera } = this.state;
    formera.submit();
  }

  render() {
    const { children } = this.props;
    const { formera, formState } = this.state;

    return (
      <form>
        <FormeraContext.Provider value={{ formera }}>
          {children(formState, formera)}
        </FormeraContext.Provider>
      </form>
    )
  }
}
