import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.socket = undefined;  // will be connected in componentDidMount
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onCurrentUserUpdate = this.onCurrentUserUpdate.bind(this);
    this.state = {
      currentUser: {name:'Bob'},
      messages: []
    };
  }

  // Receive the message from the server and setState
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (message) => {
      this.setState({ messages: this.state.messages.concat([JSON.parse(message.data)])});
    }
  }

  // Receive message from the form
  onNewMessage(messageText) {
    const fullMessage = {username: this.state.currentUser.name, content: messageText};
    // send the message to the server
    this.socket.send(JSON.stringify(fullMessage));
  }

  // Update current user
  onCurrentUserUpdate(username) {
    this.setState({currentUser:{name:username}});
  }

  render() {
    return (
    <div>
      <NavBar />
      <MessageList messages = {this.state.messages}/>
      <ChatBar username = {this.state.currentUser.name} onNewMessage={ this.onNewMessage } onCurrentUserUpdate={ this.onCurrentUserUpdate }/>
    </div>
    );
  }
}
export default App;

