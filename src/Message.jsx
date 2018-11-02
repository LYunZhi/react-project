import React, {Component} from 'react';

function Message({message: {type, username, content}, color}) {

    let messageBox;
    const styles = {
      color: color
    }

    // Function to check if the content contains a url

    const checkForImg = (content) => {
      return content.match(/(https?:\/\/.*\.(?:png|jpg|gif))/i)
    }

    // Here we break the content into an array, then we check if it is an image link, if so, we embed it into JSX

    if (checkForImg(content) !== null) {
      const contentSeparated = content.split(' ')
      const newData = contentSeparated.map((word) => {
        if (checkForImg(word) !== null) {
          const found = checkForImg(word).input
          return (<img src={found}/>)
        } else {
          return word + ' '
        }
      })
      content = newData
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