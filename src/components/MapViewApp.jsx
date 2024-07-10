import React from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

export const MapViewApp = () => {
    const { latitude, longitude } = useParams();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
        return <div>Invalid coordinates</div>;
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCsc264Mcj1S3D7iERtDsdgcPKy8Q1qFLM"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat, lng: lon }}
                zoom={13}
            >
                <Marker position={{ lat, lng: lon }} />
            </GoogleMap>
        </LoadScript>
    );
};
