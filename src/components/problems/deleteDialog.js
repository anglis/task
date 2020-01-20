import React from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { deleteProblem } from 'reducers/ducks/problems';
import { goTo } from 'shared/utils/goTo';

const DeleteProblemDialog = ({ handleClose, open, problemId }) => {
  const dispatch = useDispatch();

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle onClose={handleClose}>
        Ar tikrai norite panaikinti problema?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>
          Atsaukti
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            dispatch(deleteProblem(problemId))
              .then(() => {
                handleClose();
                goTo('/problems');
              });
          }}
        >
          Panaikinti
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProblemDialog;