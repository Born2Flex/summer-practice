import { Marker, Popup, TileLayer } from "react-leaflet"
import { useState, useRef, useMemo, useCallback } from "react"
import { MapContainer } from "react-leaflet"
import { LatLngExpression } from "leaflet";
import { Button } from "@material-tailwind/react";


function LocationPicker({ center, onSetLocation }: { center: LatLngExpression, onSetLocation: (location: LatLngExpression) => void }) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current as any
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => {
            if (d) {
                const marker = markerRef.current as any
                if (marker != null) {
                    onSetLocation([
                        marker.getLatLng().lat.toFixed(4),
                        marker.getLatLng().lng.toFixed(4)
                    ])
                }
            }
            return !d
        })
    }, [])

    return (
        <section className="w-full h-full lg:max-h-[510px]">
            <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full rounded-xl border-2 border-gray-900">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}>
                    <Popup minWidth={90}>
                        <Button variant='filled' size='sm' onClick={toggleDraggable} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {draggable
                                ? 'Fixate location'
                                : 'Drag'}
                        </Button>
                    </Popup>
                </Marker>
            </MapContainer>
        </section>
    )
}

export default LocationPicker
