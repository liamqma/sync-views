import React, { Component } from "react";
import { connect } from "react-redux";

export default connect(state => state)(class extends Component {
    render() {
        return (
            <p>
                {this.props.name}
            </p>
        );
    }
});
