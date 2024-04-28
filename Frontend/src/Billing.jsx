import { useState, useEffect } from 'react'
import React from 'react'
import Navigation from './Navigator.jsx'
import axios from '../node_modules/axios/index'

function Billing() {
    const [items, setItems] = useState([]);

    const fetchAPI = async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/items');
        console.log(response.data.items);
        setItems(response.data.items);
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    const table = document.getElementById('table');

    function appendElement(parent, child) {
        parent.appendChild(child);
    };

    function createElement(element) {
        let htmlElement = document.createElement(element);
        return htmlElement;
    };

    function addRow() {
        let tr = createElement('tr');
        let tdName = createElement('td');
        let tdPrice = createElement('td');
        let tdQuantity = createElement('td');
        let tdTotalPrice = createElement('td');
        appendElement(tr, tdName);
        appendElement(tr, tdPrice);
        appendElement(tr, tdQuantity);
        appendElement(tr, tdTotalPrice);
        appendElement(table, tr);

        var defaultBold = createElement('b');
        defaultBold.innerHTML = 0;
        appendElement(tdPrice, defaultBold);

        var selectName = createElement('select');
        selectName.className = 'w3-input';
        selectName.addEventListener('change', function () {
            let selectedOption = selectName.value;
            var bold = undefined;
            items.map((item) => {
                if (item[1] == selectedOption) {
                    bold = createElement('b');
                    tdPrice.innerHTML = '';
                    bold.innerHTML = Number(item[2]);
                    appendElement(tdPrice, bold);
                }
            });
            tdTotalPrice.children[0].innerHTML = tdPrice.children[0].innerHTML * selectQuantity.value;
        });

        let selectQuantity = createElement('input');
        selectQuantity.className = 'w3-input';
        selectQuantity.type = 'number';
        selectQuantity.value = 1;
        selectQuantity.addEventListener('change', function () {
            tdTotalPrice.children[0].innerHTML = tdPrice.children[0].innerHTML * selectQuantity.value;
        });

        let optionNameDefault = document.createElement('option');
        optionNameDefault.disabled = true;
        optionNameDefault.selected = true;
        optionNameDefault.hidden = true;
        appendElement(selectName, optionNameDefault);
        items.map((item) => {
            let optionName = document.createElement('option');
            optionName.innerHTML = item[1];
            optionName.id = item[0];
            appendElement(selectName, optionName);
            console.log(item[1]);
        });

        appendElement(tdName, selectName);
        appendElement(tdQuantity, selectQuantity);

        let bold = createElement('b');
        appendElement(tdTotalPrice, bold);
        bold.innerHTML = tdPrice.children[0].innerHTML * selectQuantity.value;

        let tdDel = createElement('td');
        let buttonDel = createElement('button');
        buttonDel.className = 'fa fa-trash w3-xlarge w3-button w3-red w3-center';
        appendElement(tdDel, buttonDel);
        appendElement(tr, tdDel);

        buttonDel.addEventListener('click', function () {
            table.removeChild(tr);
        });
    };

    function bill() {
        var totalPrice = document.getElementById('totalPrice');
        var priceTrack = 0;
        for (let child of table.children) {
            if (child.children[3].children[0] != undefined) {
                let price = Number(child.children[3].children[0].innerHTML);
                priceTrack += price;
            }
        }
        console.log(priceTrack);
        totalPrice.innerHTML = ' ' + priceTrack;
    }

    function save() {
        document.getElementById('id01').style.display = 'inline';
    }

    function saveFinalise() {
        let name = document.getElementById('name').value;
        let phoneNumber = document.getElementById('phoneNumber').value;

        let details = { 'name': name, 'phone_number': phoneNumber };
        let dataList = [];
        for (let child of table.children) {
            let dataNode = {};
            if (child.children.length == 5) {
                let select = child.children[0].children[0];
                dataNode['id'] = select.children[select.selectedIndex].id;
                dataNode['quantity'] = child.children[2].children[0].value;
                dataList.push(dataNode);
            }
        }
        console.table(dataList);
        axios.post('http://127.0.0.1:5000/api/save_bill', { 'data_list': dataList, 'details': details });
        setTimeout(function () {
            window.location.reload();
        }, 100);
    }

    return (
        <>
            <Navigation />

            <div id="id01" class="w3-modal">
                <div class="w3-modal-content">
                    <div class="w3-card w3-container w3-light-grey w3-padding-large">
                        <span onClick={function () { document.getElementById('id01').style.display = 'none' }} class="w3-button w3-display-topright">×</span>
                        <h3 className='w3-border-bottom w3-margin-bottom w3-padding'>Add Item</h3>
                        <div>
                            <label for='name' className='w3-text-teal'>Name:</label>
                            <input id='name' className='w3-input w3-border'></input>

                            <br></br>

                            <label for='phoneNumber' className='w3-text-teal'>Phone Number:</label>
                            <input id='phoneNumber' className='w3-input w3-border' type='number'></input>

                            <br></br>

                            <button className='w3-right w3-button w3-green' onClick={saveFinalise}>Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w3-margin' id='main'>
                <table className='w3-table-all w3-white' id='table'>
                    <tr>
                        <th>Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </table>

                <br></br> <br></br>

                <button className='w3-button fa fa-save w3-red w3-xlarge w3-margin-right w3-right' onClick={save}></button>
                <button className='w3-blue w3-button w3-right w3-margin-right w3-margin-left' onClick={bill}>Bill</button>
                <button className='w3-green w3-button w3-right' onClick={addRow}>+</button>
            </div>

            <br></br> <br></br>

            <div className='w3-margin w3-container w3-center w3-center w3-card w3-half w3-white'>
                <h4>
                    <i> Total price: <b id='totalPrice'></b> </i>
                </h4>
            </div>
        </>
    )
}

export default Billing
