import React, { Component } from 'react';

export default class Landing extends Component {
    render() {
        console.log(process.env.REACT_APP_LOGIN)
        return (
            <div>
                <a href={process.env.REACT_APP_LOGIN} >login</a>
            </div>
        );
    }
}