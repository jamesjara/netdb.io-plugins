'use strict'

function mapPlugin(data){

    mapboxgl.accessToken = 'pk.eyJ1IjoiZmFmYWJhIiwiYSI6ImNpeWpwMzd3ZDAwMDMycXM3YXdlZ3licHEifQ.XJU54ySPMKfOLLK8qo2QFA' //public key - mapbox

    var popup = '',
        div = '',
        info = '',
        lat = '',
        lon = ''

    var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: data.length > 1 ? 6: 15
        })

    // radio
    var layerList = document.getElementById('menu'),
        inputs = layerList.getElementsByTagName('input')

    for (var i = 0; i < inputs.length; i++)
        inputs[i].onclick = switchLayer

    for (row of data) {
        lon = row.location_longitude,
        lat = row.location_latitude,
        info = `${row.ip} / ${row.hostname}`
        popup = new mapboxgl.Popup({offset: 39})
                .setText( info )
        div = document.createElement('div')
        div.id = 'marker'

        new mapboxgl.Marker(div, {offset:[-25, -50]})
            .setLngLat([lon,lat])
            .setPopup(popup)
            .addTo(map)
    }

    map.setCenter([lon, lat])

    function switchLayer(layer)
    {
        var layerId = layer.target.id
        map.setStyle(`mapbox://styles/mapbox/${layerId}-v9`)
    }
}