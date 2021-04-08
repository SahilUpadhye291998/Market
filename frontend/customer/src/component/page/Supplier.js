import React, { Component } from 'react'

import axios from 'axios'

import SupplierTemplate from "../widget/SupplierTemplate";

export default class Supplier extends Component {

    constructor(props) {
        super(props)

        this.state = {
            supplier: [
                {
                    name: "sampleSupplier1",
                    email: "supplier@gmail.com",
                    address: "Sample Supplier Address",
                    mobileNumber: "1234569789"
                },
            ],
            email: "",
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:5000/api/user/getSupplier");
        this.setState({ supplier: response.data.users });
    }

    handleChange = ({ target }) => {
        console.log(target)
        this.setState({ [target.name]: target.value });
    };

    render() {
        console.log(this.state)
        const testing = this.state.supplier
            .filter(data => data.email.includes(this.state.email))
            .map((data, id) => {
                return (
                    <SupplierTemplate
                        key={data.name}
                        name={data.name}
                        description={data.address}
                        mobileNumber={data.mobileNumber}
                        email={data.email} />
                )
            });
        return (
            <div>
                <form>
                    <div>
                        <div className="form-group">
                            <div className="d-flex justify-content-center">
                                <input type="text" onChange={this.handleChange} className="form-control input-lg" id="email" name="email" placeholder="Enter email" style={{ width: "75%" }} />
                                <input type="button" className="btn btn-primary" value="Search Supplier" name="search" id="search" />
                            </div>
                        </div>
                    </div>
                </form>
                {testing}
            </div>
        )
    }
}
