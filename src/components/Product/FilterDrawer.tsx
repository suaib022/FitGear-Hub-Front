/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Drawer, Input, Checkbox, Divider } from "antd";
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

const FilterDrawer = ({
  open,
  showDrawer,
  onClose,
  range,
  setRange,
  inStock,
  setInStock,
  checkedList,
  setCheckedList,
  sortByPrice,
  allProducts,
  setCategory,
  setSortByPrice,
  isInitialized,
  setIsInitialized,
}: any) => {
  const [accordionValue, setAccordionValue] = useState("item-1");
  const [accordion2Value, setAccordion2Value] = useState("item-2");
  const [showClearFilterButton, setShowClearFilterButton] = useState(false);
  const [highest, setHighest] = useState(range[1]);

  const checkAll = categories.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < categories.length;

  // function for getting the highest valued product from DB
  const getMaxPrice = (arr: any) => {
    let maxPrice = arr[0].price;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].price > maxPrice) {
        maxPrice = arr[i].price;
      }
    }

    return maxPrice;
  };

  // handle price range state
  useEffect(() => {
    if (allProducts?.data && !isInitialized) {
      const highestPrice = getMaxPrice(allProducts?.data);
      setHighest(highestPrice);
      setRange([range[0], highestPrice]);
      setIsInitialized(true);
    }
  }, [
    allProducts,
    range,
    setRange,
    isInitialized,
    getMaxPrice,
    setHighest,
    setIsInitialized,
  ]);

  const onSliderChange = (newRange: any) => {
    setRange(newRange);
  };

  const onLowestChange = (e: any) => {
    const newLowest = Number(e.target.value);
    if (newLowest <= range[1]) {
      setRange([newLowest, range[1]]);
    }
  };

  const onHighestChange = (e: any) => {
    const newHighest = Number(e.target.value);
    if (newHighest >= range[0]) {
      setRange([range[0], newHighest]);
    }
  };

  // handle category selection
  const onCheckAllChange = (e: any) => {
    const allValues = e.target.checked
      ? categories.map((item) => item.value)
      : [];
    setCheckedList(allValues);
    setCategory(allValues);
  };

  const onChange = (list: any) => {
    setCheckedList(list);
    setCategory(list);
  };

  // handle product's availability check
  const handleInStockChange = (e: any) => {
    if (e.target.checked) {
      setInStock(e.target.checked);
    } else {
      setInStock();
    }
  };

  // handle showClearFilter button state
  useEffect(() => {
    if (
      checkedList.length > 0 ||
      inStock ||
      range[0] !== 0 ||
      range[1] !== highest ||
      sortByPrice !== ""
    ) {
      setShowClearFilterButton(true);
    } else {
      setShowClearFilterButton(false);
    }
  }, [checkedList, inStock, range, highest, sortByPrice]);

  // handle clear filter button
  const handleClearFilter = () => {
    setCheckedList([]);
    setInStock();
    setRange([0, highest]);
    setSortByPrice("default");
  };

  return (
    <>
      <Button
        className="sm:w-2/4 w-2/5 bg-rose-500 hover:bg-rose-600"
        onClick={showDrawer}
      >
        Filter
      </Button>
      <Drawer
        className="rounded-xl"
        title="Filter Options"
        onClose={onClose}
        open={open}
      >
        <div className="justify-end flex ">
          {showClearFilterButton ? (
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
          value={[range[0], range[1]]}
          onChange={onSliderChange}
        />
        <div className="flex justify-between mt-4">
          <Input
            className="w-1/4 text-center"
            value={range[0]}
            onChange={onLowestChange}
          />
          <Input
            className="w-1/4 text-center"
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
              <h2 className="text-xl font-semibold mt-12 mb-6">
                Availability :
              </h2>
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
      </Drawer>
    </>
  );
};

export default FilterDrawer;
