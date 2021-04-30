import React from 'react'
import Weather from './components/Weather';

function zipform() {
    const getZip = () => {
        var input = document.getElementById('in').value;
        return input;
    }

    return (
        <div>
            <label>
                Zipcode: 
                <input id='in' type='text'/>
                <input type='submit' onClick={getZip}/>
            </label>
            <Weather zip={getZip}/>
        </div>
    )
}

export default zipform
