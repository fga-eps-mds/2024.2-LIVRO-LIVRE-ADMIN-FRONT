export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  rating: number;
  imageUrl: string;
}