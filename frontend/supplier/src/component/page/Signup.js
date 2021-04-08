import React, { Component } from 'react'

import axios from 'axios';
import Cookies from 'universal-cookie'

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "email": "",
            "password": "",
            "mobileNumber": "",
            "secret": "",
            "address": "",
            "isAuthenticated": "",
            "typeOf": "supplier"
        }
    }

    onSubmit = async (event) => {
        // calling for the signup function will be called from there
        event.preventDefault();
        const cookie = new Cookies();
        console.log(this.state)

        const {
            name,
            email,
            address,
            mobileNumber,
            secret,
            typeOf
        } = this.state;

        const initUser = {
            "secretUserName": secret,
            "name": name,
            "email": email,
            "address": address,
            "mobileNumber": mobileNumber,
        }

        const userInfo = await axios.post("http://localhost:5000/api/user/signup", this.state)
        if (userInfo.data.code === 200) {
            cookie.set("userInfo", JSON.stringify(userInfo.data.users));
            let temp = {};
            if (this.state.typeOf === 'supplier') {
                temp = {
                    secretUserName: secret,
                    userOrg: "org2",
                };
            } else {
                temp = {
                    secretUserName: secret,
                    userOrg: "org1",
                };
            }

            let userRegister = await axios.post(`http://localhost:5000/api/${typeOf}/register`, temp)
            if (userRegister.data.status === 200) {

                let blockchainRegister = await axios.post(`http://localhost:5000/api/${typeOf}/signup`, initUser)
                if (blockchainRegister.data.status === 200) {
                    document.location.href = "http://localhost:3000/login"
                }
            } else {
                alert("Please retry");
            }
        } else {
            //SOME THING HERE
        }



    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="card" style={{ width: "50%" }}>
                        <div className="card-header">
                            Signup form
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" />
                                </div>
                                <div className="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" onChange={this.handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label for="mobileNumber">Mobile Number</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="mobileNumber" name="mobileNumber" aria-describedby="emailHelp" placeholder="Enter mobile" />
                                </div>
                                <div className="form-group">
                                    <label for="secret">Secret</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="secret" name="secret" aria-describedby="emailHelp" placeholder="Enter secret" />
                                </div>
                                <div className="form-group">
                                    <label for="typeOf">typeOf</label>
                                    <select onChange={this.handleChange} className="form-control" name="typeOf" id="typeOf" value={this.state.typeOf}>
                                        <option value="supplier">Supplier</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="address" name="address" aria-describedby="emailHelp" placeholder="Enter Address" />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" onChange={this.handleChange} className="form-control" id="password" name="password" placeholder="Password" />
                                </div>
                                <div>
                                    <button className="btn btn-primary m-3" onClick={this.onSubmit}>Submit</button>
                                    <a href="/login" className="btn btn-primary m-3">Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
