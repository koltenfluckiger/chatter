import React, {Component} from 'react';

import styles from "./users.module.css";

class Users extends Component {

  constructor(props) {
    super(props);
    this.users = props.users;
    this.count = props.count;
  }

  render() {
    return (
    <div></div>
    )
  }
}

export default Users;
