import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Map, {Marker, NavigationControl} from 'react-map-gl';
import { Box,
    Container,
    TextField,
    Button, 
    Divider, 
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ThemeProvider,
    Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import { mapboxTheme } from './themes';
import 'mapbox-gl/dist/mapbox-gl.css';


const mapBoxToken = "pk.eyJ1Ijoiam90YTEwIiwiYSI6ImNsajR0d2xqdzA0d3QzZG52bjJpcWJnOXAifQ.K29xndPwRQ9o0lIQnIYqpg";

type MapBoxSearchProps = {
    onChange?: (any) => any;
};

export function Mapbox(props: MapBoxSearchProps) {
    const { onChange } = props;

    const location = useLocation();

    const [transitiveQuery, setTransitiveQuery] = useState('');
    const [queryValues, setQueryValues] = useState([]);
    const [searchEmpty, setSearchEmpty] = useState("");

    const [displayTextField, setDisplayTextField] = useState('none');

    const [displayList, setDisplayList] = useState('none');

    const [latLng, setLatLng] = useState({lat: 10.06666, lng: -84.30827});

    const [viewState, setViewState] = useState({
        longitude: latLng.lng,
        latitude: latLng.lat,
        zoom: 7
    })

    useEffect(() => {
        location.pathname.split('/')[1] === 'create-report' || location.pathname.split('/')[1] === 'edit-report' ? setDisplayTextField('flex') : setDisplayTextField('none');
    }, [location.pathname]);

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
                coords: { newLat: lat, newLng: lng }
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
        <ThemeProvider theme={mapboxTheme}>
            <Container  disableGutters={true} className="mapboxContainer" >
                <Map    mapboxAccessToken={mapBoxToken}
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
                    <NavigationControl showCompass={false} showZoom={true} />
                    <Container className="searchContainer" disableGutters={true} >
                        <TextField
                            id="location-search"
                            placeholder="Busqueda"
                            onChange={handleInputChange}
                            className="searchInput"
                            sx={{ display: displayTextField }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <Button onClick={handleSearch} 
                                                type="submit"
                                                variant="text"
                                                className="searchButton" >
                                            <SearchIcon />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <List className="list"  sx={{ display: displayList }} >
                            {queryValues.length === 0
                                ? <ListItem className="listEmptyItem" >
                                    <ListItemText primary={`La busqueda "${searchEmpty}" no obtuvo resultados`} />
                                </ListItem> 
                                : queryValues.map((item, index) => (
                                    <div key={index}>    
                                        <ListItem className="listItem" >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PlaceTwoToneIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <Container  
                                                        className="itemsContainer" 
                                                        disableGutters={true} >
                                                <Button className="listItemButton"
                                                        onClick={() => handleClickListItem(item.mapbox_id)}
                                                        disableRipple 
                                                        disableFocusRipple >
                                                    <ListItemText 
                                                                className="primaryItemText"
                                                                primary={item.name} 
                                                    />
                                                </Button>
                                                <ListItemText   className="secondaryItemText"
                                                                secondary={item.place_formatted} 
                                                />
                                            </Container>
                                        </ListItem>
                                        {index !== queryValues.length - 1 ? <Divider className="divider" /> : null}
                                    </div>
                                ))
                            }
                        </List>
                    </Container>
                </Map>
            </Container>
        </ThemeProvider>
    );
}