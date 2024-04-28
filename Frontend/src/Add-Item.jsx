import { useState, useEffect } from 'react'
import React from 'react'
import Navigation from './Navigator.jsx'
import axios from '../node_modules/axios/index'

function Adding() {
    const [items, setItems] = useState([]);

    const fetchAPI = async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/items');
        setItems(response.data.items);
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

    function createItem() {
        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        axios.post('http://127.0.0.1:5000/api/new_item', { 'name': name, 'price': price });
        document.getElementById('id01').style.display = 'none';
        setTimeout(function () {
            window.location.reload();
        }, 100);
    };

    function deleteItem(id) {
        axios.post('http://127.0.0.1:5000/api/delete_item', { 'id': id });
        setTimeout(function () {
            window.location.reload();
        }, 100);
    };

    function editItem(id, key) {
        let tr = document.getElementById(key);
        let name = tr.children[0].innerHTML;
        let price = tr.children[1].innerHTML;
        document.getElementById('id02').style.display = 'inline';
        document.getElementById('newName').value = name;
        document.getElementById('newPrice').value = price;
        document.getElementById('id').value = id;
    }

    function editItemFinalise() {
        let newName = document.getElementById('newName').value;
        let newPrice = document.getElementById('newPrice').value;
        let id = document.getElementById('id').value;
        document.getElementById('id02').style.display = 'none';
        axios.post('http://127.0.0.1:5000/api/edit_item', { 'name': newName, 'price': newPrice, 'id': id });
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

                            <label for='price' className='w3-text-teal'>Price:</label>
                            <input id='price' className='w3-input w3-border' type='number'></input>

                            <br></br>

                            <button className='w3-right w3-button w3-green' onClick={function () { createItem() } }>Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="id02" class="w3-modal">
                <div class="w3-modal-content">
                    <div class="w3-card w3-container w3-light-grey w3-padding-large">
                        <span onClick={function () { document.getElementById('id02').style.display = 'none' }} class="w3-button w3-display-topright">×</span>
                        <h3 className='w3-border-bottom w3-margin-bottom w3-padding'>Add Item</h3>
                        <div>
                            <label for='newName' className='w3-text-teal'>Name:</label>
                            <input id='newName' className='w3-input w3-border'></input>

                            <br></br>

                            <label for='newPrice' className='w3-text-teal'>Price:</label>
                            <input id='newPrice' className='w3-input w3-border' type='number'></input>

                            <br></br>

                            <input id='id' hidden type='number'></input>

                            <button className='w3-right w3-button w3-green' onClick={function () { editItemFinalise() }}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='w3-margin'>
                <table className='w3-table-all w3-white'>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    {
                        items.map((item, index) => {
                            return (
                                <tr key={index} id={index}>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>
                                        <button onClick={function () { deleteItem(item[0]) }} className='w3-button w3-red fa fa-trash w3-margin-right'></button>
                                        <button onClick={function () { editItem(item[0], index) }} className='w3-button w3-yellow fa fa-pencil w3-margin-left'></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>

            <button onClick={function () { document.getElementById('id01').style.display = 'inline' }} className='w3-green w3-right w3-button w3-margin-right w3-margin-left'>+</button>
        </>
    )
}

export default Adding
