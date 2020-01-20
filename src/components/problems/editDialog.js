import React, { useEffect } from 'react';
import { Dialog, DialogTitle, makeStyles, DialogActions, Button, Grid, DialogContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { Formik } from 'formik';
import { path } from 'ramda';

import { fetchProblem, editProblem, fetchProblems, removeProblem } from '../../services/problems.service';
import { withTranslate } from '../../shared/components/translate';
import { actions as notificationsActions } from '../../shared/components/notifications';
import ProblemForm from './form';

const useStyles = makeStyles(() => ({
  dialog: {
    width: '70vw',
  }
}))

const CreateProblemDialog = ({ handleClose, open, problemId, translate }) => {
  const [initialValues, setInitialValues] = React.useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (problemId != null) {
      dispatch(fetchProblem(problemId))
        .then(result => setInitialValues(result));
    }
  }, [problemId]);

  return (
    <Dialog
      fullWidth
      classes={{ paper: classes.dialog }}
      aria-labelledby="customized-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(val, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          dispatch(editProblem(problemId, val))
            .then(() => {
              handleClose();
              dispatch(notificationsActions.displayMessage('success', translate('notifications.success.edit')));
            })
            .then(() => dispatch(fetchProblems()))
            .catch(err => {
              const errors = path(['response', 'data', 'errors'], err);
              if (errors) setErrors(errors);
              dispatch(notificationsActions.displayMessage('error', translate('notifications.errors.edit')));
            })
            .finally(() => setSubmitting(false));
        }}
        render={formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <DialogTitle>
              <Translate id="problems.edit.title" />
            </DialogTitle>
            <DialogContent>
              <ProblemForm />
            </DialogContent>
            <DialogActions style={{ margin: 8 }}>
              <Grid container justify='flex-end' wrap='nowrap' spacing={1}>
                <Grid item>
                  <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                      <Button onClick={handleClose}>
                        <Translate id="common.cancel" />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!formProps.isValid || formProps.isSubmitting}
                      >
                        <Translate id="common.edit" />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  )
}

export default withTranslate(CreateProblemDialog);