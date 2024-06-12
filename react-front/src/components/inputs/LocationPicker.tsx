import { Marker, Popup, TileLayer } from "react-leaflet"
import { useState, useRef, useMemo, useCallback } from "react"
import { MapContainer } from "react-leaflet"
import { LatLngExpression } from "leaflet";
import { Button } from "@material-tailwind/react";

//LocationPicker component, displays a map with a draggable marker to pick a location
function LocationPicker({ center, onSetLocation }: { center: LatLngExpression, onSetLocation: (location: LatLngExpression) => void }) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    // event handlers for the draggable marker
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
    // toggles the draggable state of the marker
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => {
            if (d) {
                const marker = markerRef.current as any
                if (marker != null) {
                    onSetLocation([
                        marker.getLatLng().lat.toFixed(10),
                        marker.getLatLng().lng.toFixed(10)
                    ])
                }
            }
            return !d
        })
    }, [])

    return (
        <section className="lg:w-2/5 max-h-[715px]">
            <MapContainer zoom={13} scrollWheelZoom={true} className="h-full w-full rounded-xl border-2 border-gray-900" center={center}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}>
                    <Popup
                        closeButton={false}
                    >
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
