import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface DataTableProps {
  title: string;
  data: string[];
  onRowClick?: (item: string) => void;
  selectedItem?: string;
  actionRender?: (item: string) => React.ReactNode;
  highlightedItems?: string[];
  searchable?: boolean;
}

export function DataTable({
  title,
  data,
  onRowClick,
  selectedItem,
  actionRender,
  highlightedItems = [],
  searchable = false,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          {title}
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {searchable && (
          <div className="mb-4">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              //   icon={<Search className="h-4 w-4 text-gray-500" />}
            />
          </div>
        )}
        <ScrollArea className="h-[calc(80vh-200px)]">
          <Table>
            <TableHeader>
              <TableRow>
                {actionRender && (
                  <TableHead className="w-[100px]">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`cursor-pointer ${
                    selectedItem === item || highlightedItems.includes(item)
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                >
                  <TableCell>{item}</TableCell>
                  {actionRender && <TableCell>{actionRender(item)}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
