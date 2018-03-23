
import React, {Component} from 'react';

class Message extends Component {
  render() {

    const color = {
      color: this.props.color
    };

    if (this.props.type === 'postNotification') {  
      return (
        <div className="notification">
          <span className="notification-content">**** {this.props.username} changed their name to {this.props.content}****</span>
        </div>
      )
    } else {
      return(  
        <div className="message">
          <span className="message-username" style={color}>{this.props.username}</span>
          <span className="message-content" key={this.props.id}>{this.props.content}</span>
        </div>
      )
    }
  }
}
export default Message;
