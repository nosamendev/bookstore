import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { closeModal } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { deleteBook } from '../../../store/actions/deleteBook';
import Loader from '../../Loader/Loader';
import ConfirmErr from './ConfirmErr';
import ConfirmOk from './ConfirmOk';

const DeleteConfirmation = (props) => {
  const handleOKButton = () => {
    props.deleteBook(props.id);
    //props.history.push('/manage');
  };

  const handleCancelButton = () => {
    props.closeModal();
  };

  let content = (
    <div>
      <h2>{props.modalTitle}</h2>
      <h3>
        <b>{props.title}</b> by <b>{props.author}</b>?
      </h3>
      <div>
        <span className="button" onClick={handleOKButton}>
          OK
        </span>
        <span className="button second-level" onClick={handleCancelButton}>
          Cancel
        </span>
      </div>
    </div>
  );

  if (props.loading) {
    content = <Loader />;
  }

  if (props.error) {
    content = (
      <ConfirmErr
        title="The book couldn't be deleted."
        text={props.errorDescription}
      />
    );
  }

  if (props.deleted) {
    content = <ConfirmOk title="The book has been deleted." />;
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.deleteReducer.error,
    loading: state.deleteReducer.loading,
    errorDescription: state.deleteReducer.description.message,
    deleted: state.deleteReducer.deleted,
  };
};

export default withRouter(
  connect(mapStateToProps, { closeModal, deleteBook })(DeleteConfirmation)
);
