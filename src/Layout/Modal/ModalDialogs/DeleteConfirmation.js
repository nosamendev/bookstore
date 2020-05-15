import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { deleteBook } from '../../../store/actions/deleteBook';
import Loader from '../../Loader/Loader';
import ConfirmErr from './ConfirmErr';

const DeleteConfirmation = (props) => {
  const handleOKButton = () => {
    props.deleteBook(props.id);
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
  };
};

export default withRouter(
  connect(mapStateToProps, { openModal, closeModal, deleteBook })(
    DeleteConfirmation
  )
);
