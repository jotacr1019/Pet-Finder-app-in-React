import React, {useEffect, useState} from 'react';
import Map, {Marker, NavigationControl} from 'react-map-gl';
import { Box, 
    TextField,
    Button, 
    Divider, 
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
// import mapboxgl from 'mapbox-gl'
import { useLocationName } from '../../atoms';
import 'mapbox-gl/dist/mapbox-gl.css';


const mapBoxToken = 'pk.eyJ1Ijoiam90YWoxMDE5IiwiYSI6ImNsbHJnaWFhcTBsbngzZ3M1MmdxeTU1anYifQ.B08-O1rb-4pR05T1y06kJA';

type MapBoxSearchProps = {
    onChange?: (any) => any;
};

export function Mapbox(props: MapBoxSearchProps) {
    const { onChange } = props;

    const [transitiveQuery, setTransitiveQuery] = useState('');
    const [queryValues, setQueryValues] = useState([]);
    const [searchEmpty, setSearchEmpty] = useState("");

    const [displayList, setDisplayList] = useState('none');

    const [latLng, setLatLng] = useState({lat: 10.06666, lng: -84.30827});

    const [viewState, setViewState] = useState({
        longitude: latLng.lng,
        latitude: latLng.lat,
        zoom: 7
    })

    const handleSearch = async (e)=>{
        e.preventDefault();
        const query = transitiveQuery;
        setSearchEmpty(query);

        const response = await fetch(
            'https://api.mapbox.com/search/searchbox/v1/suggest?q=' + query + '?&session_token=2&limit=4&country=CR&access_token=' + mapBoxToken
        );
        const mapboxData = await response.json();

        setDisplayList('initial');
        setQueryValues(mapboxData.suggestions);
    }

    const handleClickListItem = async (id) => {
        setDisplayList('none');

        const response = await fetch(
            'https://api.mapbox.com/search/searchbox/v1/retrieve/' + id + '?&session_token=2&access_token=' + mapBoxToken
        );
        const locationData = await response.json();

        const lat = locationData.features[0].geometry.coordinates[1];
        const lng = locationData.features[0].geometry.coordinates[0];
        const name = locationData.features[0].properties.name
        setLatLng({lat, lng});

        if (onChange) {
            onChange({
                query: name,
                coords: {lat, lng}
            });
        }
    }

    const handleDragEnd = async (e) => {
        const lat = e.lngLat.lat
        const lng = e.lngLat.lng
        setLatLng({lat, lng})

        const response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/reverse?longitude=${lng}&latitude=${lat}&limit=1&access_token=${mapBoxToken}`
        )
        const locationData = await response.json();

        const newLat = locationData.features[0].geometry.coordinates[1];
        const newLng = locationData.features[0].geometry.coordinates[0];
        const name = locationData.features[0].properties.name

        if (onChange) {
            onChange({
                query: name,
                coords: { newLat, newLng }
            });
        }
    }

    const handleMapClick = (e) => {
        e.preventDefault();
        setDisplayList('none');
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setTransitiveQuery(e.target.value);
    }

    return (
        <Box    sx={{ 
                    width: {xs: '100%'}, 
                    height: {xs: '65vh', md: '72vh', lg: '75vh'},
                    marginBottom: '15px',
                    borderRadius: '6px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' 
                }}>
            <Map
                mapboxAccessToken={mapBoxToken}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{
                    width: '100%', 
                    height: '100%',
                    borderRadius: '6px',
                }}
                onClick={handleMapClick}
                mapStyle="mapbox://styles/mapbox/streets-v9" >
                <Marker longitude={latLng.lng} 
                        latitude={latLng.lat} 
                        anchor="bottom" 
                        draggable={true}
                        style={{
                            width:  window.innerWidth < 768 ? '70px' : window.innerWidth < 1024 ? '78px' : '78px',
                                height: '60px'
                            }} 
                        onDragEnd={handleDragEnd} >
                    <Box    component="img"
                            style={{width: '100%', height: '100%'}} 
                            src="../src/assets/dogMarker2.png"
                            alt="marker" >
                    </Box>
                </Marker>
                <NavigationControl 
                                showCompass={false}
                                showZoom={true}
                />
                <Box   sx={{
                            marginTop: '4px',
                            marginLeft: '4px',
                            position: 'absolute',
                            width: {xs: '70%'}, 
                            maxWidth: '400px',
                            borderRadius: '6px',
                            backdropFilter: 'brightness(0.3)',
                        }} >
                    <TextField
                            id="location-search"
                            placeholder="Busqueda"
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <Button onClick={handleSearch} 
                                                type="submit"
                                                sx={{ backgroundColor: 'transparent',
                                                    minWidth: '0px',
                                                    width: '0px',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'transparent'
                                                    } 
                                                }} >
                                            <SearchIcon />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '.MuiInputBase-root': {
                                    paddingRight: '10px',
                                    gap: '10px',
                                    color: 'white'
                                },
                                width: '100%'
                            }}
                    />
                    <List   sx={{ 
                                display: displayList,
                                width: '100%', 
                                maxWidth: 360
                            }}>
                        {queryValues.length === 0
                            ? <ListItem sx={{ 
                                            padding: 1,
                                            minHeight: '70px',
                                            backgroundColor: '#b0c4de',
                                        }} >
                                <ListItemText primary={`La busqueda "${searchEmpty}" no obtuvo resultados`} />
                            </ListItem> 
                            : queryValues.map((item, index) => (
                                <div key={index}>    
                                    <ListItem   sx={{ 
                                                    padding: '6px 8px',
                                                    minHeight: '70px',
                                                    backgroundColor: '#b0c4de',
                                                }} >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PlaceTwoToneIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <Box    sx={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }} >
                                            <Button sx={{ margin: '0px', 
                                                        padding: '0px',
                                                        fontSize: {xs: '0.6rem', sm: '0.7rem'},
                                                        textAlign: 'left',
                                                        "&:hover": {backgroundColor: "transparent"}
                                                    }}
                                                    onClick={() => handleClickListItem(item.mapbox_id)}
                                                    disableRipple 
                                                    disableFocusRipple >
                                                <ListItemText 
                                                            sx={{   
                                                                textAlign: 'left', 
                                                                '.MuiTypography-root': {
                                                                    fontSize: {xs: '0.7rem', sm: '0.9rem', md: '1.1rem'},
                                                                }
                                                            }} 
                                                            primary={item.name} 
                                                />
                                            </Button>
                                            <ListItemText 
                                                        sx={{
                                                            textAlign: 'left',
                                                            '.MuiTypography-root': {
                                                                fontSize: {xs: '0.7rem', md: '0.8rem', lg: '0.9rem'},
                                                            }
                                                        }} 
                                                        secondary={item.place_formatted} 
                                            />
                                        </Box>
                                    </ListItem>
                                    {index !== queryValues.length - 1 ? <Divider sx={{ color: 'white', backgroundColor: 'white' }}/> : null}
                                </div>
                            ))
                        }
                    </List>
                </Box>
            </Map>
        </Box>
    );
}