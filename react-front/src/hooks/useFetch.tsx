import { useState, useEffect } from "react";
import axios from "axios";
import { LatLngExpression } from "leaflet";

const useFetch = ({ latLng }: { latLng: LatLngExpression }) => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://api.radar.io/v1/geocode/reverse?coordinates=${latLng}&layers=address`,
        headers: {
            'Authorization': import.meta.env.VITE_RADAR_API_KEY as string,
        },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            console.log('OPTIONS: ', options);
            const response = await axios.request(options);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
            setError(error);
            alert('There was an error fetching the data. Please try again later.')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [latLng]);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;