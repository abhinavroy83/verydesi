"use client";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import React from "react";
const page = () => {
  const { data: session, status } = useSession();

  if (session) {
    // Access the JWT token
    const accessToken = session.accessToken;
    // console.log("JWT Token: ", accessToken);
  }
  return <div className="mt-36">page</div>;
};

export default page;
