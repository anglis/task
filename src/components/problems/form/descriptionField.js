import React from 'react';
import { makeStyles } from '@material-ui/core';
import { pathOr, length, split, compose, path } from 'ramda';

import InputField from '../../../shared/components/input';

const getPath = split('.');

const isError = ({ field, form: { touched, errors } }) => {
  const pt = getPath(field.name);
  const fieldTouched = path(pt, touched);
  const fieldErrors = path(pt, errors);

  return !!fieldTouched && !!fieldErrors;
}

const getValueLength = compose(
  length,
  split(' '),
  pathOr('', ['field', 'value'])
)

const getHelperText = (props) => {
  const pt = getPath(props.field.name);
  const value = props.field.value
  const fieldTouched = path(pt, props.form.touched);
  const fieldErrors = path(pt, props.form.errors);
  const valueLength = getValueLength(props);


  if (fieldErrors && fieldTouched) {
    return false;
  }

  if (!fieldTouched && !value) {
    return false;
  }


  if (valueLength <= 5) {
    return 'Tekstas atitinka rekomendacijas'
  }

  if (valueLength > 5) {
    return 'Tekstas viršija 5 žodžių rekomendaciją'
  }
}

const useStyles = makeStyles(() => ({
  good: {
    color: '#4caf50'
  },
  bad: {
    color: '#ff9800'
  }
}))

const DescriptionInput = (props) => {
  const err = isError(props);
  const helpText = getHelperText(props);
  const classes = useStyles();
  const valueLength = getValueLength(props);


  return (
    <InputField
      InputLabelProps={{ shrink: true }}
      FormHelperTextProps={{ classes: { root: err ? null : valueLength > 5 ? classes.bad : classes.good } }}
      helperText={helpText}
      {...props} />
  )
}

export default DescriptionInput;