"use client";

import { ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import { useRouter } from "next/navigation";

// Sample data
const areas = [
  "Portland",
  "Atlanta",
  "St. Louis",
  "Seattle",
  "Charlotte",
  "Dallas-DFW",
  "New York",
  "New Jersey",
  "Austin",
  "Chicago",
  "Baltimore",
];

const states = [
  "Alabama (AL)",
  "Alaska (AK)",
  "Arizona (AZ)",
  "Arkansas (AR)",
  "American Samoa (AS)",
  "California (CA)",
  "Colorado (CO)",
  "Connecticut (CT)",
  "Delaware (DE)",
  "District of Columbia (DC)",
  "Florida (FL)",
];

export default function AreaManagement() {
  const router = useRouter();

  return (
    <Dashboardlayout>
      <div className="container mx-auto py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Area</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Area Management</h1>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <Select defaultValue="usa">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="mexico">Mexico</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              router.push("/PostArea");
            }}
            variant="destructive"
          >
            <span className="mr-2">+</span>
            Add Area
          </Button>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* Area Table */}
          <Card>
            <CardHeader>
              <CardTitle>Area</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                    <TableHead>ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areas.map((area) => (
                    <TableRow key={area}>
                      <TableCell>{area}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* States Table */}
          <Card>
            <CardHeader>
              <CardTitle>States</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {states.map((state) => (
                    <TableRow key={state}>
                      <TableCell>{state}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Subarea Table */}
          <Card>
            <CardHeader>
              <CardTitle>Subarea</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center py-8">
                      No data available
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Zipcodes Table */}
          <Card>
            <CardHeader>
              <CardTitle>Zipcodes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CODE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center py-8">
                      No data available
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboardlayout>
  );
}
