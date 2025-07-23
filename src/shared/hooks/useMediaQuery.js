import { ref, onMounted, onUnmounted } from 'vue';

export default function useMediaQuery() {
  const matches = ref(false);
  const query = '(min-width: 1200px)';

  let mediaQuery;

  const updateMatch = () => {
    matches.value = mediaQuery.matches;
  };

  onMounted(() => {
    mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', updateMatch);
    updateMatch();
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateMatch);
  });

  return matches;
}
