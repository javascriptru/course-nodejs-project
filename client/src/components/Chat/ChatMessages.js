import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ChatMessage from './ChatMessage';

const ChatMessages = ({income, outcome, date, from, messages}) => (
  <>
    {messages.map(message => (<ChatMessage key={message.id} income date="16:45" from="AnyShop" message="Hello there" />))}
  </>
);

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatMessages;