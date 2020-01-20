import React from 'react';
import { Formik } from 'formik';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { path } from 'ramda';

import { withTranslate } from '../../shared/components/translate';
import { actions as notificationsActions } from '../../shared/components/notifications';
import { createProblem, fetchProblems } from '../../services/problems.service';
import { formatNewProblem } from './utils';
import { validationSchema } from './validation';
import ProblemForm from './form';

const CreateProblem = ({ handleClose, translate, initialValues }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues || {
        status: { value: 'Vykdomas', label: 'Vykdomas' },
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        const formattedValues = formatNewProblem(values);
        dispatch(createProblem(formattedValues))
          .then(() => {
            handleClose();
            dispatch(notificationsActions.displayMessage('success', translate('notifications.success.create')));
          })
          .then(() => dispatch(fetchProblems()))
          .catch(err => {
            const errors = path(['response', 'data', 'errors'], err);
            if (errors) actions.setErrors(errors);
            dispatch(notificationsActions.displayMessage('error', translate('notifications.errors.create')));
          })
          .finally(() => actions.setSubmitting(false))
      }}
      render={props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <DialogContent dividers>
              <ProblemForm />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                disabled={props.isSubmitting}
              >
                {translate("common.cancel")}
              </Button>
              <Button
                type='submit'
                color="primary"
                variant='contained'
                disabled={!props.isValid || props.isSubmitting}
              >
                {translate("common.create")}
              </Button>
            </DialogActions>
          </form>
        )
      }} />
  );
}

export default withTranslate(CreateProblem)