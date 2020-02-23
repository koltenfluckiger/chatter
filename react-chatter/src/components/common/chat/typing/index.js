import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Typing extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {username} = this.props;
    if (username === null){
      return null
    }
    return (
    <p>{username} is typing...</p>
    )
  }
}

export default Typing;
