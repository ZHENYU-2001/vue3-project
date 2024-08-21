import { ref, computed } from "vue";
export default function useEditTodo(todosRef) {
  const editRef = ref(null);
  let origin = null;
  const handleEdit = (item) => {
    editRef.value = item;
    origin = item.title;
  };
  const handleBlur = (todo) => {
    editRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    }
  };
  const handleEsc = (item) => {
    editRef.value = null;
    item.title = origin;
  };
  const checkedRef = computed(() => {
    return todosRef.value.filter((it) => !it.completed).length === 0;
  });
  const handleChange = (checked) => {
    todosRef.value.forEach((item) => {
      item.completed = checked;
    });
  };
  return {
    editRef,
    handleEdit,
    handleBlur,
    handleEsc,
    checkedRef,
    handleChange,
  };
}
