import React, { PureComponent } from 'react';
import withFormera from './withFormera';
import { Input } from 'formera-form/src/types';
import { FieldProps } from './types';

interface State {
  input: Input,
}

class Field extends PureComponent<FieldProps, State> {
  constructor(props: FieldProps) {
    super(props);

    const { name, formera, validators, validationType, stopValidationOnFirstError } = props;

    const input: Input = formera.registerField(name, { validators, validationType, stopValidationOnFirstError });

    formera.fieldSubscribe(name, this.handleChange.bind(this))

    this.state = { input };
  }

  componentWillUnmount() {
    const { formera, name } = this.props;
    formera.unregisterField(name);
  }

  handleChange(input: Input) {
    this.setState({ input });
  }

  render() {
    const { input } = this.state;
    const { name, children, formera } = this.props;

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return children(input);
  }
}

export default withFormera<FieldProps>(Field);
