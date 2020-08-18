import React, {Component, Fragment} from "react";

import styles from "./loading-screen.module.css";

class Screen extends Component {

  constructor(props){
    super(props);
    this.state = {
      time: 0,
      timeout: 15
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  };

  startTimer(){
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000);
  }

  stopTimer(){
    clearInterval(this.timer);
  }

  componentDidMount(){
    this.startTimer();
  }
  componentWillUnmount(){
    this.stopTimer();
  }

  render() {
    return (<div className={styles.loadingScreenContainer}>
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {this.state.time > this.state.timeout ? (this.stopTimer(), <h3 className={styles.errorText}>Oh no... It looks like the hamsters running this page took a break. Please try again. <a style={{color: "#4C87FC"}} href="/">Home</a></h3>) : <Fragment></Fragment> }
      </div>
      </div>
  )}
}

export default Screen;
