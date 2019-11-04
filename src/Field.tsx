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

    const { name, formera, validators, validationType } = props;

    const input: Input = formera.registerField(name, { validators, validationType });

    input.subscribe(this.handleChange.bind(this));

    delete input.subscribe;

    this.state = { input };
  }

  componentWillUnmount() {
    const { formera, name } = this.props;
    formera.unregisterField(name);
  }

  handleChange(input: Input) {
    delete input.subscribe;
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
