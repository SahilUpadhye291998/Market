import React, { Component } from 'react'

import axios from 'axios'
import Cookies from 'universal-cookie'
import DataTable from 'react-data-table-component';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "productDesc": "",
                    "productPrice": "",
                    "productQuantity": "",
                    "productType": "",
                    "productname": ""
                },
            ],
            customStyles: {
                rows: {
                    style: {
                        minHeight: '72px', // override the row height
                    }
                },
                headCells: {
                    style: {
                        paddingLeft: '8px', // override the cell padding for head cells
                        paddingRight: '8px',
                    },
                },
                cells: {
                    style: {
                        paddingLeft: '8px', // override the cell padding for data cells
                        paddingRight: '8px',
                    },
                },
            },
            columns: [
                {
                    name: 'Name',
                    selector: 'productname',
                    sortable: true,
                },
                {
                    name: 'Description',
                    selector: 'productDesc',
                    sortable: true,
                },
                {
                    name: 'Price',
                    selector: 'productPrice',
                    sortable: true,
                },
                {
                    name: 'Quanitity',
                    selector: 'productQuantity',
                    sortable: true,
                },
                {
                    name: 'Type',
                    selector: 'productType',
                    sortable: true,
                },
            ]
        }
        const cookie = new Cookies();
        const userInfo = cookie.get('supplier');
        if (userInfo == undefined) {
            document.location.href = "http://localhost:3000/login"
        }
    }

    async componentDidMount() {
        const cookie = new Cookies();
        const userInfo = cookie.get('supplier');
        const request = {
            secretUserName: userInfo.secret,
            email: userInfo.email
        }
        const response = await axios.post("http://localhost:5000/api/supplier/readSupplierProduct", request);
        this.setState({ data: response.data.result });
    }

    render() {
        return (
            <div>
                <h1>Prodcuts will be placed here</h1>
                <DataTable data={this.state.data} columns={this.state.columns} customStyles={this.state.customStyles} />
            </div >
        )
    }
}
