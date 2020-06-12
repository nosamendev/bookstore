import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../store/actions';
import { withRouter } from 'react-router-dom';

const Confirm = (props) => {
  const handleButtonClick = () => {
    props.closeModal();
  };

  return (
    <div>
      <div>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <div>
          <button onClick={handleButtonClick}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(null, { closeModal })(Confirm));
