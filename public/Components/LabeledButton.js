import React from 'react';
import FlashyButton from "./FlashyButton"
import "./LabeledButton.scss"

class LabeledButton extends React.Component
{
    render() {
        return (<div className="center-container card labeledButton">
            <h1 className="LabeledButtonText">
                {this.props.label}
            </h1>
            <FlashyButton txt={this.props.txt} btnhref={this.props.btnhref}/>
        </div>)
    }
}

export default LabeledButton;
