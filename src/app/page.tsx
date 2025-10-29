import AddToDo from "@/components/AddToDo";
import { TodoTable } from "@/components/TodoTable";

export default  function Home() {

  // ✅ handle submit

  return (
    <div className="container font-sans grid grid-rows-[20px_1fr_20px]  min-h-screen p-4 ">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
        {/* <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul> */}
        {/* <pre>{JSON.stringify(todos, undefined, 2)}</pre> */}
        <AddToDo />
        <TodoTable/>
    </main>
    </div>
  );
}
