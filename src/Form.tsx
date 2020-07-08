import React, { PureComponent, SyntheticEvent, } from 'react';
import Formera, { FormState } from 'formera-form';
import { FormeraContext } from './FormeraContext';
import { FormProps } from './types';

interface State {
  formera: Formera,
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

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps: FormProps, prevState: State) {
    if (prevProps.initialValues !== this.props.initialValues) {
      const { formera } = this.state;
      formera.reset(this.props.initialValues);
    }
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
    const { children, component: Component } = this.props;
    const { formera, formState } = this.state;

    if (formera.debug) {
      console.log(`[FORMERA-REACT] ACTION: "RENDER" FORM`)
    }

    return (
      <FormeraContext.Provider value={{ formera }}>
        {
          Component ?
            (
              <Component formera={formera} formState={formState} handleSubmit={this.handleSubmit} />
            )
            :
            (
              children({ formState, formera, handleSubmit: this.handleSubmit })
            )
        }
      </FormeraContext.Provider>
    )
  }
}
