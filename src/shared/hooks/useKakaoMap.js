import { ref } from 'vue';

export function useKakaoMap() {
  const mapInstance = ref(null);
  const markers = ref([]);
  const userPos = { lat: 37.5665, lng: 126.978 };
  let openInfoWindow = null;

  const loadKakao = () =>
    new Promise((resolve) => {
      if (window.kakao?.maps) return resolve();
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_MAP_KEY}&libraries=services&autoload=false`;
      script.onload = () => window.kakao.maps.load(resolve);
      document.head.appendChild(script);
    });

  const getUserLocation = () =>
    new Promise((res) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userPos.lat = pos.coords.latitude;
          userPos.lng = pos.coords.longitude;
          res();
        },
        () => res(),
        { enableHighAccuracy: true, timeout: 5000 },
      );
    });

  const haversine = (lat1, lng1, lat2, lng2) => {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    return (
      R *
      2 *
      Math.asin(
        Math.sqrt(
          Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
              Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) ** 2,
        ),
      )
    );
  };

  const nearest = (lat, lng, list) =>
    list.reduce(
      (near, p) => {
        const d = haversine(lat, lng, p.lat, p.lng);
        return d < near.dist ? { place: p, dist: d } : near;
      },
      {
        place: list[0],
        dist: list[0]
          ? haversine(lat, lng, list[0].lat, list[0].lng)
          : Infinity,
      },
    ).place;

  const clearMarkers = () => {
    markers.value.forEach((m) => m.setMap(null));
    markers.value = [];
    openInfoWindow?.close();
    openInfoWindow = null;
  };

  const relayoutMap = () => {
    if (mapInstance.value && window.kakao?.maps) {
      window.kakao.maps.event.trigger(mapInstance.value, 'resize');
    }
  };

  const createMarker = ({
    place,
    color,
    alwaysOpenInfo,
    onClick,
    withHover,
  }) => {
    const svg = `
      <svg width="35" height="41" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="${color}"/>
        <circle cx="8" cy="6" r="3" fill="white"/>
      </svg>`;

    const markerImage = new window.kakao.maps.MarkerImage(
      `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      new window.kakao.maps.Size(35, 41),
    );

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(place.lat, place.lng),
      map: mapInstance.value,
      image: markerImage,
    });

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px 10px; white-space:nowrap;">
                  <strong>${place.name}</strong><br/>
                  <small>${place.address || ''}</small>
                </div>`,
      zIndex: 3,
    });

    if (alwaysOpenInfo) {
      infoWindow.open(mapInstance.value, marker);
      openInfoWindow = infoWindow;
    }

    if (withHover) {
      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        openInfoWindow?.close();
        infoWindow.open(mapInstance.value, marker);
        openInfoWindow = infoWindow;
      });
      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        if (openInfoWindow === infoWindow) {
          infoWindow.close();
          openInfoWindow = null;
        }
      });
    }

    window.kakao.maps.event.addListener(marker, 'click', () =>
      onClick?.(place),
    );
    markers.value.push(marker);
  };

  const initMap = async (container, center = userPos, options = {}) => {
    if (!container) return;
    await loadKakao();
    await getUserLocation();

    mapInstance.value = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: 5,
      draggable: options.draggable ?? true,
      scrollwheel: options.scrollwheel ?? true,
    });

    setTimeout(relayoutMap, 500);
  };

  const setCenter = (lat, lng) => {
    mapInstance.value?.setCenter(new window.kakao.maps.LatLng(lat, lng));
  };

  const drawMarkers = async (places, color, opts = {}) => {
    await loadKakao();
    clearMarkers();
    places.forEach((p) => createMarker({ place: p, color, ...opts }));
    setTimeout(relayoutMap, 300);
  };

  const searchPlacesByBank = async (
    bankName,
    radiusKm = 1.5,
    center = userPos,
  ) => {
    await loadKakao();
    return new Promise((resolve) => {
      const places = new window.kakao.maps.services.Places();
      const options = {
        location: new window.kakao.maps.LatLng(center.lat, center.lng),
        radius: Math.floor(radiusKm * 1000),
        size: 15,
      };

      places.keywordSearch(
        bankName,
        (data, status) => {
          if (status !== window.kakao.maps.services.Status.OK) {
            resolve([]);
            return;
          }
          const mapped = data.map((d) => ({
            name: d.place_name,
            lat: Number(d.y),
            lng: Number(d.x),
            address: d.road_address_name || d.address_name,
            category_name: d.category_name,
            category_group_code: d.category_group_code, 
          }));
          resolve(mapped);
        },
        options,
      );
    });
  };

  return {
    mapInstance,
    userPos,
    initMap,
    setCenter,
    drawMarkers,
    nearest,
    relayoutMap,
    haversine,
    searchPlacesByBank,
  };
}
