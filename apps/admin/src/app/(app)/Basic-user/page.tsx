"use client";
import Dashboardlayout from "@/Components/Layout/Dashboardlayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [userData, setuserData] = useState<any[]>([]);
  const fetchusers = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.verydesi.com/admin/user/getalluser"
      );
      console.log(res.data);
      setuserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchusers();
  });

  return (
    <Dashboardlayout>
      <div>page</div>
    </Dashboardlayout>
  );
}

export default page;
