import { LayersControl, MapContainer, Marker, Popup, LayerGroup, TileLayer } from 'react-leaflet';
import L, { Circle, FeatureGroup, LatLngExpression, Rectangle, rectangle } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '../../pages/EventsMapPage';
import EventPopup from '../cards/EventPopup';
const position: LatLngExpression = [40.7128, -74.0060];


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

function EventsMap({ events }: { events: Event[] }) {
    // const iconMapper = (category: string) => {
    //     switch (category) {
    //         case 'public':
    //             return greenIcon;
    //         case 'paid':
    //             return yellowIcon;
    //         case 'private':
    //             return redIcon;
    //         default:
    //             return greenIcon;
    //     }
    // }

    const publicEvents = events.filter(event => event.category === 'public');
    const paidEvents = events.filter(event => event.category === 'paid');
    const privateEvents = events.filter(event => event.category === 'private');

    return (
        <section className='w-3/4 z-0'>
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LayersControl position="topright">
                    <LayersControl.Overlay name="Public Events">
                        <LayerGroup>
                            {publicEvents.map((event, index) => (
                                <Marker
                                    key={index}
                                    position={event.coordinates}
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
                                    position={event.coordinates}
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
                    <LayersControl.Overlay name="Private Events">
                        <LayerGroup>
                            {privateEvents.map((event, index) => (
                                <Marker
                                    key={index}
                                    position={event.coordinates}
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