import React, {Component} from "react";

const withChildren = (ParentComponent) => {
  return class extends Component {

    constructor(props){
      super(props);
      this.parseChildren = this.parseChildren.bind(this);;
    }

    parseChildren(){
      return React.Children.count(this.props.children) > 1
        ? React.Children.map(this.props.children, (child) => {
          return child
        })
        : this.props.children
    };

    render() {
      const {parseChildren} = this;
      const children = parseChildren();
      return (<ParentComponent render={children} {...this.props}></ParentComponent>)
    }
  }
}

export default withChildren;
