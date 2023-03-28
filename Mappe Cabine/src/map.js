function init() {
  var CosaMia = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([11.374660167481162, 45.561148617414396])) //45.561148617414396, 11.374660167481162
  });

  

  var CosaMiaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [CosaMia]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        src: 'img/marker.png',
        scale: 0.4,
      })
    })
  });



  var popup = new ol.Overlay({
    element: document.getElementById('popup'),
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });

  var map = new ol.Map({
    target: 'mappa',
    overlays: [popup],
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      CosaMiaLayer,
      
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([11.374660167481162, 45.561148617414396]),
      zoom: 16
    })
  });

  map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      return feature;
    });
    if (feature) {
      var coordinates = feature.getGeometry().getCoordinates();
      if (feature === CosaMia) {
        document.getElementById('popup-content').innerHTML = 'Il codice identificativo dell area selezionata è AC001E00924.';
      } 
      popup.setPosition(coordinates);
      popup.setVisible(true);
      } else {
      popup.setVisible(false);
    }
  });
}