import api from "./axios";

export interface User {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string | null;
    imageUrl: string | null;
  };
  comments?: Comment[];
}

export interface UserData {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

export interface ProductData {
  title: string;
  description: string;
  imageUrl: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: string;
  user?: {
    name: string | null;
    imageUrl: string | null;
  };
}

export const syncUser = async (userData: UserData) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get<Product[]>("/products/my");
  return data;
};

export const createProduct = async (productData: ProductData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({
  id,
  ...productData
}: { id: string } & Partial<ProductData>) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
