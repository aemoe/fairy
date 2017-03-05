"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Link} from 'react-router';
// import {connect} from 'react-redux';
import bg from '../dist/img/bgs.png';
import configureStore from '../store/store.js';

import '../dist/css/reset.css';
import Style from '../dist/css/style.css';

let store = configureStore();

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            count: 0
        };
    }
    clickAddHandler(event) {
        store.dispatch({type: 'INCREMENT'});
        this.setState({
            count: (this.state.count + 1)
        });
    }
    clickDownHandler(event) {
        store.dispatch({type: 'DECREMENT'});
        this.setState({
            count: (this.state.count - 1)
        });
    }
    render() {
        let count = this.state.count;
        return (
            <div>
                <ul className={Style.list}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/404">404</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                </ul>
                <p>Home Page</p>
                <p><img width="300" src={bg}/></p>
                <div>{count}</div>
                <ul>
                    <li>
                        <button onClick={this.clickAddHandler.bind(this)}>+</button>
                    </li>
                    <li>
                        <button onClick={this.clickDownHandler.bind(this)}>-</button>
                    </li>
                </ul>
            </div>
        );
    }
};

// const mapStateToProps = function(store) {
//     return {store: store};
// };
//
// export default connect(mapStateToProps)(App);
export default App;
