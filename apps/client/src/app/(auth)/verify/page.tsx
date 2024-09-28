"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const FormSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Component() {
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    form.setValue("pin", otp.join(""));
  }, [otp, form]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "") {
      const nextElement = inputRefs.current[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        const prevElement = inputRefs.current[index - 1];
        if (prevElement) {
          prevElement.focus();
        }
      } else {
        setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      }
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSuccess(false);
    // Here you would typically make an API call to verify the OTP
    console.log("Verifying OTP:", data.pin);
    setSuccess(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100"
    >
      <Card className="w-[400px] shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-center">
                <FormField
                  control={form.control}
                  name="pin"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2">
                          {otp.map((data, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength={1}
                              value={data}
                              ref={(el) => {
                                inputRefs.current[index] = el;
                              }}
                              onChange={(e) => handleChange(e.target, index)}
                              onKeyDown={(e) => handleBackspace(e, index)}
                              className="w-12 h-14 text-2xl font-bold text-center rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {success && (
                  <div className="flex items-center justify-center mt-2 text-green-500">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <p className="text-sm font-medium">
                      OTP verified successfully!
                    </p>
                  </div>
                )}
              </motion.div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                Verify OTP
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <a href="#" className="text-purple-600 hover:underline font-medium">
              Resend OTP
            </a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
