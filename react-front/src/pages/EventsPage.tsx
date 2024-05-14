import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position: LatLngExpression = [51.505, -0.09];

const positions = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.49, -0.05],
] as LatLngExpression[];

export default function EventsPage() {
    return (
        <div className='flex flex-1'>
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
                    {positions.map((position, index) => (
                        <Marker key={index} position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </section>
            <section className='w-1/4 bg-white z-10 shadow-left sha'>

            </section>
        </div>
    );
}