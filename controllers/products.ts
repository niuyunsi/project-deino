import { Request, Response } from "https://deno.land/x/oak/mod.ts";
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

const getProducts = ({ response }: { response: Response }) => {
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
  response: Response;
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

const addProduct = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      sucess: false,
      msg: "No Data",
    };
  } else {
    const { value } = await request.body({ type: "json" });
    console.log("value", value);
    const product: Product = await value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

const updateProduct = ({ response }: { response: Response }) => {
  response.body = {
    success: true,
    data: products,
  };
};

const deleteProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const filteredProducts: Product[] = products.filter(
    (product) => product.id !== params.id
  );
  if (filteredProducts.length === products.length) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Not found",
    };
  } else {
    products.splice(0, products.length);
    products.push(...filteredProducts);
    response.status = 200;
    response.body = {
      success: true,
      msg: `Product with id ${params.id} has been deleted`,
    };
  }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
