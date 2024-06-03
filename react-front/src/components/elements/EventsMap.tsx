import { LayersControl, MapContainer, Marker, Popup, LayerGroup, TileLayer, Circle } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ShortEventInterface from '../../interfaces/ShortEventInterface';
import EventPopup from '../cards/EventPopup';
import { useEffect, useState } from 'react';


const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function EventsMap({ events, userLocation }: { events: ShortEventInterface[], userLocation: LatLngExpression }) {

    const publicEvents = events.filter(event => event.availability === 'PUBLIC');
    const paidEvents = events.filter(event => event.availability === 'PAID');
    const privateEvents = events.filter(event => event.availability === 'PRIVATE');

    return (
        <section className='w-3/4 z-0'>
            <MapContainer
                center={userLocation}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                    center={userLocation}
                    pathOptions={{ color: '#058afd' }}
                    fillOpacity={0.8}
                    radius={15}
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Public Events">
                        <LayerGroup>
                            {publicEvents.map((event, index) => (
                                <Marker
                                    key={index}
                                    //position={event.coordinates}
                                    position={[event.location.x, event.location.y]}
                                    icon={greenIcon}
                                >
                                    <Popup
                                        closeButton={false}
                                        className='w-max'
                                    >
                                        <EventPopup {...event} />
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Paid Events">
                        <LayerGroup>
                            {paidEvents.map((event, index) => (
                                <Marker
                                    key={index}
                                    //position={event.coordinates}
                                    position={[event.location.x, event.location.y]}
                                    icon={yellowIcon}
                                >
                                    <Popup
                                        closeButton={false}
                                        className='w-max'
                                    >
                                        <EventPopup {...event} />
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Private Events">
                        <LayerGroup>
                            {privateEvents.map((event, index) => (
                                <Marker
                                    key={index}
                                    //position={event.coordinates}
                                    position={[event.location.x, event.location.y]}
                                    icon={redIcon}
                                >
                                    <Popup
                                        closeButton={false}
                                        className='w-max'
                                    >
                                        <EventPopup {...event} />
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </section>
    )
}

export default EventsMap