import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export class MatchModal extends Component {
    onClose = (event) => {
        console.log('press');
        this.props.showModal();
    }
    render() {
        return (
            <React.Fragment>
                {!this.props.showMatchModal ? '' :
                    <div className="match-modal">
                        <h2>You're Matched!</h2>
                        <p>You and {this.props.matchModalContent.userName} liked each other.</p>
                        <p>Time to say hello!</p>
                        <img className="modal-liked-img" src={this.props.matchModalContent.image}></img>
                        <div>
                            <Button variant="contained" color="secondary" component={Link} to="/messages" onClick={(e) => this.onClose(e)}>
                            Send Message
                            </Button>
                        </div>
                        <div>
                            <Button variant="outlined" color="primary"
                                onClick={(e) => this.onClose(e)}
                            >
                                Keep Finding
                            </Button>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default MatchModal
