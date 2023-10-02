import React from 'react'
import { Layer, Source } from 'react-map-gl'
import type { FeatureCollection } from 'geojson';

const MapBoxRoute = (props: any) => {

    const geojson: FeatureCollection = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: props.coordinates
                }
            }
        ]
    };

    return (
        <Source type="geojson" data={geojson}>
            <Layer
                type="line"
                layout={{ 'line-join': 'round', 'line-cap': 'square' }}
                paint={{ 'line-color': '#0462d4', 'line-width': 4 }}
            />
        </Source>
    )
}

export default MapBoxRoute