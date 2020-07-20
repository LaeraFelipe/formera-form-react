import React, { PureComponent, ReactElement } from 'react';
import withFormera from './withFormera';
import { FieldArrayProps, FieldArrayRenderProps, Input, MapCallback } from './types';
import { FieldHandler, FieldState } from 'formera-form';

interface State {
  fieldState: FieldState
}

class FieldArray extends PureComponent<FieldArrayProps, State> {
  name: string = null;
  fieldHandler: FieldHandler = null;
  arrayHandler: FieldArrayRenderProps = null;

  constructor(props: FieldArrayProps) {
    super(props);

    const { name, formera } = props;

    this.name = name;
    this.fieldHandler = formera.registerField(name);

    formera.fieldSubscribe(name, this.handleChange.bind(this));
    const fieldState = formera.getFieldState(this.name);

    this.state = { fieldState };

    this.map = this.map.bind(this);
    this.push = this.push.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentWillUnmount() {
    const { formera } = this.props;
    formera.unregisterField(this.name);
  }

  /**Map the itens from array. */
  map(callback: MapCallback): ReactElement {
    const { fieldState: { value } } = this.state;
    return value && value.map((item: any, index: number) => callback(`${this.name}[${index}]`, item, index));
  }

  /**Push a new item in array. */
  push(newValue = {}) {
    const { fieldState: { value } } = this.state;
    this.fieldHandler.onChange([...value, newValue]);
  }

  /**Remove item from array. */
  remove(index: number) {
    const { fieldState: { value } } = this.state;
    const newValue = [...value];
    newValue.splice(index, 1);
    this.fieldHandler.onChange(newValue);
  }

  /**Get render props. */
  getRenderProps(): FieldArrayRenderProps {
    const { fieldState: { value, previousState, ...meta } } = this.state;

    return {
      meta,
      value: value,
      length: value ? value.length : 0,
      push: this.push,
      remove: this.remove,
      map: this.map
    }
  }

  handleChange(fieldState: FieldState) {
    this.setState({ fieldState });
  }

  render() {
    const { formera, children, component: Component } = this.props;
    const renderProps = this.getRenderProps();

    if (formera.debug) console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return Component ? <Component {...renderProps} /> : children(renderProps);
  }
}

export default withFormera<FieldArrayProps>(FieldArray)
