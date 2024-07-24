import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const categories = [
  "Technology",
  "Grocery",
  "Fitness",
  "Retail",
  "Restaurant",
  "Automotive",
  "Hospitality",
  "Pet Services",
  "Home & Garden",
  "Health & Beauty",
  "Entertainment",
  "Nightlife",
  "Fashion",
];

const locations = [
  "New York, NY",
  "San Francisco, CA",
  "Los Angeles, CA",
  "Seattle, WA",
  "Chicago, IL",
  "Houston, TX",
  "Miami, FL",
  "Denver, CO",
  "Atlanta, GA",
  "Boston, MA",
  "Austin, TX",
  "Portland, OR",
  "Nashville, TN",
  "San Diego, CA",
  "Dallas, TX",
];

interface FilterBusinessProps {
  searchParams: URLSearchParams;
  setSearchParams: (newParams: URLSearchParams) => void;
}

function FilterBusiness({
  searchParams,
  setSearchParams,
}: FilterBusinessProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  const handleFilter = (name: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(name, value);
    } else {
      newSearchParams.delete(name);
    }

    setSearchParams(newSearchParams);
  };

  function clearFilter() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("category", "");
    newSearchParams.set("location", "");
    newSearchParams.set("search", "");
    newSearchParams.set("page", "1");

    setSearchParams(newSearchParams);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-foreground">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent className="text-foreground">
        <SheetHeader>
          <SheetTitle className="text-center">Filter</SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-8 justify-center items-center text-accent-foreground">
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                handleFilter("category", value);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => {
                    return (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={location}
              onValueChange={(value) => {
                setLocation(value);
                handleFilter("location", value);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  {locations.map((location) => {
                    return (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="flex justify-center items-center">
          <SheetClose asChild>
            <Button onClick={clearFilter} type="submit">
              Clear Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FilterBusiness;
