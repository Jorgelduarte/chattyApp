import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
    <div>
      <NavBar />
      <Message />
      <MessageList />
      <ChatBar />
    </div>
    );
  }
}
export default App;
