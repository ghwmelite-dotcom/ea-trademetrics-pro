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

// ============================================
// CACHING LAYER
// ============================================

// In-memory cache for build-time optimization
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute cache for development

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ============================================
// OPTIMIZED DATA LOADING FUNCTIONS
// ============================================

// Load services (cached)
export async function getAllServices(): Promise<Service[]> {
  const cacheKey = 'all-services';
  const cached = getCached<Service[]>(cacheKey);
  if (cached) return cached;

  const dataPath = path.join(process.cwd(), 'public', 'data', 'services.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  setCache(cacheKey, data.services);
  return data.services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getAllServices();
  return services.find(service => service.slug === slug) || null;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await getAllServices();
  return services.find(service => service.id === id) || null;
}

// Load locations (cached)
export async function getAllLocations(): Promise<Location[]> {
  const cacheKey = 'all-locations';
  const cached = getCached<Location[]>(cacheKey);
  if (cached) return cached;

  const dataPath = path.join(process.cwd(), 'public', 'data', 'locations.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  setCache(cacheKey, data.locations);
  return data.locations;
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const locations = await getAllLocations();
  return locations.find(location => location.slug === slug) || null;
}

export async function getLocationById(id: string): Promise<Location | null> {
  const locations = await getAllLocations();
  return locations.find(location => location.id === id) || null;
}

// ============================================
// OPTIMIZED SERVICE PAGE LOADING
// ============================================

// Build index of service pages for efficient lookups
interface ServicePageIndex {
  files: string[];
  byService: Map<string, string[]>;
  byLocation: Map<string, string[]>;
  bySlug: Map<string, string>;
}

let servicePageIndex: ServicePageIndex | null = null;

async function buildServicePageIndex(): Promise<ServicePageIndex> {
  if (servicePageIndex) return servicePageIndex;

  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));

  const byService = new Map<string, string[]>();
  const byLocation = new Map<string, string[]>();
  const bySlug = new Map<string, string>();

  // Build index by reading file metadata
  for (const file of files) {
    const slug = file.replace('.json', '');
    bySlug.set(slug, file);

    // Parse service and location from slug pattern
    // Slug format: {service-slug}-{location-slug}
    // We need to read the file to get accurate serviceId and locationId
    const filePath = path.join(pagesDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const page: ServicePage = JSON.parse(content);

      if (page.serviceId) {
        const existing = byService.get(page.serviceId) || [];
        existing.push(file);
        byService.set(page.serviceId, existing);
      }

      if (page.locationId) {
        const existing = byLocation.get(page.locationId) || [];
        existing.push(file);
        byLocation.set(page.locationId, existing);
      }
    } catch {
      console.warn(`Failed to parse ${file}`);
    }
  }

  servicePageIndex = { files, byService, byLocation, bySlug };
  return servicePageIndex;
}

// Get all service pages (with caching)
export async function getAllServicePages(): Promise<ServicePage[]> {
  const cacheKey = 'all-service-pages';
  const cached = getCached<ServicePage[]>(cacheKey);
  if (cached) return cached;

  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));

  // Use Promise.all for parallel file reading
  const pages = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(pagesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as ServicePage;
    })
  );

  setCache(cacheKey, pages);
  return pages;
}

// Get single service page by slug (optimized)
export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  const cacheKey = `service-page-${slug}`;
  const cached = getCached<ServicePage>(cacheKey);
  if (cached) return cached;

  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const filePath = path.join(pagesDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const page = JSON.parse(content) as ServicePage;

  setCache(cacheKey, page);
  return page;
}

// Get service pages by service ID (optimized with index)
export async function getServicePagesByServiceId(serviceId: string): Promise<ServicePage[]> {
  const cacheKey = `pages-by-service-${serviceId}`;
  const cached = getCached<ServicePage[]>(cacheKey);
  if (cached) return cached;

  const index = await buildServicePageIndex();
  const files = index.byService.get(serviceId) || [];

  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const pages = files.map(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    return JSON.parse(content) as ServicePage;
  });

  setCache(cacheKey, pages);
  return pages;
}

// Get service pages by location ID (optimized with index)
export async function getServicePagesByLocationId(locationId: string): Promise<ServicePage[]> {
  const cacheKey = `pages-by-location-${locationId}`;
  const cached = getCached<ServicePage[]>(cacheKey);
  if (cached) return cached;

  const index = await buildServicePageIndex();
  const files = index.byLocation.get(locationId) || [];

  const pagesDir = path.join(process.cwd(), 'public', 'data', 'pages');
  const pages = files.map(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    return JSON.parse(content) as ServicePage;
  });

  setCache(cacheKey, pages);
  return pages;
}

// ============================================
// BUSINESS PROFILE
// ============================================

export async function getBusinessProfile(): Promise<BusinessProfile> {
  const cacheKey = 'business-profile';
  const cached = getCached<BusinessProfile>(cacheKey);
  if (cached) return cached;

  const dataPath = path.join(process.cwd(), 'public', 'data', 'business-profile.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const profile = JSON.parse(fileContent) as BusinessProfile;

  setCache(cacheKey, profile);
  return profile;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

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

  // Use index instead of loading all pages
  const index = await buildServicePageIndex();

  return {
    servicesCount: services.length,
    locationsCount: locations.length,
    pagesCount: index.files.length,
    categoriesCount: (await getServiceCategories()).length,
  };
}

// Get related services
export async function getRelatedServices(serviceId: string, limit = 4): Promise<Service[]> {
  const service = await getServiceById(serviceId);
  if (!service) return [];

  const allServices = await getAllServices();
  const relatedIds = service.relatedServices || [];

  // Get related by ID first
  const related = relatedIds
    .map(id => allServices.find(s => s.id === id))
    .filter((s): s is Service => s !== undefined)
    .slice(0, limit);

  // If not enough, add from same category
  if (related.length < limit) {
    const sameCategory = allServices
      .filter(s => s.category === service.category && s.id !== serviceId)
      .filter(s => !related.some(r => r.id === s.id))
      .slice(0, limit - related.length);
    related.push(...sameCategory);
  }

  return related.slice(0, limit);
}

// Clear cache (for development)
export function clearCache(): void {
  cache.clear();
  servicePageIndex = null;
}
