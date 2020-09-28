import React, { PureComponent, SyntheticEvent, } from 'react';
import Formera, { FormState } from 'formera-form';
import { FormeraContext } from './FormeraContext';
import { FormProps } from './types';

interface State {
  formState: FormState
}

export default class Form extends PureComponent<FormProps, State> {
  mounted = true;
  formera: Formera = undefined;
  unregisterFieldOnUnmount: boolean = false;

  constructor(props: FormProps) {
    super(props);

    const { debug, initialValues, disabled, onSubmit, validationType, customValidators, customValidationMessages, formeraInstance } = props;

    if (formeraInstance) {
      this.formera = formeraInstance;
    } else {
      this.formera = new Formera({ debug, initialValues, disabled, onSubmit, validationType, customValidationMessages, customValidators });
    }

    this.formera.formSubscribe(this.handleChange.bind(this));

    this.state = {
      formState: this.formera.getState()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps: FormProps, prevState: State) {
    if (prevProps.initialValues !== this.props.initialValues) {
      this.formera.reset(this.props.initialValues);
    }

    if (prevProps.disabled !== this.props.disabled && this.props.disabled !== undefined) {
      this.formera.enable(null, !this.props.disabled);
    }
  }

  handleChange(formState: FormState) {
    if (this.mounted) {
      this.setState({ formState: { ...formState } });
    }
  }

  handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.formera.submit();
  }

  render() {
    const { children, unregisterFieldOnUnmount, component: Component } = this.props;
    const { formState } = this.state;

    if (this.formera.debug) {
      console.log(`[FORMERA-REACT] ACTION: "RENDER" FORM`)
    }

    return (
      <FormeraContext.Provider value={{ formera: this.formera, unregisterFieldOnUnmount: !!unregisterFieldOnUnmount }}>
        {
          Component ?
            (
              <Component formera={this.formera} formState={formState} handleSubmit={this.handleSubmit} />
            )
            :
            (
              children({ formState, formera: this.formera, handleSubmit: this.handleSubmit })
            )
        }
      </FormeraContext.Provider>
    )
  }
}
