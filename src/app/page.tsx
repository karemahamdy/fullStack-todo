import AddToDo from "@/components/AddToDo";

export default  function Home() {

  // ✅ handle submit

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Welcome to Next.js!</h1>
        {/* <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul> */}
        {/* <pre>{JSON.stringify(todos, undefined, 2)}</pre> */}
        <AddToDo/>
    </main>
    </div>
  );
}
