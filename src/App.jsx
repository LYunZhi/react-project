import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        name: ''
      },
      messages: [],
      notifications: [],
      usersOnline: 0,
    }
    this.socket = new WebSocket('ws://localhost:3001/')
    this.newMessage = this.newMessage.bind(this)
    this.changeName = this.changeName.bind(this)
  }

  newMessage(message) {
    message.type = 'addMessage'
    this.socket.send(JSON.stringify(message))
  }

  changeName(name) {
    const oldUsername = this.state.currentUser.name
    this.socket.send(JSON.stringify({
      type: 'changeName',
      oldUsername,
      username: name
    }))

    this.setState({
      currentUser: {
        name: name
      }
    })
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to server')
    }

    this.socket.onmessage = (event) => {
      const incomingData = JSON.parse(event.data)
      const incomingType = incomingData.type
      let allMessages

      switch(incomingType) {
        case 'addMessage':
          allMessages = this.state.messages.concat(incomingData)

          this.setState({
            messages: allMessages
          })
          break;
        case 'changeName':
          allMessages = this.state.messages.concat(incomingData)

          this.setState({
            messages: allMessages
          })
          break;
        case 'onlineCount':
          const count = incomingData.count
          this.setState({
            usersOnline: count
          })
          break;
        default:
          throw new Error("Unknown event type " + incomingType)
      }
    }

    this.socket.onclose = (event) => {
      console.log('Connection closed')
      this.socket.send(JSON.stringify({
        type: 'onlineCount'
      }))
    }
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="counter">{this.state.usersOnline} users online</span>
      </nav>
      <MessageList messages = { this.state.messages } color = { this.state.color }/>
      <ChatBar currentUser = { this.state.currentUser } newMessage = {this.newMessage} changeName = {this.changeName}/>
      </div>
    );
  }
}
export default App;
