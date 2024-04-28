import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navigation() {

    const navigator = useNavigate();

    function navigate(route) {
        navigator('/' + route)
    }

    return (
        <>
            <div className="w3-margin">
                <div className="w3-bar w3-black">
                    <h4 className="w3-bar-item w3-margin-left">Grocery Managememt app</h4>
                    <p className="w3-bar-item w3-button w3-margin-left" onClick={function () { navigate('Billing') }}>New Bill</p>
                    <p className="w3-bar-item w3-button w3-margin-left" onClick={function () { navigate('Add-Item') }}>New Item</p>
                    <p className="w3-bar-item w3-button w3-margin-left" onClick={function () { navigate('Recent-Bills') }}>Recent Bills</p>
                </div>
            </div>
        </>
    )
}

export default Navigation
