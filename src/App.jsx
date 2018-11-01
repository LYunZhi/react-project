import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: '',
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001/')
    this.newMessage = this.newMessage.bind(this)
    this.changeName = this.changeName.bind(this)
  }

  newMessage(message) {
    this.socket.send(JSON.stringify(message))
  }

  changeName(name) {
    this.setState({
      currentUser: name
    })
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to server')
    }

    this.socket.onmessage = (event) => {
      const nextMessage = JSON.parse(event.data)
      const allMessages = this.state.messages.concat(nextMessage)

      this.setState({
        messages: allMessages
      })
    }
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages = { this.state.messages }/>
      <ChatBar currentUser = { this.state.currentUser } newMessage = {this.newMessage} changeName = {this.changeName}/>
      </div>
    );
  }
}
export default App;
