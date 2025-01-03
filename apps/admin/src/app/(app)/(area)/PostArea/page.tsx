"use client";

import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboardlayout from "@/components/Layout/Dashboardlayout";

export default function AddAreaForm() {
  return (
    <Dashboardlayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>AllArea</span>
          <ChevronRight className="h-4 w-4" />
          <span>Add Area</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add or Update</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Country and State Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Country</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select State</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select a country." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled" disabled>
                        Please select a country first
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Area Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <Input type="text" placeholder="Type Area" />
              </div>

              {/* Cities Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Cities</label>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Type Cities"
                    className="flex-1"
                  />
                  <Select defaultValue="select">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select">Select State</SelectItem>
                      {/* Add state options here */}
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Zip & Codes Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Zip & Codes</label>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Zip Code"
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Information Notes */}
              <div className="space-y-1 text-sm text-red-500">
                <p>* Primary State Is A State Where Area Is Located</p>
                <p>
                  * Whole State Is Where The Entire State Is Listed After The
                  Subarea Are Done
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">Back</Button>
                <Button className="bg-green-500 hover:bg-green-600">
                  Add Area
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Dashboardlayout>
  );
}
