import React, {Component} from 'react';

function Message({message: {type, username, content}, color}) {

    let messageBox;
    const styles = {
      color: color
    }

    switch (type) {
      case 'addMessage':
        messageBox = (<div className="message">
          <span className="message-username" style={styles}>{username}</span>
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