import React from 'react';
import {Loading} from "../../../components/common";
import ClassMapper from "sass-css-modules-class-mapper";
import PropTypes from 'prop-types';

import styles from "./with-loader.module.css";

const withLoader = (Component) => {

  return class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: true
      }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.loading !== state.loading) {
        return {loading: props.loading}
      }
      return null;
    }

    render() {
      return (<Loading.Component loading={this.state.loading}>
        {
          this.state.loading
            ? <div className={ClassMapper.map(styles, {classes: "loader loader-loading"})}>
                <Component {...this.props}/>
              </div>
            : <Component {...this.props}/>
        }
    </Loading.Component>)
    }
  }
}

export default withLoader;
