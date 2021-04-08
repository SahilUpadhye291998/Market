import React, { Component } from 'react'

import axios from 'axios';
import Cookies from 'universal-cookie';

export default class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "productName": "",
            "productDesc": "",
            "productType": "",
            "productPrice": "",
            "productQuantity": "",
        }
        const cookie = new Cookies();
        const userInfo = cookie.get('supplier');
        if (userInfo == undefined) {
            document.location.href = "http://localhost:3000/login"
        }
    }

    onSubmit = async (event) => {
        // calling for the signup function will be called from there
        event.preventDefault();
        let {
            productName,
            productDesc,
            productType,
            productPrice,
            productQuantity,
        } = this.state;

        const cookie = new Cookies();
        const userInfo = cookie.get('supplier');
        console.log(userInfo.secret);
        let productDetails = {
            "secretUserName": userInfo.secret,
            "supplierEmail": userInfo.email,
            "productName": productName,
            "productDesc": productDesc,
            "productType": productType,
            "productPrice": productPrice,
            "productQuantity": productQuantity,
        }
        console.log(productDetails);
        const productInformation = await axios.post("http://localhost:5000/api/supplier/addProductBySupplier", productDetails);
        console.log(productInformation)
        this.setState({
            "productName": "",
            "productDesc": "",
            "productType": "",
            "productPrice": "",
            "productQuantity": ""
        });
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="card" style={{ width: "50%" }}>
                    <div className="card-header">
                        Add Product Form
                </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label for="productName">Name</label>
                                <input type="text" onChange={this.handleChange} className="form-control" id="productName" name="productName" aria-describedby="emailHelp" placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label for="productDesc">Description</label>
                                <input type="text" onChange={this.handleChange} className="form-control" id="productDesc" name="productDesc" placeholder="Product Description" />
                            </div>
                            <div className="form-group">
                                <label for="productType">Type</label>
                                <input type="text" onChange={this.handleChange} className="form-control" id="productType" name="productType" placeholder="Product Type" />
                            </div>
                            <div className="form-group">
                                <label for="productPrice">Price</label>
                                <input type="text" onChange={this.handleChange} className="form-control" id="productPrice" name="productPrice" placeholder="Product Price" />
                            </div>
                            <div className="form-group">
                                <label for="productQuantity">Quantity</label>
                                <input type="text" onChange={this.handleChange} className="form-control" id="productQuantity" name="productQuantity" placeholder="Product Quanitity" />
                            </div>
                            <div>
                                <button onClick={this.onSubmit} className="btn btn-primary m-3">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
