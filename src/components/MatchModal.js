import React, { Component } from 'react'

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
                        Hello I am Modal
                        <button
                            onClick={(e) => this.onClose(e)}
                        >
                            Close
                        </button>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default MatchModal
