export type CarType = 'SUV' | 'Sedan' | 'MPV' | 'Hatchback';

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: CarType;
  pricePerDay: number;
  capacity: number;
  image: string;
  rating: number;
  features: string[];
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  customerName: string;
  phone: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'completed';
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}