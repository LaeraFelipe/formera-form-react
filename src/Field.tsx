import React, { PureComponent } from 'react';
import withFormera from './withFormera';
import { FieldProps, Input, FieldRenderProps } from './types';
import { FieldHandler, FieldState } from 'formera-form';
import { getEventValue } from './utils';

interface State {
  fieldState: FieldState,
}

class Field extends PureComponent<FieldProps, State> {
  name: string = null;
  subscriptionKey: number = undefined;
  fieldHandler: FieldHandler = null;

  constructor(props: FieldProps) {
    super(props);

    const { name, formera, validators, validationType, stopValidationOnFirstError } = props;

    this.name = name;

    this.fieldHandler = formera.registerField(name, { validators, validationType, stopValidationOnFirstError });

    this.subscriptionKey = formera.fieldSubscribe(name, this.handleChange.bind(this));

    const fieldState = this.normalizeFieldState(formera.getFieldState(name));

    this.state = { fieldState };
  }

  componentWillUnmount() {
    const { formera, name, unregisterFieldOnUnmount } = this.props;
    formera.fieldUnsubscribe(name, this.subscriptionKey);
    if (unregisterFieldOnUnmount) {
      formera.unregisterField(name);
    }
  }

  /**Normalize field state to use with inputs. */
  normalizeFieldState(fieldState: FieldState) {
    return {
      ...fieldState,
      value: fieldState.value || ''
    }
  }

  /**Get render props. */
  getRenderProps(): FieldRenderProps {
    const { fieldState: { value, disabled, previousState, ...meta } } = this.state;
    const { onChange, onBlur, onFocus } = this.fieldHandler;

    const input: Input = {
      name: this.name,
      value,
      disabled,
      onFocus,
      onBlur,
      onChange: (eventOrValue) => onChange(getEventValue(eventOrValue)),
    }

    return { input, meta }
  }

  handleChange(fieldState: FieldState) {
    this.setState({ fieldState: this.normalizeFieldState(fieldState) });
  }

  render() {
    const { name, children, formera, component: Component } = this.props;

    const renderProps = this.getRenderProps();

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return Component ? <Component {...renderProps} /> : children(renderProps);
  }
}

export default withFormera<FieldProps>(Field);
