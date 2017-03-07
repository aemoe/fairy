"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Link} from 'react-router';
import bg from '../dist/img/bgs.png';

import '../dist/css/reset.css';
import Style from '../dist/css/style.css';

class App extends Component {
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
                <p>There is a home page.</p>
                <p><img width="300" src={bg}/></p>
            </div>
        );
    }
};

export default App;
