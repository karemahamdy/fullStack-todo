import AddToDo from "@/components/AddToDo";
import { TodoTable } from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default  function Home() {
const {userId} = auth();

  return (
    <div className="container font-sans min-h-screen p-4 ">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
        <AddToDo userId={userId} />
        <TodoTable/>
    </main>
    </div>
  );
}
