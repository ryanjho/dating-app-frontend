import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import usersService from '../services/usersService';

export class Likes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: []
        }
    }
    getLikes = async () => {
        // console.log(this.props.currentUser._id);
        const currentUser = await usersService.getOne(this.props.currentUser._id);
        const likedUserIds = currentUser.likes;
        const likesArray = [];

        for (const id of likedUserIds) {
            const user = await usersService.getOne(id);
            likesArray.push({
                id: user._id,
                username: user.userName,
                image: user.image,
            })
        }
        console.log(likesArray);
        this.setState({
            likes: likesArray
        })
    }
    componentDidMount () {
        this.getLikes();
        console.log('islogin' + this.props.isLogin);
    }
    render() {
        return (
            <React.Fragment>
                <div className="likes-container">
                    {this.state.likes === 0 ? '' : 
                        this.state.likes.map((item, index) => {
                                    return(
                                        <div className="likes-item">
                                            <div>
                                                <img className="likes-img" src={item.image}/>
                                            </div>
                                            <div class="likes-name">
                                                <h3>{item.username}</h3>
                                            </div>
                                        </div>
                                        )
                                }
                            )
                        }
                </div>
            </React.Fragment>
        )
    }
}

export default Likes
