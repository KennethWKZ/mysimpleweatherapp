module.exports = {
    setAntipodeCoordinate: function(lat, lon) {
        let latitude = parseFloat(lat);
        latitude = latitude > 0 ? -Math.abs(latitude) : Math.abs(latitude);

        let longitude = parseFloat(lon);
        longitude = longitude > 0 ? longitude - 180 : longitude + 180;
        
        return { antipode_lat: latitude, antipode_lon: longitude };
    }
};