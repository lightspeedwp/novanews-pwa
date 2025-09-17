# NovaNews PWA

A modern Progressive Web App for South African community news, built with React, TypeScript, and Tailwind CSS v4.

## Features

- 📱 **Progressive Web App** with offline support
- ♿ **WCAG 2.2 AA Compliant** accessibility
- 📖 **Comprehensive JSDoc Documentation**
- 🎨 **NovaNews Brand Guidelines** implemented
- 🚀 **Optimized for Performance** with Vite and Workbox
- 📊 **SEO Optimized** with structured data
- 🌙 **Dark Mode Support**
- 📱 **Responsive Design** for all devices

## Typography System

Implements the NovaNews typography hierarchy with fluid, responsive sizing:

- **H1 (Hero Headlines)**: `clamp(2.5rem, 7vw, 4.5rem)` - font-weight 700
- **H2 (Section Titles)**: `clamp(2rem, 5vw, 3rem)` - font-weight 600  
- **H3 (Card Titles)**: `clamp(1.5rem, 4vw, 2.25rem)` - font-weight 600
- **H4 (Minor Headings)**: `clamp(1.25rem, 3vw, 1.75rem)` - font-weight 500
- **Body Large**: `clamp(1.125rem, 2vw, 1.5rem)` - font-weight 400
- **Body Standard**: `clamp(1rem, 1.5vw, 1.25rem)` - font-weight 400
- **Body Small**: `clamp(0.875rem, 1.25vw, 1rem)` - font-weight 400

## Container System

- `.container-site` - Main page sections (320px - 1400px)
- `.container-content` - Text-heavy content (280px - 900px) 
- `.container-wide` - Wide blocks (320px - 1200px)
- `.container-full` - Full-bleed sections

## Brand Colors

- **News Red**: `#C32026` - Primary accent, CTAs, alerts
- **Headline Blue**: `#003366` - Headings, links, navigation
- **Soft Sand**: `#F5F5F0` - Light backgrounds  
- **Mid Grey**: `#888A8C` - Secondary text, metadata
- **Dark Charcoal**: `#202124` - Dark mode backgrounds

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

This project is configured for Netlify deployment with:

- Build command: `npm run build`
- Publish directory: `dist`
- PWA functionality with service worker
- Security headers and caching optimization
- Lighthouse CI integration

### Environment Variables

No environment variables required for basic functionality. All content is currently mock data.

## Accessibility

- ✅ WCAG 2.2 AA compliant
- ✅ Keyboard navigation support
- ✅ Screen reader compatible  
- ✅ Focus management
- ✅ Color contrast validated
- ✅ Motion preferences respected
- ✅ Semantic HTML structure

## Documentation

All components include comprehensive JSDoc documentation with:

- Type definitions
- Usage examples
- Accessibility considerations
- Parameter descriptions
- Return type documentation

## Performance

- Vite-powered build optimization
- Code splitting for vendor and UI libraries
- Image optimization and lazy loading
- Service worker caching strategy
- Minimal bundle size with tree shaking

## PWA Features

- Offline article reading
- Install prompts
- Push notification support (framework ready)
- App shortcuts
- Responsive icons and splash screens

## Browser Support

- Modern browsers with ES2020+ support
- Progressive enhancement for older browsers
- Service Worker support required for PWA features

## License

MIT License - See LICENSE file for details

## Contributing

Please follow the established patterns:

1. Use TypeScript with strict mode
2. Follow JSDoc documentation standards
3. Maintain WCAG 2.2 AA compliance
4. Test across different devices and screen readers
5. Follow the NovaNews brand guidelines