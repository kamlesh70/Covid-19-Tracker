import {useMap} from 'react-leaflet';

function ChangeMapView({ center, zoom }) {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  }


export default ChangeMapView;
