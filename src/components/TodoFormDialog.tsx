'use client';
import { createTodo, updateTodo } from "@/actions/todo.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSnack } from "@/components/ui/Snack";
import { Textarea } from "@/components/ui/textarea";
import formSchema from "@/validations/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface TodoFormDialogProps {
  mode: 'create' | 'edit';
  trigger: React.ReactNode;
  todo?: {
    id: string;
    title: string;
    body: string;
    completed: boolean;
    user_id: string;
  };
}

export default function TodoFormDialog({ mode, trigger, todo }: TodoFormDialogProps) {
  const [open, setOpen] = useState(false);
  const snack = useSnack();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      completed: false

    },
  });

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);

    // Reset form with appropriate values when opening
    if (isOpen) {
      if (mode === 'edit' && todo) {
        form.reset({
          title: todo.title,
          body: todo.body,
          completed: todo.completed
        });
      } else {
        form.reset({
          title: "",
          body: "",
          completed: false,

        });
      }
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (mode === 'create') {
        await createTodo({
          title: data.title,
          body: data.body,
          completed: data.completed,

        });
        console.log(data);

        snack.show("Todo created", "success");
      } else {
        await updateTodo(todo!.id, data.title, data.body, data.completed);
        console.log(data);

        snack.show("Todo updated", "success");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      snack.show(`Failed to ${mode} todo`, "error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add TODO' : 'Edit TODO'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Write a todo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Completed</FormLabel>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  {mode === 'create' ? 'Create' : 'Save changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}