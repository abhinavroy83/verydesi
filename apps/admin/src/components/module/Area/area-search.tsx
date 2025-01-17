"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AreaData } from "@myrepo/types";

interface AreaSearchProps {
  data: AreaData[];
}

interface SearchResult {
  type: "State" | "Area" | "Subarea" | "Zipcode";
  value: string;
  area: string;
}

export function AreaSearch({ data }: AreaSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const results: SearchResult[] = [];
      data.forEach((item) => {
        // Search in states
        item.state.forEach((state) => {
          if (state.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({ type: "State", value: state, area: item.area });
          }
        });

        // Search in area
        if (item.area.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: "Area", value: item.area, area: item.area });
        }

        // Search in subareas
        item.subarea.forEach((subarea) => {
          if (subarea.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({ type: "Subarea", value: subarea, area: item.area });
          }
        });

        // Search in zipcodes
        item.zipcode.forEach((zipcode) => {
          if (zipcode.includes(searchTerm)) {
            results.push({ type: "Zipcode", value: zipcode, area: item.area });
          }
        });
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, data]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}  >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Areas</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Input
              id="search"
              placeholder="Search for state, area, city, or zipcode"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-500" />
            )}
          </div>
          {searchResults.length > 0 && (
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 shadow-sm"
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs font-semibold"
                    >
                      {result.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {result.value}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Area
                        </Badge>
                        <p className="text-xs text-gray-500 truncate">
                          {result.area}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          {searchTerm.length >= 2 &&
            searchResults.length === 0 &&
            !isSearching && (
              <p className="text-center text-gray-500">No results found</p>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
