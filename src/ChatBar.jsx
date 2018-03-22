import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  
  handleChange(event) {
    this.props.onCurrentUserUpdate(event.target.value);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onNewMessage(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    return (
        <footer className="chatbar">,
            <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={this.handleChange} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress}/>
        </footer>
    )
  }
}
export default ChatBar;

