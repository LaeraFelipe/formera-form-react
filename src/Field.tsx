import React, { PureComponent } from 'react';
import withFormera from './withFormera';
import { Field as FormeraField } from 'formera-forms/src/types';
import { FieldProps } from './types';

interface State {
  field: FormeraField,
}

class Field extends PureComponent<FieldProps, State> {
  constructor(props: FieldProps) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.state = { field: null };
  }

  componentDidMount() {
    const { formera, name } = this.props;
    const field = formera.registerField(name, { validators: ['required'] });

    field.subscribe(this.handleFieldChange);

    delete field.subscribe;

    this.setState({ field })
  }

  handleFieldChange(formeraField: FormeraField) {
    delete formeraField.subscribe;
    this.setState({ field: formeraField });
  }

  render() {
    const { field } = this.state;
    const { name, children } = this.props;

    console.log(`[FORMERA-REACT] ACTION: "RENDER" FIELD: "${name}"`);

    return field ?
      children(field)
      :
      (false)
  }
}

export default withFormera<FieldProps>(Field);
