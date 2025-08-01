import { DriverStore, LocationStore, MarkerData } from "@/types/type";
import { create } from "zustand";
export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserAddress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set(() => ({
      userAddress: address,
      userLatitude: latitude,
      userLongitude: longitude,
    })),
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set(() => ({
      destinationAddress: address,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    })),
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    })),
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  setSelectedDriver: (driverId: number | null) =>
    set(() => ({
      selectedDriver: driverId,
    })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));
