/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "./ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import FilterDrawer from "@/components/Product/FilterDrawer";
import { Input, Space } from "antd";
import type { GetProps } from "antd";
import Filter from "@/components/Product/Filter";
import { Select } from "antd";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [range, setRange] = useState([0, 50000]);
  const [inStock, setInStock] = useState();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [sortByPrice, setSortByPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfProducts, setNumberOfProducts] = useState(500);

  const [limitOptions, setLimitOptions] = useState([
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ]);

  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetallProductsQuery({ limit: 5000 });

  const {
    data: products,
    isError,
    isLoading,
  } = useGetallProductsQuery({
    searchTerm,
    inStock,
    minPrice: range[0],
    maxPrice: range[1],
    sort: sortByPrice,
    limit: limit,
    page: page,
  });

  useEffect(() => {
    if (allProducts?.data) {
      const highestPrice = getMaxPrice(allProducts.data);
      setRange([range[0], highestPrice]);
      setNumberOfProducts(allProducts.data.length);
    }
  }, [allProducts]);

  const getMaxPrice = (arr) => {
    if (!arr || arr.length === 0) {
      return range[1];
    }

    let maxPrice = arr[0].price;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].price > maxPrice) {
        maxPrice = arr[i].price;
      }
    }

    return maxPrice;
  };

  const handleChange = (value: string) => {
    setSortByPrice(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const onShowSizeChange = (current: number, size: number) => {
    setLimit(size);
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);

    setLimitOptions((prevOptions) => {
      const otherOptions = prevOptions.filter((opt) => opt.value !== value);
      return [{ value, label: `${value}` }, ...otherOptions];
    });
  };

  if (isLoading || isAllProductsLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (isError || isAllProductsError) {
    return <div>Error loading products</div>;
  }

  if (!products.data) {
    return <div>No products available</div>;
  }

  type SearchProps = GetProps<typeof Input.Search>;

  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearchTerm(value);
  };

  console.log({ products, searchTerm });

  return (
    <div className="lg:flex lg:gap-12">
      <div className="lg:w-1/4 hidden lg:block">
        <Filter
          allProducts={allProducts}
          sortByPrice={sortByPrice}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          inStock={inStock}
          setInStock={setInStock}
          range={range}
          setRange={setRange}
        />
      </div>
      <div className="lg:w-3/4">
        <div className="items-center flex mb-4 justify-between bg-gray-200 px-4 py-4 rounded-md">
          <div className="lg:hidden">
            <FilterDrawer
              allProducts={allProducts}
              sortByPrice={sortByPrice}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              inStock={inStock}
              setInStock={setInStock}
              range={range}
              setRange={setRange}
              open={open}
              onClose={onClose}
              showDrawer={showDrawer}
            />
          </div>
          <div className="text-lg font-semibold items-center flex gap-2">
            Sort By
            <Space wrap>
              <Select
                onChange={handleChange}
                defaultValue="default"
                style={{ width: 120 }}
                options={[
                  { value: "", label: "Default" },
                  { value: "price", label: "Price (Low > High)" },
                  { value: "-price", label: "Price (High > Low)" },
                ]}
              />
            </Space>
          </div>
          <div className="w-3/5">
            <Space direction="vertical">
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Space>
          </div>
          <div>
            Show
            <Space wrap>
              <Select
                value={limit}
                onChange={handleLimitChange}
                style={{ width: 120 }}
                options={limitOptions}
              />
            </Space>
          </div>
        </div>
        <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
          {products.data.map((product: any) => (
            <ProductCard product={product} key={product._id}></ProductCard>
          ))}
        </div>
        <div className="mt-12">
          <Pagination
            showQuickJumper
            current={page}
            pageSize={limit}
            total={numberOfProducts}
            onChange={onChange}
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
