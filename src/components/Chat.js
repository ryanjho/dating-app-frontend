import React, { Component } from 'react'
import usersService from '../services/usersService';
import moment from 'moment';

export class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageInput: '',
            selectedUser: {},
            messages: []
        }
        this.messsageRef = React.createRef();
    }
    selectUser = (event) => {
        const id = event.currentTarget.getAttribute('a-key');
        const selectedUser = this.state.messages.find((message) => {
            if (message._id === id) {
                return message
            }
        })
        this.setState({
            selectedUser: selectedUser,
        });
    } 
    getConversations = async () => {
        console.log('getting convo update');
        const formattedMessages = await usersService.getAllMessages(this.props.currentUser._id);
        this.setState({
            messages: formattedMessages,
        })
        if (Object.keys(this.state.selectedUser).length !== 0) {
            const selectedUser = this.state.messages.find((message) => {
                if (message._id === this.state.selectedUser._id) {
                    return message
                }
            })
            this.setState({
                selectedUser: selectedUser,
            });
            
        }
    }
    handleFormChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }
    
    handleFormSubmit = async(event) => {
        let now = moment().format('MMMM Do YYYY, h:mm:ss a');;
        if (this.state.messageInput === '') return;
        const newMessage = {
            user_id: this.props.currentUser._id,
            content: this.state.messageInput,
            created_at: now
        }
        let chatRoomId = this.state.selectedUser._id;
        const currentChatRoom = await usersService.getCurrentChatRoom(chatRoomId);
        currentChatRoom.messages.push(newMessage);
        delete currentChatRoom['_id'];
        console.log(currentChatRoom);
        const newChatRoom = await usersService.sendMessage(chatRoomId, currentChatRoom);
        console.log('new chat room');
        console.log(newChatRoom);
        this.setState({
            messageInput: ''
        })
    }
    scrollToBottom = () => {
        if(Object.keys(this.state.selectedUser).length > 0) {
            this.messageRef.scrollTop = this.messageRef.scrollHeight;
        }
      }
    componentDidMount() {
        setInterval(() => this.getConversations(), 2000);
        setInterval(() => this.scrollToBottom(), 10000);
    }
    componentDidUpdate() {
        // this.scrollToBottom();
    }

    render() {
        return (
            <React.Fragment>
                <div id="chat-container">
	                <div className="sidebar">
                        {this.state.messages.length == 0 ? '' :
                            this.state.messages.map((message, index) => {
                                return(
                                    <div a-key={message._id} className={this.state.selectedBlock === message._id ? "user-block selected-block" : "user-block"} key={message.users[1]} onClick={this.selectUser}>
                                        <img className="chat-img" src={message.image} alt="" />
                                        <div>
                                            <h2>{message.userName}</h2>
                                        </div>
                                    </div>
                                    )
                                })
                            }
	                </div>
                    {Object.keys(this.state.selectedUser).length === 0 ? '' :
                    <main>
                        <header>
                        <img className="chat-img" src={this.state.selectedUser.image} alt="" />
                        <div>
                            <h2>Chat with {this.state.selectedUser.userName}</h2>
                        </div>
                        
                    </header>
                    <div id="chat-box" >
                    <ul id="chat" ref={el => this.messageRef = el}>
                        {this.state.selectedUser.messages.length === 0 ? 
                            <h2 className="no-msg">No messages here, don't be shy!</h2>
                            : ''}
                            {this.state.selectedUser.messages.map((message, index) => {
                                    return(
                                        <li className={message.user_id === this.props.currentUser._id ? 'me' : 'you'}>
                                        <div class="entete">
                                            <h3>{message.created_at}</h3>
                                        </div>
                                            <div className="message">
                                                {message.content}
                                            </div>
                                        </li>
                                        )
                                }
                            )}
                    </ul>
                    </div>
                    <footer>
                        <textarea id="messageInput" value={this.state.messageInput} onChange={this.handleFormChange} placeholder="Type your message..."></textarea>
                        <a onClick={this.handleFormSubmit}>Send</a>
                    </footer>
                </main>
            }
            </div>
            </React.Fragment>
        )
    }
}

export default Chat
