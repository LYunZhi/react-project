import React, {Component} from 'react';

function ChatBar({currentUser, newMessage, changeName}) {

  const currentUserValue = currentUser.name ? currentUser.name : 'Anonymous'

  function onEnter(event) {
    const message = {
      username: currentUserValue,
      content: event.target.value
    }

    if (event.key === 'Enter') {
      newMessage(message)
      event.target.value = ''
    }
  }

  function onEnterName(event) {
    if (event.key === 'Enter') {
      changeName(event.target.value)
    }
  }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={currentUserValue} onKeyPress={onEnterName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onEnter} />
      </footer>
      )

}

export default ChatBar;