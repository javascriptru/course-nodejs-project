import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from 'reactstrap';
import ChatMessage from './ChatMessage';
// import Loader from '../Loader';
// import {fetchMessages} from "../../store/modules/chat/actions";
// import {connect} from "react-redux";

const ChatInner = ({isWebsocketConnected, messages, sendMessage}) => {
  // useEffect(() => {
  //   fetchMessages();
  // }, []);
  //
  // if (!messages.length) {
  //   return <Loader />;
  // }
  
  const [msg, setMsg] = useState('');
  
  function onSubmit(e) {
    e.preventDefault();
    if (isWebsocketConnected) {
      sendMessage(msg);
      setMsg('');
    }
  }

  return (
    <div className="chat__inner">
      <div className="chat__body">
        {messages.map(message => {
          return (
            <ChatMessage
              key={message.id}
              income={message.user !== 'Администратор'}
              outcome={message.user === 'Администратор'}
              date={message.date}
              from={message.user}
              message={message.text} />
          );
        })}
      </div>
      <div className="chat__footer">
        <Form onSubmit={onSubmit} className="form-inline form-inline-flex">
          <Input value={msg} onChange={e => setMsg(e.target.value)} className="form-control mr-2" type="text" />
          <Button type="submit" color="link" className="btn btn-send">
            <img src="/assets/icons/icon-send.svg" alt="" />
          </Button>
        </Form>
      </div>
    </div>
  )
};

// function mapStateToProps(state) {
//   return { messages: state.messages };
// }
//
// const mapDispatchToProps = { fetchMessages };
//
// export default connect(mapStateToProps, mapDispatchToProps)(ChatInner);

export default ChatInner;
