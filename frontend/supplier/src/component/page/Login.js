import React, { Component } from 'react'

import axios from 'axios'
import Cookies from 'universal-cookie';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        const cookie = new Cookies();
        cookie.remove('supplier');

    }

    onSubmit = async (event) => {
        // calling for the signup function will be called from there
        event.preventDefault();
        console.log(this.state)
        const cookie = new Cookies();
        const userInfo = await axios.post("http://localhost:5000/api/user/login", this.state)
        if (userInfo.data.code === 200) {
            cookie.set('supplier', userInfo.data.users[0]);
            document.location.href = "/";

        } else {
            alert("Please check the credentials")
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="card" style={{ width: "50%" }}>
                    <div className="card-header">
                        Login form
                </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label for="email">Email address</label>
                                <input type="email" onChange={this.handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password" onChange={this.handleChange} className="form-control" id="password" name="password" placeholder="Password" />
                            </div>
                            <div>
                                <button onClick={this.onSubmit} className="btn btn-primary m-3">Submit</button>
                                <a href="/signup" className="btn btn-primary m-3">Signup</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
