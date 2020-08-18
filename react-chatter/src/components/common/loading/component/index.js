import React,{Fragment} from "react";
import ClassMapper from "sass-css-modules-class-mapper";
import {withChildren} from "../../../higher-order-components";

import PropTypes from 'prop-types';

import styles from "./loading-component.module.css";

class Component extends React.PureComponent {

  constructor(props) {
    super(props);
    this.variant = ClassMapper.map(styles, {classes: "lds-ellipsis show"});
  }

  render() {
    const {loading, variant} = this.props;
    if (loading){
      return (<div style={{paddingTop: "2rem", textAlign:"center"}}><div className={variant}><div></div><div></div><div></div><div></div></div>{this.props.render}</div>)
    }
    else {
      return (<Fragment>{this.props.render}</Fragment>)
    }
  }
}

export default withChildren(Component);
