import { LatLngExpression } from "leaflet";
import { useReverseGeocode } from "./useApiQueries";

const useFetch = ({ latLng }: { latLng: LatLngExpression }) => {
    const { data, isLoading, error, refetch } = useReverseGeocode(latLng);

    return { 
        data: data || [], 
        isLoading, 
        error, 
        refetch 
    };
}

export default useFetch;