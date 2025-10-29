'use client';
import { PenIcon, TrashIcon } from "lucide-react";
import { deleteTodosByid } from "@/actions/todo.actions";
import React, { useState } from "react";
import Loading from "@/components/ui/Loading";
import { useSnack } from "@/components/ui/Snack";

export function TodoActions({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const snack = useSnack();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteTodosByid(id);
      snack.show("Todo deleted", "success");
    } catch (err) {
      console.error(err);
      snack.show("Failed to delete todo", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        className="text-gray-500 bg-gray-50 p-2 rounded-2xl hover:underline"
        onClick={() => console.log("Edit", id)}
      >
        <PenIcon size={16} />
      </button>
      {loading ? (
        <Loading />
      ) : (
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 bg-gray-50 p-2 rounded-2xl hover:underline"
        >
          <TrashIcon size={16} />
        </button>
      )}

    </div>
  );
}
