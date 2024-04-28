import { useState, useEffect, createElement } from 'react'
import React from 'react'
import Navigation from './Navigator.jsx'
import axios from '../node_modules/axios/index'

function RecentBills() {
    const [bills, setBills] = useState([]);

    const fetchAPI = async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/recent_bills');
        console.table(response.data);
        setBills(response.data);
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    function appendElement(parent, child) {
        parent.appendChild(child);
    };

    function createElement(element) {
        let htmlElement = document.createElement(element);
        return htmlElement;
    };

    function billDetails(billNo) {
        document.getElementById('bills').style.display = 'none';
        document.getElementById('mainDiv').className = 'w3-margin';
        document.getElementById('filter').style.display = 'none';
        const table = document.getElementById('table');

        table.className = 'w3-table-all';

        let track = 0;
        bills.map((bill, index) => {
            if (billNo == bill['details']['id']) {
                bill['itemsList'].map((item, newIndex) => {
                    let tr = createElement('tr');

                    let tdItem = createElement('td');
                    let tdPrice = createElement('td');
                    let tdQuantity = createElement('td');
                    let tdTotal = createElement('td');

                    tdItem.innerHTML = item['item'];
                    tdPrice.innerHTML = item['price'];
                    tdQuantity.innerHTML = item['quantity'];
                    tdTotal.innerHTML = Number(item['price']) * Number(item['quantity']);

                    track += Number(item['price']) * Number(item['quantity']);

                    appendElement(tr, tdItem);
                    appendElement(tr, tdPrice);
                    appendElement(tr, tdQuantity);
                    appendElement(tr, tdTotal);

                    appendElement(table, tr);
                });
            }
        });

        let totalPrice = document.getElementById('totalPrice');
        totalPrice.innerHTML = track;
    }

    function myFunction() {
        console.log('yes');
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        console.log(filter);
        ul = document.getElementById("bills");
        li = ul.children;
        for (i = 0; i < li.length; i++) {
            txtValue = li[i].children[0].innerHTML;
            console.log(txtValue)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    return (
        <>
            <Navigation />

            <div className='w3-margin' id='filter'>
                <input class="w3-input w3-border w3-padding" type="text" placeholder="Search for names.." id="myInput" onChange={myFunction}></input>
            </div>

            <div id='bills'>
                {
                    bills.map((bill, index) => {
                        return (
                            <div className='w3-card w3-padding w3-margin w3-white' key={index} onClick={function () { billDetails(bill['details']['id']) }}>
                                <h2>{bill['details']['name']}</h2>
                                <h4>
                                    Created at : <b> {bill['details']['createdAt']} </b>
                                </h4>
                                <h5>
                                    Contact: <i> {bill['details']['phone']}</i>
                                </h5>
                            </div>
                        )
                    })
                }
            </div>

            <div id='billDetails'>
                <div className='w3-margin w3-hide' id='mainDiv'>
                    <table className='w3-table-all' id='table'>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </table>
                    <div className='w3-margin-top w3-container w3-center w3-center w3-card w3-half w3-white'>
                        <h4>
                            <i> Total price: <b id='totalPrice'></b> </i>
                        </h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentBills
