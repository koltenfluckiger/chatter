import React, {Component} from 'react';
import {withChildren} from "../../higher-order-components";
import ClassMapper from "sass-css-modules-class-mapper";
import SubContainer from "./subcontainer";

import styles from "./container.module.css";

const Container = withChildren(class extends React.PureComponent {

  constructor(props){
    super(props);
  }

  render() {
    return (<div className={styles.container}>{this.props.render}</div>)
  }
})
Container.SubContainer = SubContainer;
export default Container;
