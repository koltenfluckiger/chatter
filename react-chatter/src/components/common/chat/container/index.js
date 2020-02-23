import React, {Component} from 'react';
import {withChildren} from "../../../higher-order-components";

import styles from "./container.module.css";

class Container extends React.PureComponent {

  render() {
    const {render} = this.props;
    return (
    <div className={styles.container}>{render}</div>
    )
  }
}

export default withChildren(Container);
