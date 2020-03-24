import React, { PureComponent, SyntheticEvent, } from 'react';
import Formizer, { FormState } from 'formera-form';
import Formera from 'formera-form';
import { FormeraContext } from './FormeraContext';
import { FormProps } from './types';

interface State {
  formera: Formizer,
  formState: FormState
}

export default class Form extends PureComponent<FormProps, State> {
  mounted = true;
  constructor(props: FormProps) {
    super(props);

    const { debug, initialValues, onSubmit, validationType, customValidators, customValidationMessages, formeraInstance } = props;

    let formera: Formera;

    if (formeraInstance) {
      formera = formeraInstance;
    } else {
      formera = new Formera({ debug, initialValues, onSubmit, validationType, customValidationMessages, customValidators });
    }

    formera.formSubscribe(this.handleChange.bind(this));

    this.state = {
      formera,
      formState: formera.getState()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.mounted = false;
  }

  handleChange(formState: FormState) {
    if (this.mounted) {
      this.setState({ formState: { ...formState } });
    }
  }

  handleSubmit(event: SyntheticEvent) {
    const { formera } = this.state;
    event.preventDefault();
    formera.submit();
  }

  render() {
    const { children, className } = this.props;
    const { formera, formState } = this.state;

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FORM`);

    return (
      <form className={className} onSubmit={this.handleSubmit} >
        <FormeraContext.Provider value={{ formera }}>
          {children(formState, formera)}
        </FormeraContext.Provider>
      </form>
    )
  }
}
