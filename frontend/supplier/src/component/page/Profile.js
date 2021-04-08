import React, { Component } from 'react'

import axios from 'axios'
import Cookies from 'universal-cookie'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secretUserName: "",
            email: "",
            name: "",
            address: "",
            mobileNumber: "",
            id: ""
        }
        const cookie = new Cookies();
        const userInfo = cookie.get('supplier');
        if (userInfo == undefined) {
            document.location.href = "http://localhost:3000/login"
        }
    }

    async componentDidMount() {
        console.log("Mount is called");
        const cookie = new Cookies();
        const userInfo = cookie.get('supplier');
        const request = {
            secretUserName: userInfo.secret,
            email: userInfo.email,

        };
        const response = await axios.post("http://localhost:5000/api/supplier/readSupplier", request);
        this.setState({
            email: response.data.result.email,
            name: response.data.result.name,
            address: response.data.result.address,
            mobileNumber: response.data.result.mobileNumber,
            id: response.data.result.id,
        });
    }

    async componentDidUpdate() {
        console.log("Update function is called");

    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="card" style={{ width: "50%" }}>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.state.email}</h6>
                        <p className="card-text">{this.state.address}</p>
                        <p className="card-text">{this.state.mobileNumber}</p>
                    </div>
                </div>
            </div>
        )
    }
}
