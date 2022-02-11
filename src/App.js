import React, { useEffect, useState, useRef } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header'
import Map from './components/Map/Map'
import List from './components/List/List'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import { getPlacesData } from './api'
import testPlaces from './testData/testData'

const App = () => {

    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({lat:0, lng:0})
    const [bounds, setBounds] = useState({})
    const apiCallLimitReached = true

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) => {
            setCoordinates({lat:latitude, lng:longitude})
        })
    },[])

    useEffect(async ()=> {

        if(apiCallLimitReached) {
            setPlaces(testPlaces.data)
            return
        }

        let isMounted = true;

        let data = await getPlacesData(bounds.sw, bounds.ne)
        if(isMounted)
            setPlaces(data.data)
        
        return () => { isMounted = false }    
    }, [coordinates,bounds])

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4} >
                    <List places={places}/>
                </Grid>
                <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;