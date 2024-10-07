"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { signUpSchema, emailSchema } from "@/schemas";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { countryCodes } from "@/utils";
import { useDebounceCallback } from "usehooks-ts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [useremail, setUseremail] = useState("");
  const [useremailMessage, setUseremailMessage] = useState("");
  const [isCheckingemail, setIsCheckingemail] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const debounced = useDebounceCallback(setUseremail, 50);

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      countryCode: "+1",
    },
  });

  useEffect(() => {
    const checkusernameunique = async () => {
      const emailValidation = emailSchema.safeParse(useremail);

      if (!emailValidation.success) {
        setUseremailMessage(emailValidation.error.issues[0].message);
        return;
      }
      if (useremail) {
        setIsCheckingemail(true);
        setUseremailMessage("");
      }

      try {
        const response = await axios.get(
          `http://apiv2.verydesi.com/auth/check-unique-email/${useremail}`
        );
        setUseremailMessage(response.data.message);
      } catch (error) {
        setUseremailMessage("Error while checking email");
      } finally {
        setIsCheckingemail(false);
      }
    };
    checkusernameunique();
  }, [useremail]);

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { cnf_password, terms, ...submitData } = data;
      const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
      const res = await fetch("http://apiv2.verydesi.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...submitData, phoneNumber: fullPhoneNumber }),
      });

      const responseData = await res.json();

      if (res.ok) {
        // If signup is successful, sign in the user
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false, // Prevent automatic redirect after sign-in
        });
        toast({
          title: "Success",
          description: "Account created successfully!",
          duration: 5000,
        });
        router.push("/dashboard"); // Redirect to dashboard after signup
      } else {
        // Handle error
        const errorMessage =
          responseData.message || "Something went wrong. Please try again.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
          duration: 5000,
        });
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  return (
    <div className=" bg-gradient-to-br from-purple-100 to-indigo-100 overflow-hidden">
      <div className="p-6">
        <Link href={"/"}>
          <img
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819319/assests/ydvr3eeqwwho5kimj5hk.png"
            }
            alt="Very Desi Logo"
            width={300}
            height={300}
            className="w-[150px] lg:w-[190px]"
          />
        </Link>
      </div>
      <div className="min-h-screen flex justify-center lg:p-0 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center text-gray-800">
                Join Us
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Create your account and start your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => {
                  /* Handle Google sign-up */
                }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Sign up with Google</span>
              </Button>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-gray-700"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="John"
                      className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Doe"
                      className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    onChange={(e) => {
                      debounced(e.target.value);
                    }}
                    placeholder="john.doe@example.com"
                    className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                  {isCheckingemail && <Loader2 className="animate-spin" />}
                  {useremail && (
                    <p
                      className={`text-sm ${
                        useremailMessage === "Email available"
                          ? " text-green-500"
                          : " text-red-500"
                      }`}
                    >
                      {useremailMessage}
                    </p>
                  )}
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Phone number
                  </Label>
                  <div className="flex space-x-2">
                    <Controller
                      name="countryCode"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.code}
                              >
                                <span className="mr-2">{country.flag}</span>
                                {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber")}
                      placeholder="123456789"
                      className="flex-1 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("cnf_password", {
                        required: true,
                        validate: (val) => {
                          const pass = watch("password");
                          if (pass !== val) {
                            return "Password must be the same";
                          }
                        },
                      })}
                      className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.cnf_password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cnf_password.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" {...register("terms")} />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.terms.message}
                    </p>
                  )}
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out"
                  >
                    Create Account
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-center text-sm text-gray-500"
              >
                Let's embark on this exciting journey together!
              </motion.div>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
