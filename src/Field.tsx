import React, { PureComponent } from 'react';
import withFormera from './withFormera';
import { FieldProps, Input, Meta, FieldRenderProps } from './types';
import { FieldHandler, FieldState } from 'formera-form';

interface State {
  fieldState: FieldState,
}

class Field extends PureComponent<FieldProps, State> {
  name: string = null;
  fieldHandler: FieldHandler = null;

  constructor(props: FieldProps) {
    super(props);

    const { name, formera, validators, validationType, stopValidationOnFirstError } = props;

    this.name = name;

    this.fieldHandler = formera.registerField(name, { validators, validationType, stopValidationOnFirstError });

    formera.fieldSubscribe(name, this.handleChange.bind(this));

    const fieldState = this.normalizeFieldState(formera.getFieldState(name));

    this.state = { fieldState };
  }

  componentWillUnmount() {
    const { formera, name } = this.props;
    formera.unregisterField(name);
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
      onChange,
    }

    return { input, meta }
  }

  handleChange(fieldState: FieldState) {
    this.setState({ fieldState: this.normalizeFieldState(fieldState) });
  }

  render() {
    const { name, children, formera } = this.props;

    const renderProps = this.getRenderProps();

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return children(renderProps);
  }
}

export default withFormera<FieldProps>(Field);
