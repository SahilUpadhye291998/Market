
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'

export default class Products extends Component {

    constructor(props) {
        super(props)
        this.state = {
            result: [],
            quantity: ""
        }
    }

    async componentDidMount() {
        // call the api basde on the information of the supplier
        const cookie = new Cookies();
        const supplierInfo = cookie.get('supplierInfo');

        let response = await axios.get(`http://localhost:5000/api/user/getSupplier/${supplierInfo.email}`)
        let secretUserName = response.data.users[0].secret
        const request = {
            secretUserName: secretUserName,
            email: supplierInfo.email
        }
        response = await axios.post("http://localhost:5000/api/supplier/readSupplierProduct", request)
        console.log(response)
        if (response.data.status === 200) {
            console.log(response)
            if (response.data.result !== undefined) {
                this.setState({ result: response.data.result })
            }
        }
    }

    async addProductToWishList(event, data) {
        event.preventDefault()
        const cookie = new Cookies();
        const userInfo = cookie.get('userInfo');
        data.secretUserName = userInfo.secret;
        data.productQuantity = this.state.quantity;
        data.customerEmail = userInfo.email;
        console.log(data)
        const response = await axios.post("http://localhost:5000/api/customer/addProductToWishList", data);
        if (response.data.status === 200) {
            alert("OK! product is added to the wishlist");
        } else {
            alert("Some error has occured")
        }
    }

    async addProductToCart(event, data) {
        event.preventDefault()
        const cookie = new Cookies();
        const userInfo = cookie.get('userInfo');
        data.secretUserName = userInfo.secret;
        data.customerEmail = userInfo.email;
        data.productQuantity = this.state.quantity;
        console.log(data)
        const response = await axios.post("http://localhost:5000/api/customer/addProductToCart", data);
        if (response.data.status === 200) {
            alert("OK! product is added to the wishlist");
        } else {
            alert("Some error has occured")
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        const cookie = new Cookies();
        const supplierInfo = cookie.get('supplierInfo');
        return (
            <div>
                <h1>{supplierInfo.email}'s product</h1>
                {this.state.result.length > 0 && this.state.result.map(data => {
                    return (
                        <div>
                            <div className="d-flex justify-content-center">
                                <div className="card m-3" style={{ width: "75%" }}>
                                    <div className="card-body">
                                        <h5 className="card-title d-flex justify-content-left">{data.productname}</h5>
                                        <p className="card-text d-flex justify-content-left">{data.productDesc}</p>
                                        <p className="card-text d-flex justify-content-left">{data.productPrice}</p>
                                        <input type="text" onChange={this.handleChange} className="form-control d-flex justify-content-left" name="quantity" placeholder="Enter the quantity here" />
                                        <p className="card-text d-flex justify-content-left">{data.productType}</p>
                                        <div className="d-flex justify-content-left">
                                            <input type="button" className="btn btn-primary" value="Add to wishlist" onClick={(event) => this.addProductToWishList(event, data)} />
                                            <input type="button" className="btn btn-primary" value="Add to Cart" onClick={(event) => this.addProductToCart(event, data)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) || <h2 className="card-text d-flex justify-content-center">No data to be shown here</h2>}
            </div>
        )
    }
}
