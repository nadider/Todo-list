import React, {Component} from 'react';
import './index.css';

class AddItem extends Component {

    state = {
        label: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    }

    render () {
        return (
            <form
                className="d-flex add-item-form"
                onSubmit={(e) => {this.onSubmit(e)}}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="What needs to be done"
                    onChange={(e) => {this.setState({label: e.target.value})}}
                    value={this.state.label}
                ></input>
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                >
                    Add
                </button>
            </form>
        );
    };
};

export default AddItem;
