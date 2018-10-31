import React, {Component} from 'react';

function ChatBar({currentUser, newMessage}) {

  const currentUserValue = currentUser ? currentUser : 'Anonymous'

  function onEnter(event) {
    const message = {
      id: Math.floor(Math.random() * Math.floor(100)),
      username: currentUserValue,
      content: event.target.value
    }

    if (event.key === 'Enter') {
      newMessage(message)
      event.target.value = ''
    }
  }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={currentUserValue}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onEnter} />
      </footer>
      )

}

export default ChatBar;