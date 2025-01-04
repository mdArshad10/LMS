import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { courseCategories } from "@/app/data";
import { useSearchParams } from "react-router-dom";

const Filter = ({ handleFilterChanges }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchParam] = useSearchParams();

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newCategories = prevSelectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId];



      handleFilterChanges(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const handleSortByPriceChange = (selectedValue) => {
    setSortByPrice(selectedValue);
    

    handleFilterChanges(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={handleSortByPriceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">Hight to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div>
        <h1 className="font-semibold mb-2">Categories</h1>
        {courseCategories.map((category, index) => (
          <div key={index} className="flex items-center space-x-2 my-2">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
              className="rounded-none p-0"
            />
            <Label
              htmlFor={category.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
