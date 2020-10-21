import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showInnerCard: false}
        this.cardClicked = this.cardClicked.bind(this);
    }
    render() {
        let innerCard = <div className="innerCard">
                            <i>Posted by: {this.props.item.user}</i>
                            <p>Karma: {this.props.item.karma}</p>
                        </div>;
        if(!this.state.showInnerCard) {
            innerCard = ''
        };

        let className = 'card';

        if(this.props.item.karma.includes('k')){
            className += ' gold';
        }

        return ( 
            <div className={className} onClick={this.cardClicked}>
        <h2>{this.props.item.title}</h2> 
        {innerCard}
        </div>
        );
    }

    cardClicked() {
        this.setState({showInnerCard: !this.state.showInnerCard});
    }
}

export default Item