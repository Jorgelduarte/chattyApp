import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="counter">
          <span> {this.props.counter} users online</span>
        </div>
      </nav>
    )
  }
}
export default NavBar;

