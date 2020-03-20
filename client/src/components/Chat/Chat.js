import React, {useState, useEffect} from 'react';
import get from 'lodash/get';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Collapse} from 'reactstrap';
import cx from 'classnames';
import ChatInner from './ChatInner';
import io from 'socket.io-client';
import {bindActionCreators} from 'redux';
import {WebsocketConnected, WebsocketDisconnected, Message} from '../../store/modules/chat/constants';
import {fetchMessages, sendMessage} from '../../store/modules/chat/actions';
import {fetchMe} from '../../store/modules/auth/actions';

let socket = null;

function Chat(props) {
  const {
    token, isWebsocketConnected, messages, me, isCollapsed, isFixed,
    dispatch, fetchMessages, sendMessage, fetchMe,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (!token) return;

    fetchMe();
    fetchMessages();
  }, [token]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    
    const options = token
      ? {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      }
      : {};

    socket = io('', options);

    socket.on('connect', () => {
      dispatch({type: WebsocketConnected});
    });

    socket.on('disconnect', () => {
      dispatch({type: WebsocketDisconnected});
    });

    socket.on('message', message => {
      dispatch({type: Message, message});
    });
  }, [token]);

  function handleToggleCollapse() {
    setIsOpen(!isOpen);
  }

  function _sendMessage(msg) {
    socket.emit('message', { text: msg, date: Date.now() });
    sendMessage({
      text: msg,
      user: get(me, 'profile.displayName', 'пользователь'),
      date: Date.now(),
      id: Date.now(),
    });
  }

  return (
    <div className={cx("chat", {"fixed": isFixed})}>
      {isCollapsed && (
        <div className="chat__header" onClick={handleToggleCollapse}>
          Есть вопрос?
          <img src="/assets/icons/icon-chat-white.svg" alt="icon-chat" />
        </div>
      )}
      {isCollapsed
        ? <Collapse isOpen={isOpen}>
          <ChatInner
            isWebsocketConnected={isWebsocketConnected}
            sendMessage={_sendMessage}
            messages={messages} />
        </Collapse>
        : <ChatInner
          isWebsocketConnected={isWebsocketConnected}
          sendMessage={_sendMessage}
          messages={messages} />
      }
    </div>
  );
}

Chat.propTypes = {
  isCollapsed: PropTypes.bool,
  isFixed: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    me: state.auth.me,
    isWebsocketConnected: state.chat.isWebsocketConnected,
    messages: state.chat.messages,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({fetchMessages, sendMessage, fetchMe}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
