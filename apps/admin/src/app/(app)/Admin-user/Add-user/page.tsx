"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import DashboardLayout from "@/components/Layout/Dashboardlayout";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const permissionOptions = [
  { value: "Add-user", label: "Add-user" },
  { value: "post-room", label: "post-room" },
  { value: "post-event", label: "post-event" },
  { value: "post-business", label: "post-business" },
  { value: "area", label: "Area" },
];

export default function AdminForm() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, permissions: selectedPermissions });
  }

  const handlePermissionSelect = (value: string) => {
    if (!selectedPermissions.includes(value)) {
      setSelectedPermissions([...selectedPermissions, value]);
    }
  };

  const handlePermissionRemove = (permission: string) => {
    setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
  };

  return (
    <DashboardLayout>
      <Card className="w-full max-w-4xl mx-auto p-2 mt-10">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the full name of the user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the user's email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Permissions</FormLabel>
                <Select onValueChange={handlePermissionSelect}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select permissions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {permissionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the appropriate permissions for the user.
                </FormDescription>
              </FormItem>
              <div className="flex flex-wrap gap-2">
                {selectedPermissions.map((permission) => (
                  <Badge key={permission} variant="secondary">
                    {permission}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => handlePermissionRemove(permission)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">
                        Remove {permission} permission
                      </span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
