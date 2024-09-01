import { useEffect, useState } from "react";
import { Input, Checkbox, Divider } from "antd";
import { Slider } from "antd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "../ui/button";

const CheckboxGroup = Checkbox.Group;

const categories = [
  { value: "Cardio", label: "Cardio" },
  { value: "Strength", label: "Strength" },
  { value: "Functional", label: "Functional" },
  { value: "BodyWeight", label: "Body Weight" },
  { value: "Accessories", label: "Accessories" },
  { value: "Recovery", label: "Recovery" },
  { value: "Flooring", label: "Flooring" },
  { value: "Storage", label: "Storage" },
  { value: "Specialty", label: "Specialty" },
  { value: "GymPackages", label: "Gym Packages" },
];

const Filter = ({
  setCategory,
  range,
  setRange,
  inStock,
  setInStock,
  checkedList,
  setCheckedList,
  allProducts,
  sortByPrice,
  setSortByPrice,
  isInitialized,
  setIsInitialized,
}) => {
  const [accordionValue, setAccordionValue] = useState("item-1");
  const [accordion2Value, setAccordion2Value] = useState("item-2");
  const [disabledButton, setDisabledButton] = useState(false);
  const [highest, setHighest] = useState(range[1]);

  const checkAll = categories.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < categories.length;

  const getMaxPrice = (arr) => {
    let maxPrice = arr[0].price;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].price > maxPrice) {
        maxPrice = arr[i].price;
      }
    }

    return maxPrice;
  };

  useEffect(() => {
    if (allProducts?.data && !isInitialized) {
      const highestPrice = getMaxPrice(allProducts?.data);
      setHighest(highestPrice);
      setIsInitialized(true);
      setRange([range[0], highestPrice]);
    }
  }, [allProducts, isInitialized, range, setRange, setIsInitialized]);

  const onSliderChange = (newRange) => {
    setRange(newRange);
  };

  const onLowestChange = (e) => {
    const newLowest = Number(e.target.value);
    if (newLowest <= range[1]) {
      setRange([newLowest, range[1]]);
    }
  };

  const onHighestChange = (e) => {
    const newHighest = Number(e.target.value);
    if (newHighest >= range[0]) {
      setRange([range[0], newHighest]);
    }
  };

  const onCheckAllChange = (e) => {
    const allValues = e.target.checked
      ? categories.map((item) => item.value)
      : [];
    setCheckedList(allValues);
    setCategory(allValues);
  };

  const onChange = (list) => {
    setCheckedList(list);
    setCategory(list);
  };

  const handleInStockChange = (e) => {
    if (e.target.checked) {
      setInStock(e.target.checked);
    } else {
      setInStock();
    }
  };

  useEffect(() => {
    if (
      checkedList.length > 0 ||
      inStock ||
      range[0] !== 0 ||
      range[1] !== highest ||
      sortByPrice !== ""
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [checkedList, inStock, range, highest, sortByPrice]);

  const handleClearFilter = () => {
    setCheckedList([]);
    setInStock();
    setRange([0, highest]);
    setSortByPrice("default");
  };

  return (
    <div className="bg-gray-200 shadow-xl rounded-md px-8 py-4">
      <div className="justify-end flex ">
        {disabledButton ? (
          <Button onClick={handleClearFilter} className="bg-red-600">
            Clear Filter
          </Button>
        ) : (
          ""
        )}
      </div>
      <h2 className="text-xl font-semibold my-2 mb-6">Price Range :</h2>
      <Slider
        range
        min={0}
        max={highest}
        value={range}
        onChange={onSliderChange}
      />
      <div className="flex justify-between mt-4">
        <Input
          className="w-1/3 text-center"
          value={range[0]}
          onChange={onLowestChange}
        />
        <Input
          className="w-1/3 text-center"
          value={range[1]}
          onChange={onHighestChange}
        />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-xl font-semibold mt-12 mb-6">Availability :</h2>
          </AccordionTrigger>
          <AccordionContent>
            <Checkbox checked={inStock} onChange={handleInStockChange}>
              In Stock
            </Checkbox>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordion2Value}
        onValueChange={setAccordion2Value}
      >
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <h2 className="text-xl font-semibold mt-12 mb-4">Category :</h2>
          </AccordionTrigger>
          <AccordionContent>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              <p className="font-medium">Select all</p>
            </Checkbox>
            <Divider />
            <CheckboxGroup
              className="flex flex-col gap-3 font-semibold"
              options={categories}
              value={checkedList}
              onChange={onChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
