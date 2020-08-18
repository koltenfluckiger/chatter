import React, {Component} from 'react';
import {UserContext} from '../../contexts';
import {withSocketContext, withLoader} from "../higher-order-components";
import {Chat, Container, Prompt} from "../common";

import "./index.css";

const LoadingChat = withLoader(Chat)

class App extends Component {

    constructor(props) {
        super(props);

        this.setUserName = (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            this.setState({username: username})
        }

        this.state = {
            messages: [],
            loading: true,
            username: null,
            typing: null,
            count: 0,
            setUserName: this.setUserName
        }
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }


    scrollToBottom(){
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    generateRandomKey = () => {
        const key = Math.floor(Math.random() * 10000);
        return key;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      if (this.state.username !== prevState.username) {
        this.scrollToBottom();
      }
    }

    componentDidMount() {
        var self = this;

        const socket = this.props.socket;

        socket.emit("load");

        socket.on("users", data => {
            self.setState({users: data});
        })

        socket.on("messages", data => {
            self.setState({messages: data, loading: false});
        })

        socket.on("message", data => {
            self.setState({messages: data});
        })

        socket.on("onChange", data => {
            self.setState({typing: data.username});
        })

        socket.on("onBlur", data => {
            self.setState({typing: null});
        })
    }

    render() {
        const {messages, username, typing, loading, setUserName} = this.state;
        if (username === null){
            return (
                <UserContext.Provider value={setUserName}>
                <Prompt>
                </Prompt>
                </UserContext.Provider>
            )
        }

        return (<UserContext.Provider value={username}>
            <Container>
                <Container.SubContainer variant={{
                        classes: "subcontainer center"
                    }}>
                    <h1>Messages</h1>
                    <LoadingChat>
                        {
                            messages.map(
                                message => message.username !== username
                                ? <Chat.Message key={this.generateRandomKey()} text={message.content} username={message.username} incoming="incoming"/>
                                : <Chat.Message key={this.generateRandomKey()} text={message.content} username={message.username} outgoing="outgoing"/>)
                        }
                        <div style={{
                                float: "left",
                                clear: "both"
                            }} ref={(el) => {
                                this.messagesEnd = el;
                            }}></div>
                    </LoadingChat>
                    <Chat.Typing username={typing}/>
                    <Chat.Entry/>
                </Container.SubContainer>
            </Container>
        </UserContext.Provider>)
    }
}

export default withSocketContext(App);
