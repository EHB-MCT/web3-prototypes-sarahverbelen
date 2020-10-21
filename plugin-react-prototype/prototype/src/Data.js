import React from 'react';
import $ from 'jquery';

import Item from './Item';

class Data extends React.Component {
    // getData(function(data) {
    //     // console.log(data);
    //     let list;

    //     for(let element of data) {
    //         console.log(element);
    //     };

    // });

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeData = this.changeData.bind(this);
        this.state = {
            items: []
        }
        this.getData();
    }

    getData() {
        // setstate is not known within the ajax callback, so we have to put this in a different function
        // because the scope of 'this' is also different, we assign this function to a local function before we go into the scope
        let changeData = this.changeData; 
        $.ajax({
            'url': 'http://localhost:8000/all',
            'method': 'GET'
        }).done(function(data) {
            changeData(data); 
        });
    }
    changeData(data) {
        this.setState({items: data});
    }


    render() {
        console.log(this.state.items);
        let items = []; 
        for(let item of this.state.items) { // for all of the items
            // console.log(item);
            items.push(<Item item={item} key={item["_id"]}/>);
        }

        return (
            <div className="data">
                <h1>Data</h1>
                <ul>{items}</ul>
            </div>
        );
    }

}



export default Data;