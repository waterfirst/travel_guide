export interface Course {
  id: string;
  type: 'bonfire' | 'spa-day' | 'spa-overnight' | 'solo-drive';
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  distance: number;
  estimatedCost: {
    min: number;
    max: number;
  };
  itinerary: Itinerary[];
  restaurants: string[];
  accommodations?: string[];
  bestWeather: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Itinerary {
  order: number;
  location: Location;
  activity: string;
  duration: string;
  cost: number;
  description: string;
}

export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  parkingInfo?: string;
  entryFee?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  location: Location;
  phone: string;
  menu: MenuItem[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  images: string[];
  openingHours: string;
}

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  location: Location;
  phone: string;
  priceRange: {
    min: number;
    max: number;
  };
  amenities: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  bookingUrl?: string;
}
