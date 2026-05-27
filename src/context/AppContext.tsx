import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car, Booking, User } from '@/types';
import { cars as initialCars, initialBookings, currentUser } from '@/data/cars';

interface AppContextType {
  cars: Car[];
  bookings: Booking[];
  user: User;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cars] = useState<Car[]>(initialCars);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [user] = useState<User>(currentUser);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        cars,
        bookings,
        user,
        addBooking,
        selectedCar,
        setSelectedCar,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}