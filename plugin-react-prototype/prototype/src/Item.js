import React from 'react';

class Item extends React.Component {
    render() {
        return ( 
            <div className="card">
        <h2>{this.props.item.title}</h2> 
        </div>
        );
    }
}

export default Item