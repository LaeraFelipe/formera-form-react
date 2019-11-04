import React, { Component, PureComponent } from 'react';
import withFormera from './withFormera';
import { FieldArrayProps, FieldArrayRenderProps } from './types';
import { Field } from 'formera-forms/dist/types';

interface State {
  field: Field,
  fieldArrayHandler: FieldArrayRenderProps,
}

class FieldArray extends PureComponent<FieldArrayProps, State> {
  constructor(props: FieldArrayProps) {
    super(props);

    this.state = { field: null, fieldArrayHandler: null }

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    const { name, formera } = this.props;

    const field = formera.registerField(name);

    field.subscribe(this.handleFieldChange);

    this.setState({ field, fieldArrayHandler: this.getHandler(field) });
  }

  getHandler(field: Field): FieldArrayRenderProps {
    const { name } = this.props;
    return {
      push(value = {}) {
        field.onChange([...field.value, value]);
      },
      remove(index: number) {
        const value = [...field.value];
        value.splice(index, 1);
        field.onChange(value);
      },
      map(callback) {
        if (field.value) {
          return field.value.map((item: any, index: number) => callback(`${name}[${index}]`, index));
        } else {
          return (false)
        }
      }
    }
  }

  handleFieldChange(field: Field) {
    this.setState({ field, fieldArrayHandler: this.getHandler(field) });
  }

  render() {
    const { field, fieldArrayHandler } = this.state;
    const { name, children } = this.props;

    console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return (
      field ?
        children(fieldArrayHandler)
        :
        (false)
    )
  }
}

export default withFormera<FieldArrayProps>(FieldArray)
