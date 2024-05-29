import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '../../pages/EventsMapPage';
import EventCard from '../cards/EventCard';
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
    const iconMapper = (category: string) => {
        switch (category) {
            case 'public':
                return greenIcon;
            case 'paid':
                return yellowIcon;
            case 'private':
                return redIcon;
            default:
                return greenIcon;
        }
    }

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
                // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

                />
                {events.map((event, index) => (
                    <Marker
                        key={index}
                        position={event.coordinates}
                        icon={iconMapper(event.category)}
                    >
                        <Popup
                            closeButton={false}
                            className='w-max'
                        >
                            <EventPopup {...event} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    )
}

export default EventsMap