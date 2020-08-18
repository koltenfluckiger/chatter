import React from 'react';
import {withChildren} from "../../higher-order-components";
import SubContainer from "./subcontainer";

import styles from "./container.module.css";

const Container = withChildren(class extends React.PureComponent {

    render() {
        return (<div className={styles.container}>{this.props.render}</div>)
    }
})

Container.SubContainer = SubContainer;
export default Container;
