import fs from 'fs';
import path from 'path';

// Types
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: ProcessStep[];
  timeframe: string;
  priceRange: PriceRange;
  faq: FAQ[];
  relatedServices: string[];
  targetAudience: string[];
  seoKeywords: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  note: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: string;
  isMainCity: boolean;
  distanceFromMain: {
    value: number;
    unit: string;
  };
  description: string;
  keywords: string[];
}

export interface ServicePage {
  serviceId?: string;
  serviceName?: string;
  service?: string;
  serviceSlug?: string;
  locationId?: string;
  locationName?: string;
  location?: string;
  locationSlug?: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  description?: string;
  shortDescription?: string;
  localizedContent?: {
    intro: string;
    whyChooseUs: string;
    localBenefits: string[];
  };
  images: Image[] | {
    heroImage?: Image;
    gallery?: Image[];
  };
  cta?: CTA;
  ctaPhone?: string;
  ctaText?: string;
  ctaSecondary?: string;
  serviceHighlights?: string[];
  benefits?: string[];
  process?: ProcessStep[];
  faq?: FAQ[];
  pricing?: PriceRange & { basePrice?: number };
  pricingInfo?: string;
  deliverables?: string[];
  relatedServices?: string[];
  seoKeywords?: string[];
  keywords?: string[];
  localKeywords?: string[];
}

export interface Image {
  url: string;
  alt: string;
  caption: string;
  credit?: {
    photographer: string;
    unsplashUrl: string;
  };
}

export interface CTA {
  primary: string;
  secondary: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface BusinessProfile {
  businessName: string;
  subdomainService: string;
  suggestedSubdomain: string;
  tagline: string;
  serviceTagline: string;
  description: string;
  serviceDescription: string;
  existingFeatures: string[];
  newServices: string[];
  brandColors: {
    primary: string;
    accent: string;
    success: string;
    text: string;
  };
}

// Data loading functions
export async function getAllServices(): Promise<Service[]> {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'services.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);
  return data.services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getAllServices();
  return services.find(service => service.slug === slug) || null;
}

export async function getAllLocations(): Promise<Location[]> {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'locations.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);
  return data.locations;
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const locations = await getAllLocations();
  return locations.find(location => location.slug === slug) || null;
}

export async function getAllServicePages(): Promise<ServicePage[]> {
  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const files = fs.readdirSync(pagesDir);

  const pages: ServicePage[] = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(pagesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      pages.push(JSON.parse(content));
    }
  }

  return pages;
}

export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const filePath = path.join(pagesDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function getServicePagesByServiceId(serviceId: string): Promise<ServicePage[]> {
  const pages = await getAllServicePages();
  return pages.filter(page => page.serviceId === serviceId);
}

export async function getServicePagesByLocationId(locationId: string): Promise<ServicePage[]> {
  const pages = await getAllServicePages();
  return pages.filter(page => page.locationId === locationId);
}

export async function getBusinessProfile(): Promise<BusinessProfile> {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'business-profile.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileContent);
}

// Get unique service categories
export async function getServiceCategories(): Promise<string[]> {
  const services = await getAllServices();
  const categories = [...new Set(services.map(s => s.category))];
  return categories;
}

// Get total counts for stats
export async function getStats() {
  const services = await getAllServices();
  const locations = await getAllLocations();
  const pages = await getAllServicePages();

  return {
    servicesCount: services.length,
    locationsCount: locations.length,
    pagesCount: pages.length,
    categoriesCount: (await getServiceCategories()).length,
  };
}
