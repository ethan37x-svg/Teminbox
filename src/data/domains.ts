import { DomainOption } from '../types';

export const availableDomains: DomainOption[] = [
  {
    domain: 'mailhub.cc',
    isPopular: true,
    status: 'active',
    description: 'Ultra-fast global inbound routing, recommended for social media & newsletters.',
  },
  {
    domain: 'quickmail.live',
    isPopular: true,
    status: 'active',
    description: 'High-reputation domain optimized for OTP verification codes and instant signups.',
  },
  {
    domain: 'flashmail.email',
    isPopular: false,
    status: 'active',
    description: 'Lightweight inbox domain with instant Cloudflare edge caching.',
  },
  {
    domain: 'tempinbox.org',
    isPopular: true,
    status: 'active',
    description: 'Privacy-focused domain with strict DKIM and SPF verification check.',
  },
  {
    domain: 'swiftbox.me',
    isPopular: false,
    status: 'active',
    description: 'Secondary disposable routing for developer testing & automated webhooks.',
  },
];
