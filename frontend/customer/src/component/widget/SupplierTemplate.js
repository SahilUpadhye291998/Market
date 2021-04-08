import React, { Component } from 'react'
import Cookies from 'universal-cookie';

export default class SupplierTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    clickedRecord = () => {
        // console.log(this.props)
        const cookies = new Cookies();
        cookies.set("supplierInfo", this.props);
        window.location.replace("http://localhost:3001/products");
    }

    render() {
        return (
            <div onClick={this.clickedRecord}>
                <div className="d-flex justify-content-center m-3">
                    <div className="card" style={{ width: "75%" }}>
                        <div className="card-body">
                            <h5 className="card-title d-flex justify-content-left">{this.props.name}</h5>
                            <p className="card-text d-flex justify-content-left">{this.props.description}</p>
                            <p className="card-text d-flex justify-content-left">{this.props.mobileNumber}</p>
                            <p className="card-text d-flex justify-content-left">{this.props.email}</p>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}
