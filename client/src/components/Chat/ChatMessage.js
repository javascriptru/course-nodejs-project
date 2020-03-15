import React from 'react';
// import PropTypes from 'prop-types';
import cx from 'classnames';

const ChatMessage = ({income, outcome, date, from, message}) => (
  <div className={cx("chat__message", {'-income': income, '-outcome': outcome})}>
    <div className="chat__message--date">{from} @ {formatDate(date)}</div>
    <div className="chat__message--inner">
      {message}
    </div>
  </div>
);

function formatDate(date) {
  const d = new Date(date);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}


ChatMessage.propTypes = {
  // message: PropTypes.string.isRequired
};

export default ChatMessage;
