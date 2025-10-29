'use client';
import { PenIcon, TrashIcon } from "lucide-react";
import { deleteTodosByid } from "@/actions/todo.actions";
import React, { useState } from "react";
import Loading from "./Loading";

export function TodoActions({ id }: { id: string }) {
  let [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="text-gray-500 bg-gray-50 p-2 rounded-2xl hover:underline"
        onClick={() => console.log("Edit", id)}
      >
        <PenIcon size={16} />
      </button>
      {loading ? (
        <Loading />
      ) : (
        <button
            onClick={() => {
              setLoading(true);
            deleteTodosByid(id);
          }}
          className="text-red-500 bg-gray-50 p-2 rounded-2xl hover:underline"
        >
          <TrashIcon size={16} />
        </button>
      )}
      
    </div>
  );
}
