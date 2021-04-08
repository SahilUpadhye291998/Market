import React, { Component } from 'react'

export default class Navigation extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">CUSTOMER</a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/cart">Cart</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/wishlist">WishList</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/supplier">Supplier</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/products">Add Product</a>
                                </li>
                                <li className="nav-item d-flex justify-content-right">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </ul>
                        </div>
                    </nav >
                </div>
            </div>


        )
    }
}
