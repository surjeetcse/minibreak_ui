export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic3VyamVldGNzZSIsImEiOiJjazdvdHc0aG4wY2Z6M2ZvMm12NnhpdWkxIn0.avguSvfhYSvAjaNNUH65WQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/surjeetcse/ck7ou93fi0bqs1io2i65i7xyk',
    scrollZoom: false
    //   center: [-118.135854, 34.119489],
    //   zoom: 10,
    //   interective: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';
    //Add marker
    new mapboxgl.Marker({
      element: el,
      ancherL: 'bottum'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 10
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    });
  });
};
