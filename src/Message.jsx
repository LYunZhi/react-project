import React, {Component} from 'react';

function Message({message: {type, username, content}}) {

  let messageBox;

    switch (type) {
      case 'addMessage':
        messageBox = (<div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{content}</span>
        </div>)
        break;
      case 'changeName':
        messageBox = (<div className="notification">
           <span className="notification-content">{content}</span>
        </div>)
        break;
    }

    return (
      <div>
        {messageBox}
      </div>
      )
}

export default Message;