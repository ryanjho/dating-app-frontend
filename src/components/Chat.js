import React, { Component } from 'react'
import usersService from '../services/usersService';
import messageService from '../services/messageService';

export class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageInput: '',
            selectedUser: {},
            messages: []
        }
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
        //     selectedBlock: id
        });
    } 
    getConversations = async () => {
        const formattedMessages = await usersService.getAllMessages();
        this.setState({
            messages: formattedMessages,
        })
    }
    handleFormChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleFormSubmit = async(event) => {
        let now = new Date;
        const newMessage = {
            user_id: this.props.currentUser._id,
            content: this.state.messageInput,
            created_at: now
        }
        let chatRoomId = this.state.selectedUser._id;
        const currentChatRoom = await usersService.getCurrentChatRoom(chatRoomId);
        currentChatRoom.messages.push(newMessage);
        console.log(currentChatRoom);
        // const newChatRoom = await usersService.sendMessage(chatRoomId, currentChatRoom);
        // console.log('new chat room');
        // console.log(newChatRoom);
        this.setState({
            messageInput: ''
        })
    }
    componentDidMount() {
        this.getConversations();
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
                    <ul id="chat">
                        {this.state.selectedUser.messages.length === 0 ? 
                            <h2 className="no-msg">No messages here, don't be shy!</h2>
                            : ''}
                            {this.state.selectedUser.messages.map((message, index) => {
                                if(message.user_ID === '5f2614e068b2e523a97066da') {
                                    return(
                                        <li className="me">
                                        <div class="entete">
                                            <h3>{message.time}</h3>
                                        </div>
                                        <div className="message">
                                                {message.content}
                                        </div>
                                        </li>
                                        )
                                } else {
                                    return(
                                        <li className="you">
                                        <div class="entete">
                                            <h3>{message.time}</h3>
                                        </div>
                                        <div className="message">
                                                {message.content}
                                        </div>
                                        </li>
                                    )
                                }
                                }
                            )}
                            
                    </ul>
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
