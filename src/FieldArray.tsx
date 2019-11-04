import React, { PureComponent } from 'react';
import withFormera from './withFormera';
import { FieldArrayProps, FieldArrayRenderProps } from './types';
import { Input } from 'formera-form/src/types';

interface State {
  input: Input,
  arrayHandler: FieldArrayRenderProps,
}

class FieldArray extends PureComponent<FieldArrayProps, State> {
  constructor(props: FieldArrayProps) {
    super(props);

    const { name, formera } = props;

    const input: Input = formera.registerField(name);

    input.subscribe(this.handleChange.bind(this));

    delete input.subscribe;

    this.state = { input, arrayHandler: this.getArrayHandler(input) };
  }

  componentWillUnmount() {
    const { formera, name } = this.props;
    formera.unregisterField(name);
  }

  getArrayHandler(input: Input): FieldArrayRenderProps {
    const { name } = this.props;
    return {
      length: input.value ? input.value.length : 0,
      push(value = {}) {
        input.onChange([...input.value, value]);
      },
      remove(index: number) {
        const value = [...input.value];
        value.splice(index, 1);
        input.onChange(value);
      },
      map(callback) {
        if (input.value) {
          return input.value.map((item: any, index: number) => callback(`${name}[${index}]`, index));
        } else {
          return (false)
        }
      }
    }
  }

  handleChange(input: Input) {
    this.setState({ input, arrayHandler: this.getArrayHandler(input) });
  }

  render() {
    const { arrayHandler } = this.state;
    const { name, children, formera } = this.props;

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return children(arrayHandler);
  }
}

export default withFormera<FieldArrayProps>(FieldArray)
