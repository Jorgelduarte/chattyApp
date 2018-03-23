import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){

    // Array with some colors
    var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
    // ... in random order
    colors.sort(function(a,b) { return Math.random() > 0.5; } );

    super(props);
    this.socket = undefined;  // will be connected in componentDidMount
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onCurrentUserUpdate = this.onCurrentUserUpdate.bind(this);
    this.changeName = this.changeName.bind(this);
    this.state = {
      currentUser: {
        name:'Anonymus',
        color: colors[3]
      }, 
      messages: [],
      usersOnLine: 0
    };
  }


  // Receive the message from the server and setState
  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);
      if (typeof newMessage === 'number') {
        this.setState({ usersOnLine: newMessage}); 
      } else {
        this.setState({ messages: this.state.messages.concat([newMessage])});
      }
    }
  }


  // Receive message from the form
  onNewMessage(messageText) {
    const fullMessage = {type: "postMessage", username: this.state.currentUser.name, content: messageText, color: this.state.currentUser.color};
    // send the message to the server
    this.socket.send(JSON.stringify(fullMessage));
  }

  // Update current user
  onCurrentUserUpdate(username) {
    this.setState({currentUser:{name:username, color: this.state.currentUser.color}});
  }

   // Receive message from the form
   changeName(username) {
    const newUserName = {type: 'postNotification', username: this.state.currentUser.name, content: username};
    // send the message to the server
    this.socket.send(JSON.stringify(newUserName));
  }

  render() {
    return (
    <div>
      <NavBar counter = {this.state.usersOnLine}/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar username = {this.state.currentUser.name} onNewMessage={ this.onNewMessage } onCurrentUserUpdate={ this.onCurrentUserUpdate } changeName={ this.changeName }/>
    </div>
    );
  }
}
export default App;

