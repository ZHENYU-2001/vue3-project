export default function useDeleteTodo(todosRef) {
  const handleClick = (item) => {
    todosRef.value = todosRef.value.filter((it) => it.id !== item.id);
  };
  const clearAll = () => {
    todosRef.value = todosRef.value.filter((it) => it.completed === false);
  };
  return {
    handleClick,
    clearAll,
  };
}
