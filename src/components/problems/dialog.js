import React from 'react';
import { Dialog, DialogTitle, makeStyles } from '@material-ui/core';
import { Translate } from 'react-localize-redux';

import Form from './createProblemForm';

const useStyles = makeStyles(() => ({
  dialog: {
    width: '70vw',
  }
}))

const CreateProblemDialog = ({ handleClose, open }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      classes={{ paper: classes.dialog }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle onClose={handleClose}>
        <Translate id="problems.form.title" />
      </DialogTitle>
      <Form handleClose={handleClose} />
    </Dialog>
  )
}

export default CreateProblemDialog;