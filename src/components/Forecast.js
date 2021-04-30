import React, { useState } from 'react'
import Daily from './Daily'
import Hourly from './Hourly'
import { Tab, Tabs } from '@material-ui/core';

function Forecast(props) {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div style={{ top: "100px" }} >
            <Tabs centered value={tab} onChange={handleChange}>
                <Tab label="Hourly Forecast"/>
                <Tab label="Daily Forecast"/>
            </Tabs>

            {tab === 0 && <Hourly loc={props}/>}
            {tab === 1 && <Daily loc={props}/>}
        </div>
    )
}

export default Forecast
