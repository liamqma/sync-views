import React, { Component } from 'react';

export default class User extends Component {
    render() {
        return (
            <p>
                {this.props.name}
            </p>
        );
    }
}