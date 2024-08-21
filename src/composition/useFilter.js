import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../utils/todoStorage";
const validHash = ["all", "completed", "active"];
export default function useFilter(todosRef) {
  const visibilityRef = ref("all");
  const onHashChange = () => {
    const hash = location.hash.replace(/#\/?/, "");
    if (validHash.includes(hash)) {
      //有效
      visibilityRef.value = hash;
    } else {
      //无效
      location.hash = "";
      visibilityRef.value = "all";
    }
  };
  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
  });
  onUnmounted(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  const filteredTodosRef = computed(() => {
    return filter(todosRef.value, visibilityRef.value);
  });

  const remainingRef = computed(() => {
    return filter(todosRef.value, "active").length;
  });

  const completedRef = computed(() => {
    return filter(todosRef.value, "completed").length;
  });

  return {
    visibilityRef,
    filteredTodosRef,
    remainingRef,
    completedRef,
  };
}
