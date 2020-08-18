import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from "./seperator.module.css";

class Seperator extends React.PureComponent {

  constructor(props){
    super(props);
    this.inlineStyle = props.inlineStyle;
  }


  render() {
    return (
      <div style={this.inlineStyle} className={styles.seperator}></div>
    )
  }
}

export default Seperator;
