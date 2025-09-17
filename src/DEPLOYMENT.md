# NovaNews PWA - Deployment Guide

This guide covers deploying the NovaNews Progressive Web App to Netlify with full PWA functionality, push notifications, and optimal performance.

## Prerequisites

- Node.js 18+ installed locally
- Git repository connected to GitHub/GitLab/Bitbucket
- Netlify account

## Quick Deployment to Netlify

### Option 1: Drag and Drop (For Testing)

1. Build the application locally:
   ```bash
   npm install
   npm run build
   ```

2. Drag the `dist` folder directly to the Netlify dashboard
   - This deploys immediately but without continuous deployment

### Option 2: Git Integration (Recommended)

1. **Connect Repository**:
   - Sign up/log in to Netlify
   - Click "New site from Git" 
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the NovaNews repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (set in environment variables as `NODE_VERSION=18`)

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy on every push to main branch

## PWA Features Included

### ✅ Service Worker & Caching

The app includes comprehensive caching strategies via Workbox:

- **App Shell**: Pre-cached for instant loading
- **Images**: Cache-first strategy with 30-day expiration
- **Static Assets**: Stale-while-revalidate for CSS/JS
- **External Images**: Unsplash images cached locally
- **Google Fonts**: Optimized caching for web fonts

### ✅ Offline Functionality

- Full offline reading of cached articles
- Offline page with saved articles access
- Network status detection and user feedback
- Background sync foundation for future features

### ✅ Push Notification Ready

Infrastructure is in place for push notifications per Guidelines.md:

- Service worker handles push events
- Notification click actions configured
- Admin interface foundation prepared
- Ready for integration with FCM or OneSignal

### ✅ App Installation

- Install prompts after user engagement
- Custom install UI in settings
- App shortcuts for quick access to categories
- Platform-specific icons and metadata

## Performance Optimizations

### Bundle Optimization

- Code splitting for vendor libraries (React, UI components)
- Tree shaking removes unused code
- ESBuild minification for optimal size
- Source maps disabled in production

### Image Optimization

- Unsplash images cached with service worker
- Lazy loading for off-screen images
- WebP format support where available
- Responsive image sizing

### Caching Strategy

- Static assets: 1 year cache with immutable flag
- Service worker: No cache for immediate updates
- Manifest: 1 hour cache for periodic updates
- HTML: 5 minutes cache for content freshness

## Security Headers

The `_headers` file configures security headers:

- **CSP**: Content Security Policy for XSS protection
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer Policy**: Controls referrer information
- **Permissions Policy**: Restricts browser APIs

## Environment Variables

No environment variables required for basic functionality. For future API integrations:

```bash
# Example for future backend integration
VITE_API_BASE_URL=https://api.novanews.co.za
VITE_PUSH_NOTIFICATION_KEY=your-push-key-here
```

Set these in Netlify dashboard under Site settings > Environment variables.

## Custom Domain Setup

1. **Add Domain in Netlify**:
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `novanews.co.za`)

2. **Configure DNS**:
   - Point your domain's CNAME to your Netlify subdomain
   - Or use Netlify DNS for full management

3. **Enable HTTPS**:
   - Netlify automatically provisions SSL certificates
   - Force HTTPS redirect is enabled by default

## Monitoring and Analytics

### Built-in Monitoring

- Netlify provides deployment logs and error tracking
- Service worker registration logs to browser console
- PWA install events tracked

### Recommended Additions

- **Google Analytics**: Add GA4 for user behavior tracking
- **Lighthouse CI**: Automated performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Web Vitals**: Core Web Vitals measurement

## Testing Checklist

Before going live, verify:

- [ ] PWA install prompt appears on mobile/desktop
- [ ] Offline functionality works (disconnect network)
- [ ] Service worker registers successfully
- [ ] Manifest validates (Chrome DevTools > Application)
- [ ] Lighthouse audit scores 90+ for PWA
- [ ] All images have proper alt text
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility tested
- [ ] Push notification infrastructure ready

## Future Enhancements

### Push Notifications Implementation

When ready to implement push notifications:

1. **Choose Service**: Firebase Cloud Messaging (FCM) or OneSignal
2. **Backend Setup**: API endpoints for notification management
3. **Admin Interface**: Build notification composer/scheduler
4. **User Preferences**: Category-based notification settings
5. **Analytics**: Track delivery and engagement rates

### API Integration

The app is structured to easily integrate with a CMS or API:

- Replace `mockArticles` with API calls
- Add authentication for user accounts
- Implement comment system
- Add bookmarking sync across devices

### Advanced PWA Features

- **Background Sync**: Queue offline actions
- **Web Share API**: Enhanced sharing capabilities
- **Contact Picker**: Easy contact sharing
- **Payment Request**: Subscription management
- **Web Locks**: Prevent duplicate tab actions

## Troubleshooting

### Common Issues

**Service Worker Not Updating**:
- Check cache headers are correct
- Force refresh (Ctrl+Shift+R) in development
- Verify `skipWaiting` configuration

**PWA Install Prompt Not Showing**:
- Ensure HTTPS is enabled
- Check manifest.json validation
- Verify service worker is registered
- Wait for engagement criteria (time on site)

**Images Not Loading Offline**:
- Check service worker caching rules
- Verify image URLs are being cached
- Test with different image sources

### Debug Tools

- **Chrome DevTools**: Application tab for PWA debugging
- **Lighthouse**: Performance and PWA auditing
- **Workbox Inspector**: Service worker debugging
- **Network Tab**: Cache hit/miss analysis

## Support

For technical issues or deployment questions:

- Check the browser console for error messages
- Review Netlify deployment logs
- Test in multiple browsers and devices
- Validate HTML, CSS, and manifest files

The NovaNews PWA is designed for reliability and performance. Following this deployment guide ensures optimal user experience and PWA compliance.