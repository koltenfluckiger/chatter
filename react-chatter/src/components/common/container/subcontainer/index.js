import React, {Component} from 'react';
import {withChildren} from "../../../higher-order-components";
import ClassMapper from "sass-css-modules-class-mapper";

import styles from "./subcontainer.module.css";

class SubContainer extends React.PureComponent {

  constructor(props){
    super(props);
    this.variant = props.variant ? ClassMapper.map(styles, props.variant) : ClassMapper.map(styles, {defaults:"subcontainer"});
  }

  render() {
    return (<div className={this.variant}>{this.props.render}</div>)
  }
}

export default withChildren(SubContainer);
