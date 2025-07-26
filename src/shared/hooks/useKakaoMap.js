import { ref } from 'vue';

export function useKakaoMap() {
  const mapInstance = ref(null);
  const markers = ref([]);
  const userPos = { lat: 37.5665, lng: 126.978 };
  let openInfoWindow = null;

  // Kakao Maps SDK 로드
  const loadKakao = () =>
    new Promise((resolve) => {
      if (window.kakao?.maps) return resolve();
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_MAP_KEY}&autoload=false`;
      script.onload = () => kakao.maps.load(resolve);
      document.head.appendChild(script);
    });

  // 사용자 위치 가져오기
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

  // 두 지점 간 거리 (km, haversine)
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

  // 가장 가까운 지점 반환
  const nearest = (lat, lng, list) =>
    list.reduce(
      (near, p) => {
        const d = haversine(lat, lng, p.lat, p.lng);
        return d < near.dist ? { place: p, dist: d } : near;
      },
      {
        place: list[0],
        dist: haversine(lat, lng, list[0]?.lat || 0, list[0]?.lng || 0),
      },
    ).place;

  // 모든 마커 제거
  const clearMarkers = () => {
    markers.value.forEach((m) => m.setMap(null));
    markers.value = [];
    openInfoWindow?.close();
    openInfoWindow = null;
  };

  // Kakao Map 타일 강제 리프레시
  const relayoutMap = () => {
    if (mapInstance.value && window.kakao?.maps) {
      kakao.maps.event.trigger(mapInstance.value, 'resize');
    }
  };

  // 개별 마커 + 인포윈도우 생성
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
    const markerImage = new kakao.maps.MarkerImage(
      `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      new kakao.maps.Size(35, 41),
    );

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.lat, place.lng),
      map: mapInstance.value,
      image: markerImage,
    });

    const infoWindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px 10px; white-space:nowrap;">
                  <strong>${place.name}</strong><br/>
                  <small>${place.address || ''}</small>
                </div>`,
      zIndex: 3,
    });

    // 항상 열려있는 인포윈도우
    if (alwaysOpenInfo) {
      infoWindow.open(mapInstance.value, marker);
      openInfoWindow = infoWindow;
    }

    // Hover 시 열리고 닫히는 인포윈도우
    if (withHover) {
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        openInfoWindow?.close();
        infoWindow.open(mapInstance.value, marker);
        openInfoWindow = infoWindow;
      });
      kakao.maps.event.addListener(marker, 'mouseout', () => {
        if (openInfoWindow === infoWindow) {
          infoWindow.close();
          openInfoWindow = null;
        }
      });
    }

    // 클릭 이벤트
    kakao.maps.event.addListener(marker, 'click', () => onClick?.(place));
    markers.value.push(marker);
  };

  // 지도 초기화
  const initMap = async (container, center = userPos, options = {}) => {
    if (!container) return;
    await loadKakao();
    await getUserLocation();

    mapInstance.value = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 5,
      draggable: options.draggable ?? true,
      scrollwheel: options.scrollwheel ?? true,
    });

    // 초기화 후 타일 리프레시
    setTimeout(relayoutMap, 500);
  };

  // 지도 중심 이동
  const setCenter = (lat, lng) => {
    mapInstance.value?.setCenter(new kakao.maps.LatLng(lat, lng));
  };

  // 여러 마커 그리기 (표시 후 지도 리프레시)
  const drawMarkers = async (places, color, opts = {}) => {
    await loadKakao();
    clearMarkers();
    places.forEach((p) => createMarker({ place: p, color, ...opts }));
    setTimeout(relayoutMap, 300);
  };

  return {
    mapInstance,
    userPos,
    initMap,
    setCenter,
    drawMarkers,
    nearest,
    relayoutMap,
  };
}
