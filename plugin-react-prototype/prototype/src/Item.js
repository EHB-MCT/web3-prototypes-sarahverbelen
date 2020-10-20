import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.cardClicked = this.cardClicked.bind(this);
    }
    render() {
        return ( 
            <div className="card" onClick={this.cardClicked}>
        <h2>{this.props.item.title}</h2> 
        </div>
        );
    }

    cardClicked() {
        console.log(this.props.item.title);
    }
}

export default Item