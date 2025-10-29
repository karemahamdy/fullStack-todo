'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TodoFormDialog from "./TodoFormDialog";

export default function AddToDo() {
  return (
    <div className="flex justify-end w-full">
      <TodoFormDialog
        mode="create"
        trigger={
          <Button variant="destructive">
            <Plus className="h-4 w-4" />
            ADD TODO
          </Button>
        }
      />
    </div>
  );
}