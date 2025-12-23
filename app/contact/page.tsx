'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs } from '@/components/ui';
import { validateContactForm, type ContactFormData, type ValidationError } from '@/lib/validations';
import { siteConfig } from '@/lib/config';

type FormStatus = 'idle' | 'validating' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getFieldError = useCallback((field: string): string | undefined => {
    return errors.find(e => e.field === field)?.message;
  }, [errors]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors.some(e => e.field === field)) {
      setErrors(prev => prev.filter(e => e.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('validating');
    setErrors([]);

    // Validate form
    const validation = validateContactForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      setStatus('idle');
      return;
    }

    // If honeypot was filled (bot), pretend success
    if (!validation.data) {
      setStatus('sent');
      return;
    }

    setStatus('sending');

    try {
      // Submit to Web3Forms
      // Get your free access key at https://web3forms.com/
      const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

      if (!WEB3FORMS_KEY) {
        throw new Error('Web3Forms key not configured');
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New EA Development Inquiry from ${validation.data.name}`,
          from_name: 'TradeMetrics Pro EA',
          name: validation.data.name,
          email: validation.data.email,
          phone: validation.data.phone || 'Not provided',
          service: validation.data.service || 'Not specified',
          message: validation.data.message,
          // Redirect is disabled for AJAX submissions
          redirect: false,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('sent');
        setFormData({ name: '', email: '', phone: '', service: '', message: '', honeypot: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // Fallback: Open mailto link
      const mailtoLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
        `EA Development Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nService: ${formData.service || 'Not specified'}\n\nMessage:\n${formData.message}`
      )}`;

      window.open(mailtoLink, '_blank');
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', service: '', message: '', honeypot: '' });
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: 'WhatsApp',
      description: 'Chat with us instantly',
      href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`,
      color: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#20BA5C]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      description: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
      color: 'bg-[#00d4ff]/20',
      hoverColor: 'hover:bg-[#00d4ff]/30',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      description: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      color: 'bg-[#00d4ff]/20',
      hoverColor: 'hover:bg-[#00d4ff]/30',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      label: 'Telegram',
      description: `@${siteConfig.contact.telegram}`,
      href: `https://t.me/${siteConfig.contact.telegram}`,
      color: 'bg-[#0088cc]/20',
      hoverColor: 'hover:bg-[#0088cc]/30',
    },
  ];

  const services = [
    { value: '', label: 'Select a service' },
    { value: 'mt4-ea', label: 'MT4 Expert Advisor Development' },
    { value: 'mt5-ea', label: 'MT5 Expert Advisor Development' },
    { value: 'pine-script', label: 'Pine Script to MQL Conversion' },
    { value: 'backtesting', label: 'Strategy Backtesting & Optimization' },
    { value: 'modification', label: 'EA Modification & Enhancement' },
    { value: 'indicator', label: 'Custom Indicator Development' },
    { value: 'maintenance', label: 'EA Maintenance & Support' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden">
      <GlowingOrbs variant="section" />

      {/* Skip to main content link for accessibility */}
      <a
        href="#contact-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00d4ff] focus:text-black focus:rounded-lg"
      >
        Skip to contact form
      </a>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="text-[#00d4ff] font-semibold text-sm uppercase tracking-wider mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact Us
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to automate your trading strategy? Contact us for a free consultation.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection direction="left" delay={0.2}>
            <motion.div
              id="contact-form"
              className="glass-card rounded-2xl p-8 md:p-10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 font-display">Send Us a Message</h2>

              {status === 'sent' ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="alert"
                  aria-live="polite"
                >
                  <motion.div
                    className="w-20 h-20 bg-[#00ff88]/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    <svg
                      className="w-10 h-10 text-[#00ff88]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-display">Message Sent!</h3>
                  <p className="text-gray-400 mb-8">We&apos;ll get back to you within 24 hours.</p>
                  <AnimatedButton onClick={() => setStatus('idle')} variant="ghost">
                    Send Another Message
                  </AnimatedButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave this empty</label>
                    <input
                      type="text"
                      id="honeypot"
                      name="honeypot"
                      value={formData.honeypot || ''}
                      onChange={(e) => handleInputChange('honeypot', e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      aria-invalid={!!getFieldError('name')}
                      aria-describedby={getFieldError('name') ? 'name-error' : undefined}
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`input-premium w-full ${getFieldError('name') ? 'border-red-500' : ''}`}
                      placeholder="Your name"
                      animate={{
                        boxShadow: focusedField === 'name'
                          ? '0 0 0 4px rgba(0, 212, 255, 0.1), 0 0 20px rgba(0, 212, 255, 0.1)'
                          : '0 0 0 0px transparent',
                      }}
                    />
                    {getFieldError('name') && (
                      <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                        {getFieldError('name')}
                      </p>
                    )}
                  </div>

                  {/* Email and Phone Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!getFieldError('email')}
                        aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`input-premium w-full ${getFieldError('email') ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                        animate={{
                          boxShadow: focusedField === 'email'
                            ? '0 0 0 4px rgba(0, 212, 255, 0.1), 0 0 20px rgba(0, 212, 255, 0.1)'
                            : '0 0 0 0px transparent',
                        }}
                      />
                      {getFieldError('email') && (
                        <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                          {getFieldError('email')}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number <span className="text-gray-500">(Optional)</span>
                      </label>
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        aria-invalid={!!getFieldError('phone')}
                        aria-describedby={getFieldError('phone') ? 'phone-error' : undefined}
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`input-premium w-full ${getFieldError('phone') ? 'border-red-500' : ''}`}
                        placeholder="+233 XX XXX XXXX"
                        animate={{
                          boxShadow: focusedField === 'phone'
                            ? '0 0 0 4px rgba(0, 212, 255, 0.1), 0 0 20px rgba(0, 212, 255, 0.1)'
                            : '0 0 0 0px transparent',
                        }}
                      />
                      {getFieldError('phone') && (
                        <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
                          {getFieldError('phone')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Service Interested In
                    </label>
                    <motion.select
                      id="service"
                      name="service"
                      value={formData.service || ''}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className="input-premium w-full cursor-pointer"
                      animate={{
                        boxShadow: focusedField === 'service'
                          ? '0 0 0 4px rgba(0, 212, 255, 0.1), 0 0 20px rgba(0, 212, 255, 0.1)'
                          : '0 0 0 0px transparent',
                      }}
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value} className="bg-[#0d0d12]">
                          {service.label}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message <span className="text-red-400">*</span>
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      aria-invalid={!!getFieldError('message')}
                      aria-describedby={getFieldError('message') ? 'message-error' : undefined}
                      rows={5}
                      value={formData.message || ''}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`input-premium w-full resize-none ${getFieldError('message') ? 'border-red-500' : ''}`}
                      placeholder="Describe your trading strategy or project requirements..."
                      animate={{
                        boxShadow: focusedField === 'message'
                          ? '0 0 0 4px rgba(0, 212, 255, 0.1), 0 0 20px rgba(0, 212, 255, 0.1)'
                          : '0 0 0 0px transparent',
                      }}
                    />
                    {getFieldError('message') && (
                      <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                        {getFieldError('message')}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {(formData.message?.length || 0)} / 5000 characters
                    </p>
                  </div>

                  {/* Global Error Message */}
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg" role="alert">
                      <p className="text-red-400 text-sm">
                        There was an error sending your message. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending' || status === 'validating'}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[#050508]"
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 212, 255, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'sending' || status === 'validating' ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          aria-hidden="true"
                        />
                        {status === 'validating' ? 'Validating...' : 'Sending...'}
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8 font-display">Quick Contact</h2>
                <div className="space-y-4" role="list" aria-label="Contact methods">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center gap-4 p-4 ${method.color} rounded-xl ${method.hoverColor} transition-all group focus:outline-none focus:ring-2 focus:ring-[#00d4ff]`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      role="listitem"
                      aria-label={`Contact via ${method.label}: ${method.description}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        {method.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{method.label}</div>
                        <div className="text-gray-400 text-sm">{method.description}</div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <motion.div
                className="glass-card rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-display">Our Location</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center shrink-0 text-[#00d4ff]" aria-hidden="true">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{siteConfig.business.address.city}, {siteConfig.business.address.country}</div>
                      <div className="text-gray-400 text-sm">Serving {siteConfig.business.address.region} and globally</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center shrink-0 text-[#00d4ff]" aria-hidden="true">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Business Hours</div>
                      <div className="text-gray-400 text-sm">{siteConfig.business.hours}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Part of TradeMetrics Pro */}
              <motion.div
                className="glass-card rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-gray-400 mb-4">Part of the TradeMetrics Pro ecosystem</p>
                <Link
                  href="https://trademetricspro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-[#00ff88] transition-colors font-medium focus:outline-none focus:underline"
                >
                  Visit TradeMetrics Pro
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
