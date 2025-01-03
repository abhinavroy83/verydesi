"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Edit2, ChevronDown } from "lucide-react";
import { AreaWithZipCodes, City, SelectedData } from "@myrepo/types";
import DashboardLayout from "@/components/Layout/Dashboardlayout";
import { stateAbbreviations } from "@repo/schemas";
import { any } from "zod";

export default function AllArea(): JSX.Element {
  const [data, setData] = useState<City[]>([]);
  const [filterstate, setfilterstate] = useState<string[]>([]);
  const [Filtercity, setFiltercity] = useState<string[]>([]);
  const [selectedcountry, setSelectedcountry] = useState<string>("");
  const [selectedstate, setSelectedstate] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [uniquestate, setuniquestate] = useState<string[]>([]);
  const [Filteresub, setFiltersub] = useState<string[]>([]);
  const [filterarea, setfilterarea] = useState<AreaWithZipCodes[]>([]);
  const [filterpin, setfilterpin] = useState<string[]>([]);
  const [ismodelopen, setismodalopen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const selcedata: SelectedData = {
    country: selectedcountry,
    state: selectedstate,
    area: selectedCity,
  };

  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://apiv2.verydesi.com/area/getallcities"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.success) {
          setData(result.data);
          const uniquestate = Array.from(
            new Set(result.data.map((item: City) => item.state))
          );
          // setfilterstate(uniquestate);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  const onAddSuburbClick = () => {
    if (!selcedata.state || !selcedata.area) {
      alert("Please select both state and city");
    } else {
      setismodalopen(true);
    }
  };

  useEffect(() => {
    const filtercity = data.filter((item) => item.country === selectedcountry);
    const uniquecity = [...new Set(filtercity.map((item) => item.area))];
    setFiltercity(uniquecity);
  }, [selectedcountry, data]);

  useEffect(() => {
    const filterstate = data.filter((item) => item.area === selectedCity);
    if (filterstate.length > 0 && filterstate[0]?.subarea) {
      setFiltersub(filterstate[0]?.subarea);
      setfilterpin(filterstate[0]?.zipcode || []);
    } else {
      setFiltersub([]);
      setfilterpin([]);
    }

    const uniquiestt = [
      ...new Set(filterstate.map((item) => item.state)),
    ].flat();
    setuniquestate(uniquiestt);

    const areaZipCodes: { [key: string]: string[] } = {};
    filterstate.forEach((item) => {
      if (!areaZipCodes[item.area]) {
        areaZipCodes[item.area] = [];
      }
      if (item.zipcode) {
        areaZipCodes[item.area].push(...item.zipcode);
      }
    });

    const areasWithZipCodes: AreaWithZipCodes[] = Object.keys(areaZipCodes).map(
      (area) => ({
        area,
        zipcodes: areaZipCodes[area],
      })
    );

    setfilterarea(areasWithZipCodes);
  }, [selectedCity, data]);

  const onclose = () => {
    setismodalopen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

      <DashboardLayout>
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Area Management
            </h2>
          </div>
          <nav className="text-sm font-medium mb-2" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link
                  href="/admin/dashboard"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li>
                <span className="text-gray-700" aria-current="page">
                  Area
                </span>
              </li>
            </ol>
          </nav>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <select
                  onChange={(e) => setSelectedcountry(e.target.value)}
                  className="block w-40 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option>Select Country</option>
                  <option value="Usa">USA</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <button
                onClick={() => {
                  router.push("/admin/addarea");
                }}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Plus className="inline-block mr-2 h-4 w-4" /> Add Area
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Area list */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex justify-between items-center">
                  Area
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Filtercity.map((item, i) => (
                      <tr key={i}>
                        <td
                          onClick={() => {
                            setSelectedCity(item);
                          }}
                          className={`cursor-pointer px-10 py-4 whitespace-nowrap text-sm text-gray-500 ${
                            selectedCity === item
                              ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                              : ""
                          }`}
                        >
                          {item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              router.push(`/admin/area/update/${item}`);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* States list */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex justify-between items-center">
                  States
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-gray-200 overflow-y-auto h-[calc(100vh-100px) block"
                    style={{ maxHeight: "calc(80vh - 80px)" }}
                  >
                    <tr className="flex flex-col">
                      {uniquestate.map((item, index) => (
                        <td
                          key={index}
                          className="px-6 py-4 my-1 whitespace-nowrap text-sm text-white bg-gray-600"
                        >
                          {item}
                        </td>
                      ))}
                    </tr>
                    {selectedcountry ? (
                      Object.entries(
                        selectedcountry === "Usa"
                          ? stateAbbreviations
                          : stateAbbreviations
                      ).map(([state, abbreviation]) => (
                        <tr key={state}>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              uniquestate.includes(state)
                                ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-500 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                                : ""
                            }`}
                          >
                            {state} ({abbreviation})
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-gray-500">
                          Please select a country.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Subarea list */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex justify-between items-center">
                  Subarea
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-gray-200 overflow-y-auto h-[calc(100vh-100px) block "
                    style={{ maxHeight: "calc(80vh - 80px)" }}
                  >
                    {Filteresub.length > 0 &&
                      Filteresub.map((item, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Zipcodes list */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex justify-between items-center">
                  Zipcodes
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Code
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-gray-200 overflow-y-auto h-[calc(100vh-100px) block"
                    style={{ maxHeight: "calc(80vh - 80px)" }}
                  >
                    {filterpin.length > 0 &&
                      filterpin.map((item, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </div>
  );
}
