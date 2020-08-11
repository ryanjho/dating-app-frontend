import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import usersService from '../services/usersService';

export class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: []
        }
    }
    getNotifications = async () => {
        // console.log(this.props.currentUser._id);
        const currentUser = await usersService.getOne(this.props.currentUser._id);
        // console.log(currentUser.notifications);
        const notifications = [];
        currentUser.notifications.forEach((item) => {
            notifications.push(`You ${item.type} ${item.target.userName}`)
        })
        this.setState({
            notifications: notifications
        })
    }
    componentDidMount () {
        this.getNotifications();
        console.log('islogin' + this.props.isLogin);
    }
    render() {
        return (
            <React.Fragment>
                <div className="notification-container">
                        {this.state.notifications.map((item, index) => {
                                    return(
                                        <div class="notification-item">
                                            <h3>{item}</h3>
                                        </div>
                                        )
                                }
                            )}
                </div>
            </React.Fragment>
        )
    }
}

export default Notifications
