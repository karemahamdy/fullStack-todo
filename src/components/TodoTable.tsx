
import {  getTodos } from "@/actions/todo.actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PenIcon, TrashIcon } from "lucide-react"
import { Todo } from "@/interfaces/index";  
import { TodoActions } from "./TodoActions";

export async function TodoTable() {
  const todos: Todo[] = await getTodos();

  // await getTodos();
  return (
    <Table className="">
    
      <TableHeader>
        <TableRow className=" border">
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>title</TableHead>
          <TableHead>body</TableHead>
          <TableHead>status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell className="break-words whitespace-normal w-[80%]">{todo.title}</TableCell>
            <TableCell className="break-words whitespace-normal w-[80%]">{todo.body}</TableCell>
            <TableCell>{todo.completed}</TableCell>
            <TableCell className="text-right">
              <TodoActions id={todo.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
  
    </Table>
  )
}
