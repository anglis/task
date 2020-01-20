import React from 'react';
import { connect } from 'react-redux';

import { getProblem } from 'reducers/ducks/problems';
import DetailView from './detailView';
import DetailViewActions from './detailViewActions';
import EditDialog from '../editDialog';
import DeleteDialog from '../deleteDialog';
import NoContent from 'shared/components/noContent';
import Loader from 'shared/components/loader';

export class DetailViewContainer extends React.Component {
  state = {
    problem: null,
    fetching: true,
    openDeleteDialog: false,
    openEditDialog: false,
  }

  setProblem = problem => {
    this.setState({ problem });
  }

  setFetching = fetching => {
    this.setState({ fetching });
  }

  setOpenDeleteDialog = (open) => {
    this.setState({ openDeleteDialog: open })
  }

  setOpenEditDialog = (open) => {
    this.setState({ openEditDialog: open })
  }

  componentDidMount() {
    this.props.fetchProblemAction(this.props.id)
      .then(response => {
        this.setProblem(response.data)
      })
      .finally(() => {
        this.setFetching(false);
      });
  }

  render() {
    const { fetching, problem, openEditDialog, openDeleteDialog } = this.state;

    if (fetching) {
      return (
        <Loader />
      )
    }

    if (!problem) {
      return <NoContent />
    }

    return (
      <React.Fragment>
        <EditDialog
          handleClose={() => this.setOpenEditDialog(false)}
          open={openEditDialog}
          problemId={problem._id}
        />
        <DeleteDialog
          handleClose={() => this.setOpenDeleteDialog(false)}
          open={openDeleteDialog}
          problemId={problem._id}
        />
        <DetailView problem={problem} />
        <DetailViewActions
          openEditDialog={() => this.setOpenEditDialog(true)}
          openDeleteDialog={() => this.setOpenDeleteDialog(true)} />
      </React.Fragment>
    )
  }
}

export default connect(
  undefined,
  dispatch => ({
    fetchProblemAction(id) {
      return dispatch(getProblem(id));
    }
  })
)