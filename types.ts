
export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price?: number;
  discount?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
