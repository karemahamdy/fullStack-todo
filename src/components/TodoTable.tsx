
import {  getTodos } from "@/actions/todo.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Todo } from "@/interfaces/index";  
import { TodoActions } from "./TodoActions";

export async function TodoTable() {
  const todos: Todo[] = await getTodos();
  return (
    <Table>
      <TableHeader>
        <TableRow className=" border">
          <TableHead>id</TableHead>
          <TableHead>title</TableHead>
          {/* <TableHead>body</TableHead> */}
          <TableHead>status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border ">
        {todos.map((todo) => (
          <TableRow key={todo.id} >
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell className="break-words whitespace-normal w-[50%]">{todo.title}</TableCell>
            {/* <TableCell className="break-words whitespace-normal w-[80%]">{todo.body}</TableCell> */}
            <TableCell className="text-red flex flex-end justify-">{todo.completed ?
             <Badge
          variant="secondary"
          className="bg-green-500 text-white dark:bg-green-600"
              > completed
              </Badge> 
              :
               <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
              >  uncompleted
              </Badge>
            }</TableCell>
            <TableCell className="text-right">
              <TodoActions
                id={todo.id}
                todo={{
                  id: todo.id,
                  title: todo.title,
                  body: todo.body,
                  completed: todo.completed
                  ,user_id: todo.user_id
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
  
    </Table>
  )
}
