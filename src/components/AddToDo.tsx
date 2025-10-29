'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox";
import formSchema from "@/validations/todo";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "@/actions/todo.actions";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useSnack } from "./ui/Snack";

export default function AddToDo() {
  const [open, setOpen] = useState(false);
  const snack = useSnack();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", body: "", completed: false },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createTodo({ title: data.title, body: data.body, completed: data.completed });
      snack.show("Todo created", "success");
      setOpen(false); 
      form.reset();
    } catch (err) {
      console.error(err);
      snack.show("Failed to create todo", "error");
    }
  }

  return (
    <>
      <div className="flex justify-end w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>
              <Plus className=" h-4 w-4" />
              ADD PRODUCT
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add TODO</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>title</FormLabel>
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
                        <FormLabel>body</FormLabel>
                        <FormControl>
                          <Textarea placeholder="description" {...field} />
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
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
