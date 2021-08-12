let map;

const loadJSON = callback => {
  console.log('Enter...');
  const xObj = new XMLHttpRequest();
  xObj.overrideMimeType('application/json');
  xObj.open('GET', './bm-tijuana-centro.json', true);
  xObj.onreadystatechange = () => {
    if (xObj.readyState === 4 && xObj.status === 200) {
      callback(xObj.responseText);
    }
  };
  xObj.send(null);
};

function initMap() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('map')) {
    console.log('Map: ', params.get('map'));
  }
  loadJSON(response => {
    const markers = JSON.parse(response);

    let CENTER = {};

    const getCenter = response => {
      let allMarkers = [...response.beerpoints, ...response.foodpoints];

      const lats = allMarkers.map(marker => marker.coordinates.lat);

      const lngs = allMarkers.map(marker => marker.coordinates.lng);

      CENTER = {
        lat: (Math.max(...lats) + Math.min(...lats)) / 2,
        lng: (Math.max(...lngs) + Math.min(...lngs)) / 2
      };

      console.log('Center Calulated: ', CENTER);
    };

    getCenter(markers);

    /*
    new google.maps.Marker({
      position: {
        lat: 32.523406,
        lng: -117.028182
      },
      map
    });
    */
    const center = new google.maps.LatLng(CENTER);
    const zoom = 15;

    map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom,
      minZoom: zoom,
      maxZoom: zoom + 2,

      restriction: {
        latLngBounds: {
          north: CENTER.lat + 0.01,
          south: CENTER.lat - 0.01,
          west: CENTER.lng - 0.025,
          east: CENTER.lng + 0.025
        }
      },

      styles: [
        {
          featureType: 'administrative',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.country',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.province',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.province',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#ffffff'
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'all',
          stylers: [
            {
              hue: '#c3dfd9'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'off'
            },
            {
              saturation: '-24'
            }
          ]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fff6e3'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffeab4'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.attraction',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#e09dbc'
            }
          ]
        },
        {
          featureType: 'poi.medical',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#f8b8b3'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#b9e1b4'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffeec0'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              visibility: 'off'
            },
            {
              color: '#ffeec0'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffeec0'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#6f9b9c'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              visibility: 'simplified'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffeec0'
            },
            {
              visibility: 'simplified'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry.stroke',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#9dd2df'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        }
      ],
      streetViewControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      keyboardShortcuts: false
    });

    const request = {
      placeId: 'ChIJGTQPGqpJ2YARYVtkx8pedNI',
      fields: [
        'name',
        'address_component',
        'adr_address',
        'place_id',
        'icon',
        'photo',
        'url',
        'vicinity',
        'business_status'
      ]
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        console.log('Place: ', place);
        console.log('Photo: ', place.photos[0].getUrl());
      } else {
        console.log(status);
      }
    });

    markers.beerpoints.forEach(marker => {
      const beer = new google.maps.Marker({
        position: marker.coordinates,
        title: marker.name,
        icon: {
          path:
            'M50.12,25A23,23,0,1,0,23.3,47.72l3.82,9.38,3.82-9.38A23,23,0,0,0,50.12,25Z',
          fillColor: '#3e2723',
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#fff6e3',
          rotation: 0,
          scale: 0.6,
          anchor: new google.maps.Point(28, 57),
          labelOrigin: new google.maps.Point(27.5, 27)
        },
        map,
        label: {
          text: marker.id.toString(),
          color: '#ffffff',
          fontFamily: 'Lustria',
          fontSize: '17px',
          fontWeight: 'light'
        }
      });

      beer.addListener('click', beer => {
        console.log(beer);
      });
    });

    markers.foodpoints.forEach(marker => {
      new google.maps.Marker({
        position: marker.coordinates,
        icon: {
          path:
            'M50.12,25A23,23,0,1,0,23.3,47.72l3.82,9.38,3.82-9.38A23,23,0,0,0,50.12,25Z',
          fillColor: '#f4a211',
          fillOpacity: 1,
          strokeWeight: 0,
          rotation: 0,
          scale: 0.6,
          anchor: new google.maps.Point(28, 57),
          labelOrigin: new google.maps.Point(27, 26)
        },
        map,
        label: {
          text: marker.id.toString(),
          color: '#ffffff',
          fontFamily: 'Lustria',
          fontSize: '17px',
          fontWeight: 'light'
        }
      });
    });
  });
}
