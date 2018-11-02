import React, {Component} from 'react';
import Message from './Message.jsx'

function MessageList ({messages, color}) {

    const messageList = messages.map((message) => {
      return <Message key={message.id} message={message} color={message.color} />
    })

    return (
      <main className="messages">
      { messageList }
      </main>
    )
}

export default MessageList;