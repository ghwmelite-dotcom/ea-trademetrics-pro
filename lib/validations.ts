// Form Validation Schemas
// Using simple validation without external dependencies for static export

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  honeypot?: string; // Spam protection
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  success: boolean;
  errors: ValidationError[];
  data?: ContactFormData;
}

// Email regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex pattern (international format)
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: ValidationError[] = [];

  // Honeypot check - if filled, it's likely a bot
  if (data.honeypot && data.honeypot.trim() !== '') {
    // Silently reject but return success to not alert bots
    return { success: true, errors: [], data: undefined };
  }

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  // Email validation
  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Phone validation (optional but must be valid if provided)
  if (data.phone && data.phone.trim() !== '') {
    const cleanPhone = data.phone.replace(/\s/g, '');
    if (!PHONE_REGEX.test(cleanPhone) && cleanPhone.length < 10) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (data.message.trim().length > 5000) {
    errors.push({ field: 'message', message: 'Message must be less than 5000 characters' });
  }

  // Check for spam patterns in message
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|congratulations|click here|act now)\b/i,
    /(http[s]?:\/\/){3,}/i, // Multiple URLs
  ];

  if (data.message) {
    for (const pattern of spamPatterns) {
      if (pattern.test(data.message)) {
        errors.push({ field: 'message', message: 'Message contains prohibited content' });
        break;
      }
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    errors: [],
    data: {
      name: data.name!.trim(),
      email: data.email!.trim().toLowerCase(),
      phone: data.phone?.trim() || undefined,
      service: data.service?.trim() || undefined,
      message: data.message!.trim(),
    },
  };
}

// Calculator validation
export interface CalculatorFormData {
  startingCapital: number;
  winRate: number;
  riskRewardRatio: number;
  riskPerTrade: number;
  tradesPerMonth: number;
  months: number;
}

export function validateCalculatorForm(data: Partial<CalculatorFormData>): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.startingCapital || data.startingCapital < 100) {
    errors.push({ field: 'startingCapital', message: 'Starting capital must be at least $100' });
  } else if (data.startingCapital > 10000000) {
    errors.push({ field: 'startingCapital', message: 'Starting capital must be less than $10,000,000' });
  }

  if (!data.winRate || data.winRate < 1 || data.winRate > 99) {
    errors.push({ field: 'winRate', message: 'Win rate must be between 1% and 99%' });
  }

  if (!data.riskRewardRatio || data.riskRewardRatio < 0.1 || data.riskRewardRatio > 10) {
    errors.push({ field: 'riskRewardRatio', message: 'Risk:Reward ratio must be between 0.1 and 10' });
  }

  if (!data.riskPerTrade || data.riskPerTrade < 0.1 || data.riskPerTrade > 10) {
    errors.push({ field: 'riskPerTrade', message: 'Risk per trade must be between 0.1% and 10%' });
  }

  if (!data.tradesPerMonth || data.tradesPerMonth < 1 || data.tradesPerMonth > 500) {
    errors.push({ field: 'tradesPerMonth', message: 'Trades per month must be between 1 and 500' });
  }

  if (!data.months || data.months < 1 || data.months > 120) {
    errors.push({ field: 'months', message: 'Simulation period must be between 1 and 120 months' });
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

// Sanitize HTML to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
