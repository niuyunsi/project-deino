import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types/index.ts";

const products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is product one",
    price: 99.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is product two",
    price: 150.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is product three",
    price: 199.99,
  },
];

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const selectedProduct: Product | undefined = products.find(
    (product) => product.id === params.id
  );
  if (selectedProduct) {
    response.status = 200;
    response.body = {
      sucess: true,
      data: selectedProduct,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Product Not Found",
    };
  }
};

const addProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

const updateProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

const deleteProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
