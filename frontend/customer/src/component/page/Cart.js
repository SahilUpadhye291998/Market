import React, { Component } from 'react'

import axios from 'axios'
import Cookies from 'universal-cookie'

export default class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            result: []
        }
    }

    async componentDidMount() {
        const cookie = new Cookies();
        const userInfo = cookie.get('userInfo');
        let request = {
            secretUserName: userInfo.secret,
            email: userInfo.email
        }
        let response = await axios.post("http://localhost:5000/api/customer/readProductCart", request);
        this.setState({ result: response.data.result });
    }

    checkout = async (event, data) => {
        const cookie = new Cookies();
        const userInfo = cookie.get('userInfo');
        data.productName = data.productname;
        let request = {
            ...data,
            secretUserName: userInfo.secret,
            customerEmail: userInfo.email
        }
        let response = await axios.post("http://localhost:5000/api/customer/addProductToCheckout", request);
        this.setState({ result: response.data.result });
    }

    render() {
        console.log(this.state.result)
        return (
            <div className="row">
                {this.state.result.length > 0 && this.state.result.map(data => {
                    return (
                        <div className="d-flex justify-content-center col-4">
                            <div className="card" style={{ width: "75%" }}>
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-left">{data.productname}</h5>
                                    <p className="card-text d-flex justify-content-left">{data.productDesc}</p>
                                    <p className="card-text d-flex justify-content-left">{data.productPrice}</p>
                                    <p className="card-text d-flex justify-content-left">{data.productQuantity}</p>
                                    <p className="card-text d-flex justify-content-left">{data.productType}</p>
                                    <button className="btn btn-primary mt-3" onClick={(event) => this.checkout(event, data)}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    )
                }) || <h2 className="card-text d-flex justify-content-center">No data to be shown here</h2>}
            </div>
        )
    }
}
