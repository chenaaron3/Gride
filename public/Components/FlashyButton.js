import React from 'react';
import "./FlashyButton.scss"

class LabeledButton extends React.Component
{
    render() {
        return (<a href={this.props.btnhref} className="flashy-link">
            {this.props.txt}
        </a>)
    }
}

export default LabeledButton;
