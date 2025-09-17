# NovaNews – Figma Make Design & Development Guidelines

This document defines the design, content and technical guidelines for building a prototype progressive‑web‑app (PWA) for **NovaNews** using Figma Make. It is inspired by best‑practice guidelines from earlier projects and has been adapted to fit a news platform that publishes fast‑paced, community focused stories. Use this document to brief the Figma Make AI and to guide developers as they implement the React components.

## 1. Project overview

NovaNews is a South‑African news network which consolidates community newspapers under one digital umbrella. It publishes breaking news, opinion, sport, lifestyle, recipes and more on an almost hourly basis. The app must feel modern and trustworthy while remaining lightweight and accessible. Users should be able to scan top stories, browse categories and read articles both online and offline. Navigation should be intuitive on phone, tablet and desktop.

### Primary goals

1. **Present news clearly** – prioritise readability, hierarchy and scannability. Organise content into clear sections: top stories, categories, featured articles and calls to action.
2. **Support multiple categories** – the NovaNews site lists major categories such as _Home_, _News_, _Nuus_, _Schools_, _Sport_, _Business_, _Lifestyle_, _Recipes_, _Opinion_, _E‑Editions_ and _Supplements_【253537001669534†L73-L85】. The design must accommodate these and allow new categories to be added without redesign.
3. **Encourage engagement** – use install prompts, newsletter sign‑up and “save for later” bookmarks to keep readers coming back. Provide clear prompts for enabling push notifications for breaking news.
4. **Optimise for SEO** – implement proper heading hierarchy, meta tags, structured data and descriptive image `alt` attributes. Ensure pages load quickly and meet web‑vitals targets.
5. **Accessibility first** – build using semantic HTML and ARIA attributes. Ensure colour contrast meets WCAG 2.1 AA, all interactive elements are keyboard accessible, and motion respects user preferences.

## 2. Brand identity

NovaNews should feel contemporary yet rooted in community journalism. The brand voice is straightforward and informative. Copy should be factual and concise; avoid sensationalism. The palette and typography should instil trust and make reading comfortable for long‑form articles.

### Colour palette

| Colour            | Hex       | Usage                                                                                       |
| ----------------- | --------- | ------------------------------------------------------------------------------------------- |
| **News Red**      | `#C32026` | Primary colour used for highlights, buttons and icons. Evokes urgency and attention.        |
| **Headline Blue** | `#003366` | Dark blue for headings, links and the navigation bar. Conveys trust and authority.          |
| **Soft Sand**     | `#F5F5F0` | Light background for content areas. Reduces eye strain and creates contrast with dark text. |
| **Mid Grey**      | `#888A8C` | Secondary text, dividers and muted elements such as metadata.                               |
| **Dark Charcoal** | `#202124` | Used for dark sections, overlay panels and dark mode backgrounds.                           |

**Notes**:

- Use the News Red sparingly for calls to action, tags and active states to avoid overwhelming the reader.
- Provide both light and dark themes. The default theme uses Soft Sand backgrounds with dark text. Dark mode inverts backgrounds and lightens text while retaining the same accent colours.

### Typography hierarchy

Use system font stacks or Google Fonts such as **Montserrat** for headings and **Open Sans** for body text. All sizes should be fluid using `clamp(min, vw, max)` to scale across devices. Weight refers to font weight; `500` is medium and `700` is bold.

| Element                 | Usage                          | Weight | Size (clamp)                    |
| ----------------------- | ------------------------------ | ------ | ------------------------------- |
| **H1 – Page titles**    | Hero headlines, page titles    | 700    | `clamp(2.5rem, 7vw, 4.5rem)`    |
| **H2 – Section titles** | Section headings               | 600    | `clamp(2rem, 5vw, 3rem)`        |
| **H3 – Subsections**    | Card titles, sub headings      | 600    | `clamp(1.5rem, 4vw, 2.25rem)`   |
| **H4 – Minor headings** | Metadata headings, overlines   | 500    | `clamp(1.25rem, 3vw, 1.75rem)`  |
| **Body Large**          | Hero sublines, lead paragraphs | 400    | `clamp(1.125rem, 2vw, 1.5rem)`  |
| **Body Standard**       | Main body text                 | 400    | `clamp(1rem, 1.5vw, 1.25rem)`   |
| **Body Small**          | Captions, bylines, meta        | 400    | `clamp(0.875rem, 1.25vw, 1rem)` |

Guidelines:

- Maintain a clear hierarchy: each page uses one H1, followed by descending heading levels. Do not skip levels.
- Body text should have a line‑height of 1.5–1.6; headings 1.2–1.3. Avoid all‑caps for readability.
- For hero sections on dark images, add a semi‑transparent overlay and text shadows to maintain a contrast ratio of at least 4.5:1.

## 3. Adaptive layout & spacing

The layout must adapt seamlessly from mobile through desktop and ultra‑wide screens. Use CSS Grid and Flexbox with fluid values.

### Container system

Define several container classes to constrain content widths:

```css
/* Main container for page sections */
.container-site {
  width: clamp(320px,  85vw,  1400px);
  margin: 0 auto;
}

/* Text heavy content (articles, forms) */
.container-content {
  width: clamp(280px,  75vw,  900px);
  margin: 0 auto;
}

/* Wide blocks (image galleries, category grids) */
.container-wide {
  width: clamp(320px,  90vw,  1200px);
  margin: 0 auto;
}

/* Full‑bleed sections (heroes, banners) */
.container-full {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

### Fluid spacing system

```css
/* Section padding */
.padding-section {
  padding-block: clamp(3rem,  6vw,  5rem);
}

/* Horizontal padding inside containers */
.padding-horizontal {
  padding-inline: clamp(1rem,  4vw,  3rem);
}

/* Card internal padding */
.padding-card {
  padding: clamp(1rem,  2vw,  2rem);
}

/* Grid gaps */
.gap-grid-small {
  gap: clamp(0.5rem,  1.5vw,  1.5rem);
}
.gap-grid-large {
  gap: clamp(1rem,  3vw,  3rem);
}
```

**Guidelines**:

- Start with a single column on phones. Stack components vertically with generous spacing.
- At tablet widths, introduce two‑column grids for lists (e.g. service cards) and keep comfortable gutters.
- On desktop, use three or four columns for category lists; maintain consistent margins on either side.
- For the header, keep the logo on the left and the navigation on the right. On scroll, collapse the header into a sticky bar with reduced height and a subtle shadow.

## 4. Components

This section describes the key reusable components. Each component should be coded as a separate React functional component with JSDoc comments describing its purpose, props, accessibility considerations and usage examples.

### 4.1 Header

The header contains the NovaNews logo, primary navigation and a search button. In desktop view, the navigation items align horizontally: _Home_, _News_, _Business_, _Sport_, _Lifestyle_, _Opinion_, _Recipes_, _Schools_, _About_, _Contact_. On mobile, replace the navigation with a hamburger icon that opens a full‑screen overlay menu. Trap focus within the menu, provide a close button and ensure the menu slides down and fades in with a 300 ms ease transition. Use semantic `<nav>` elements and update the `aria-expanded` attribute when the mobile menu opens or closes.

### 4.2 Hero section

The hero appears at the top of the home page and category pages. It features the lead story with a large background image, category tag, headline (H1) and subheading. Include up to two call‑to‑action buttons: _Read More_ and _Sign Up for Newsletter_. On mobile, stack the text and buttons below the image; on desktop, overlay text on the image using a dark gradient.

### 4.3 Article card

Used in grids for top stories and categories. Cards include a thumbnail image (16:9), category chip, title (H3), snippet (Body Small) and meta (author, date). When clicked, the card navigates to the article page. On hover, lift the card slightly (`translateY(-0.25rem)`) and increase the shadow. Use lazy loading for images.

### 4.4 Category section

Each major category has a section on the home page showing the latest three or four articles. Section titles link to the full category page. Provide a “More” button to load additional stories via AJAX. Use CSS Grid to arrange cards; adjust columns based on screen width.

### 4.5 Newsletter call to action

Invite readers to subscribe. The block includes a short heading (H2), a supportive sentence and an email input with a submit button. Validate the email address client‑side; display success or error messages in an ARIA live region. Use brand colours for the button.

### 4.6 Footer

The footer includes three columns on desktop (stacking on mobile): (1) About NovaNews (brief description), (2) Quick links (e.g. Home, News, Lifestyle, Sport, Recipes, Opinion, Contact, Advertise) and (3) Contact & social icons. Also include legal links (Privacy Policy, Terms & Conditions) and the copyright. Use high contrast for text and ensure links are keyboard focusable.

### 4.7 Modals and interactive elements

- **Search modal** – triggered by the search icon in the header. Opens a modal with an input field and suggestions as the user types. Use the `<dialog>` element or a custom modal with `role="dialog"`. Focus should jump to the input when the modal opens; closing restores focus to the trigger button.
- **Lightbox viewer** – used for article images. Clicking an image opens a full‑screen viewer with next/previous controls. Provide keyboard navigation (arrow keys to move, Esc to close) and trap focus. Use swipes on touch devices.
- **Accordion (FAQ)** – use native `<details>` and `<summary>` for best accessibility. Only one panel should be open at a time. Provide FAQ content such as “How do I submit a story?” or “What is NovaNews?” on the Help/FAQ page.
- **Notification prompt** – a dismissible banner that appears after a reader has viewed at least two articles. Explain the benefit of enabling notifications for breaking news and provide buttons for _Allow_ or _Maybe later_.
- **Offline message** – when offline, show a page or toast indicating offline status and provide access to saved articles. Reconnect automatically when the network returns.

## 5. Pages and templates

### 5.1 Home page

- **Hero** with lead story.
- **Top stories** section showing recent posts across all categories.
- **Category sections** for News, Business, Sport, Lifestyle, Recipes, Opinion, Schools. Each uses the Category Section component.
- **Newsletter call to action**.
- **Footer**.

### 5.2 Category pages

List posts belonging to a specific category. Use infinite scroll or pagination to load more posts. Provide filters (e.g. sort by “Latest” or “Most read”). Place the category name in an H1 at the top. Use the same Article Card component; ensure SEO meta tags include the category name.

### 5.3 Article page

Display full article content. Template parts:

1. **Header** with site navigation.
2. **Hero**: large featured image, category chip and headline.
3. **Meta**: author, publication date and reading time.
4. **Body**: rich text content with headings, paragraphs, images, quotes and lists. Use proper semantic tags (`<h2>`, `<p>`, `<figure>`, `<blockquote>`). Include a share bar for social networks.
5. **Related articles**: list three articles from the same category.
6. **Comments or discussion**: optional for phase two.
7. **Footer**.

### 5.4 Static pages

Pages like _About_, _Contact_, _Policies_ and _FAQs_ use simple content templates. The Contact page includes a form (name, email, message) with validation. Display contact email and office location. The About page can feature the NovaNews mission statement and highlight the team.

## 6. React component diagram

Below is a high‑level component tree to illustrate how the site will be structured. Each component corresponds to a React functional component.

```
<App>
  ├─ <Header>
  │    ├─ <Logo />
  │    ├─ <NavMenu />
  │    ├─ <SearchButton />
  │    └─ <MobileMenu />
  ├─ <Main>
  │    ├─ <HeroSection />
  │    ├─ <TopStoriesSection />
  │    ├─ <CategorySection category="News" />
  │    ├─ <CategorySection category="Business" />
  │    ├─ <CategorySection category="Sport" />
  │    ├─ <CategorySection category="Lifestyle" />
  │    ├─ <CategorySection category="Recipes" />
  │    ├─ <CategorySection category="Opinion" />
  │    ├─ <CategorySection category="Schools" />
  │    ├─ <NewsletterCTA />
  │    └─ <RelatedArticlesSection /> (on article page)
  ├─ <ArticlePage> (route component)
  │    ├─ <ArticleHero />
  │    ├─ <ArticleMeta />
  │    ├─ <ArticleBody />
  │    ├─ <ArticleShareBar />
  │    └─ <CommentsSection /> (optional)
  ├─ <CategoryPage> (route component)
  │    ├─ <CategoryHero />
  │    └─ <ArticleGrid />
  ├─ <StaticPage> (route component)
  └─ <Footer>
       ├─ <FooterAbout />
       ├─ <FooterLinks />
       ├─ <FooterContact />
       └─ <SocialIcons />
```

This tree demonstrates nesting and modularity. The `App` component sets up routing and global providers (e.g. theme context). Each page type (home, category, article, static) is a route component that composes reusable sections. The tree can be extended to include features like bookmarking, user accounts and more.

## 7. Naming convention

Follow consistent naming to improve maintainability:

- **File names**: Use **PascalCase** for React components (e.g. `Header.tsx`, `ArticleCard.tsx`), **camelCase** for utility modules (e.g. `formatDate.ts`) and **kebab‑case** for assets (e.g. `logo-dark.svg`).
- **Component names**: Use **PascalCase** for exported React components (e.g. `HeroSection`). Use a `Props` interface suffixed with `Props` (e.g. `HeroSectionProps`).
- **Variables**: Use **camelCase** for variables and state (e.g. `currentArticle`, `isMenuOpen`). Use `UPPER_SNAKE_CASE` for constants (e.g. `API_BASE_URL`).
- **Event handlers**: Prefix with `handle` followed by the event (e.g. `handleSubmit`, `handleToggleMenu`).
- **CSS custom properties**: Use `--color-primary`, `--font-size-h1`, etc., grouped by semantic purpose rather than arbitrary values.

## 8. Interactivity and animations

- **Hover and focus states**: Provide visual feedback on links, buttons and cards. Use scaling, colour change or underline for hover; always include a visible focus ring for keyboard users (e.g. `outline: 2px solid News Red`).
- **Transitions**: Keep animations subtle (150–250 ms). Respect `prefers‑reduced‑motion` by disabling non‑essential animations when the setting is enabled.
- **Lazy loading**: Defer loading of images and sections until they are near the viewport. Use `loading="lazy"` on images and Intersection Observer for infinite scroll.
- **Forms**: Provide inline validation with clear error messages. After successful submission, replace the form with a confirmation message. Use `aria‑live` regions to announce dynamic content.
- **Offline**: Detect offline status via the Service Worker. When offline, surface a toast or bar notifying the user and provide access to previously cached articles. When connectivity returns, reload new content.

## 9. SEO and structured data

- Each page should set a unique `<title>` and `<meta name="description">` based on its content. For example, an article page’s title might be “Local entrepreneur shines at Mandela Bay Arts Festival – NovaNews”.
- Use `<link rel="canonical">` to avoid duplicate content issues.
- Implement **JSON‑LD** structured data for News Articles. Each article page should include a `<script type="application/ld+json">` describing the article using the `NewsArticle` schema: headline, description, datePublished, dateModified, author, image and publisher. Only mark up content that is visible to users.
- Include breadcrumb structured data using `BreadcrumbList` to help search engines understand site hierarchy.
- Ensure images include descriptive `alt` attributes (e.g. “Local entrepreneur giving speech at Mandela Bay Arts Festival”) to aid accessibility and SEO.
- Submit updated `sitemap.xml` and `news‑sitemap.xml` files reflecting the PWA to Google Search Console when ready.

## 10. Sample content for the prototype

To kick‑start the Figma Make prototype, use the following sample content drawn from current NovaNews categories and sample posts. Replace it with real data during implementation.

### Hero story

**Category**: Business  
**Headline**: _“Local entrepreneur shines at Mandela Bay Arts Festival”_  
**Summary**: Young tech entrepreneur Phila Goduka is making waves in Nelson Mandela Bay with his digital solutions company. His latest showcase at the Mandela Bay Arts Festival drew crowds and investors alike.  
**Image**: Use a stock image of a smiling entrepreneur on stage.  
**CTA**: “Read full story” linking to the article page.

### Additional top stories

| Category  | Title                                                            | Snippet                                                                                                                 |
| --------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Sport     | _“Thrilling victories & shocking upsets in Varsity Cup round 4”_ | Round 4 of the Varsity Cup delivered a night of nail‑biting rugby and unexpected results across campuses.               |
| News      | _“SAPS nab three SASSA officials in corruption sting”_           | Three social grant officials were arrested in a multi‑agency operation aimed at curbing corruption in the Eastern Cape. |
| Lifestyle | _“Mastering the moment: Norris wins season opener”_              | Formula 1’s new season kicked off with Lando Norris clinching a dramatic victory, thrilling fans worldwide.             |

### Category descriptions

- **News** – Breaking national and local news from across South Africa. From politics and policy to crime and community events.
- **Business** – Insights, profiles and analysis of entrepreneurs, corporates and economic trends.
- **Sport** – Coverage of rugby, football, cricket and athletics including match reports, player profiles and tournament previews.
- **Lifestyle** – Features on food, culture, travel, health and entertainment. Includes recipes and event reviews.
- **Opinion** – Columns and editorials providing perspectives on current affairs. Encourage thoughtful debate and clearly attribute authorship.
- **Recipes** – Step‑by‑step guides and videos for local and international dishes. Provide ingredients, prep time and nutritional information.
- **Schools** – News from schools and universities, covering achievements, initiatives and youth voices.

## 11. Code Documentation Standards (JSDoc)

All React components, functions, and utilities must include comprehensive JSDoc documentation following these standards:

**Implementation Status**: All React components in the current NovaNews PWA codebase have been fully documented with comprehensive JSDoc comments following the official JSDoc guidelines and TypeScript JSDoc supported types. This includes detailed descriptions, parameter types, return types, usage examples, and accessibility considerations for all components.

### JSDoc Requirements

1. **Component Documentation**: Every React component must have a JSDoc comment above the component declaration including:

   - Brief description of the component's purpose
   - `@param` tags for each prop with type and description
   - `@returns` tag describing what the component renders
   - `@example` tag showing basic usage
   - `@accessibility` tag documenting accessibility considerations

2. **Function Documentation**: All utility functions and event handlers must include:

   - Brief description of the function's purpose
   - `@param` tags for each parameter
   - `@returns` tag describing the return value
   - `@throws` tag if the function can throw errors
   - `@example` tag for complex functions

3. **Interface Documentation**: TypeScript interfaces should include:
   - Description of the interface purpose
   - JSDoc comments for each property explaining its use

### JSDoc Format Examples

````typescript
/**
 * Header component for the NovaNews PWA providing site navigation and user actions.
 * Implements responsive design with mobile hamburger menu and desktop horizontal navigation.
 *
 * @param {HeaderProps} props - The props for the Header component
 * @param {() => void} props.onMenuClick - Callback fired when mobile menu button is clicked
 * @param {() => void} props.onSearchClick - Callback fired when search button is clicked
 * @param {() => void} props.onInstallClick - Callback fired when PWA install button is clicked
 * @param {() => void} props.onSettingsClick - Callback fired when settings button is clicked
 * @param {boolean} props.showInstallButton - Whether to show the PWA install button
 * @returns {JSX.Element} The rendered header component
 *
 * @example
 * ```tsx
 * <Header
 *   onMenuClick={() => setIsMenuOpen(true)}
 *   onSearchClick={() => setIsSearchOpen(true)}
 *   onInstallClick={handleInstall}
 *   onSettingsClick={() => setIsSettingsOpen(true)}
 *   showInstallButton={true}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic nav element for navigation
 * - Provides aria-expanded for mobile menu button
 * - All interactive elements are keyboard accessible
 * - Focus management for mobile menu interactions
 */
````

### Documentation Standards

- Use TypeScript-compatible JSDoc syntax: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
- Follow JSDoc 3 specification: https://jsdoc.app/
- Include accessibility considerations in component documentation
- Document error handling and edge cases
- Provide practical usage examples
- Keep descriptions concise but informative

## 12. Accessibility Guidelines (WCAG 2.2 AA Compliance)

All components and pages must meet WCAG 2.2 AA standards. This section provides specific guidelines for implementation:

**Implementation Status**: The current NovaNews PWA codebase has been updated to comply with WCAG 2.2 AA standards across all components including App.tsx, Header.tsx, Navigation.tsx, ArticleCard.tsx, ArticleView.tsx, InstallPrompt.tsx, SearchDialog.tsx, SettingsDialog.tsx, and OfflinePage.tsx. All components now include proper semantic HTML, ARIA attributes, keyboard navigation support, and accessibility considerations in their JSDoc documentation.

### 12.1 Perceivable

**Text Alternatives**

- All images must have descriptive `alt` attributes
- Decorative images should have `alt=""` or `role="presentation"`
- Complex images (charts, graphs) need detailed text descriptions
- Icons used for navigation must have accessible names

**Color and Contrast**

- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text (18pt+/24px+ or 14pt+/18.66px+ bold)
- Color cannot be the only means of conveying information
- Focus indicators must have 3:1 contrast against adjacent colors

**Adaptable Content**

- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`)
- Implement proper heading hierarchy (H1 → H2 → H3, no skipping)
- Forms must have proper labels and fieldsets
- Tables require headers and captions where appropriate

**Distinguishable**

- Support browser zoom up to 200% without horizontal scrolling
- Text can be resized up to 200% without loss of functionality
- Implement `prefers-reduced-motion` for users sensitive to animation
- Provide high contrast mode support

### 12.2 Operable

**Keyboard Accessible**

- All functionality available via keyboard
- No keyboard traps (users can navigate away from any element)
- Provide visible focus indicators on all interactive elements
- Implement logical tab order
- Support standard keyboard shortcuts (Esc to close modals, arrow keys for menus)

**No Seizures or Physical Reactions**

- No content flashes more than 3 times per second
- Provide controls to pause, stop, or hide moving content
- Respect `prefers-reduced-motion` setting

**Navigable**

- Provide skip links to main content
- Use descriptive page titles
- Implement breadcrumb navigation where appropriate
- Ensure link purposes are clear from context
- Provide multiple ways to find content (search, navigation, sitemap)

**Input Assistance**

- Label all form inputs clearly
- Provide input format instructions
- Identify required fields
- Provide error identification and suggestions
- Allow users to review and correct submissions

### 12.3 Understandable

**Readable**

- Set page language with `lang` attribute
- Use clear, simple language
- Define unusual words or phrases
- Keep sentences and paragraphs reasonably short

**Predictable**

- Consistent navigation and identification across pages
- Changes of context only occur on user request
- Provide clear headings and labels
- Help users understand how to use interactive elements

**Input Assistance**

- Provide clear error messages
- Offer suggestions for correction
- Use client-side validation with accessible announcements
- Provide confirmation for important actions

### 12.4 Robust

**Compatible**

- Use valid HTML markup
- Ensure name, role, and value are available for assistive technologies
- Use ARIA attributes correctly and sparingly
- Test with screen readers (NVDA, JAWS, VoiceOver)

### Accessibility Testing Checklist

- [ ] Test with keyboard-only navigation
- [ ] Verify screen reader compatibility
- [ ] Check color contrast ratios with tools like WebAIM Contrast Checker
- [ ] Test with browser zoom at 200%
- [ ] Validate HTML markup
- [ ] Run automated accessibility tests (axe-core, Lighthouse)
- [ ] Test with users who have disabilities when possible

### ARIA Best Practices

- Use semantic HTML first, ARIA second
- Common ARIA attributes: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-hidden`
- Implement landmark roles: `banner`, `navigation`, `main`, `complementary`, `contentinfo`
- Use `aria-live` regions for dynamic content updates
- Provide `role="button"` for non-button clickable elements

## 13. Performance and optimization

- **Optimise images**: Use modern formats (WebP/AVIF) and generate multiple sizes. Limit each image to 300 kB. Preload hero images and fonts. Use a CDN for faster delivery.
- **Minify and bundle CSS/JS**: Remove unused CSS via PostCSS or PurgeCSS. Defer non‑critical JavaScript. Use code splitting in React to load route components asynchronously.
- **Service Worker**: Use Workbox to precache the app shell and runtime cache API responses. Implement a network‑first strategy for HTML and a stale‑while‑revalidate strategy for images and API calls. Provide an offline fallback page.
- **Accessibility checklist**: Ensure all images have alt text; colour contrast meets WCAG 2.1 AA; interactive elements are keyboard navigable; forms have labels and error announcements; modals and menus trap focus; and pages declare `lang="en"`.

## 14. Deployment checklist

Before publishing the prototype, run through this checklist:

- [ ] Add favicons (light and dark variants) with `<link rel="icon" media="(prefers-color-scheme: light)">` and `<link rel="icon" media="(prefers-color-scheme: dark)">`.
- [ ] Insert meta tags for character set (`UTF-8`), viewport (`width=device-width, initial-scale=1`) and theme colour (`News Red` or dark equivalent).
- [ ] Add `manifest.webmanifest` with name, short_name, icons, start_url and display mode `standalone`.
- [ ] Add a `robots.txt` that allows crawling and references the sitemap: `User-agent: * \n Allow: / \n Sitemap: https://novanews.co.za/sitemap.xml`.
- [ ] Ensure the Service Worker is registered with the correct scope and caches necessary assets.
- [ ] Validate structured data with Google’s Rich Results test and verify meta tags in Lighthouse.
- [ ] Conduct Lighthouse audits for performance, accessibility, SEO and best practices. Fix any critical issues before launch.

---

## 15. Using this brief with Figma Make

When prompting Figma Make’s AI to generate the site, provide a clear, concise prompt that references this Guidelines document. For example:

> “Create a responsive one‑page NovaNews news site using the specifications in **Guidelines.md**. Use the colour palette, typography scales, component structure and layout system defined in the guidelines. Include hero, top stories, category sections, newsletter call‑to‑action and a footer. Follow accessibility and SEO best practices. Populate the hero and top stories with the sample content provided.”

By referencing the guidelines explicitly, the AI will align design and code decisions with our established standards. After generation, review the output against these guidelines and adjust any deviations.

---

## 16. Push Notification Functionality (Client Brief)

The NovaNews team has provided a separate brief outlining requirements for push notifications. Below is a summary of their key needs and how they integrate into this guidelines document.

### Objective

Implement a push notification system on the NovaNews website to drive traffic and boost user engagement by sending alerts about breaking news, new podcast episodes, big competitions, promotions and other relevant updates.

### Notification triggers

- **Breaking news**: send immediate notifications when a major story breaks. Editors or authorised staff should be able to trigger these manually from the admin dashboard.
- **Scheduled alerts**: send one or two notifications per day (e.g. morning and late afternoon) to prompt users to visit the site. These could be daily digests or top stories.
- **Custom alerts**: allow editors to schedule custom notifications in advance for events such as podcast drops or competitions.

### User experience

- **Opt‑in/out**: Users must be able to easily subscribe or unsubscribe from notifications. On first visit, show a non‑intrusive banner explaining the value of notifications and allow the user to opt in. Provide a settings page or toggle in the app where users can manage their preferences.
- **Device support**: Focus on mobile devices first but ensure desktop browsers can also receive notifications. Progressive Web App (PWA) technologies allow push notifications on supported platforms.

### Admin control

- **Dashboard management**: Lise and authorised staff should have a simple interface to compose, schedule, edit and send notifications. The dashboard should list upcoming scheduled notifications and allow test sends.
- **Analytics**: Provide reporting on notification delivery, open rates and click‑through rates. This will help the team refine timing and content.
- **Test notifications**: Include the ability to send a test notification to a preview device or small group before sending to all subscribers.

### Implementation considerations

- Use the **Push API** and **Notifications API** to deliver notifications. A Service Worker must handle push events and display notifications even when the site is not open.
- On the front end, request permission from users after explaining the benefits. The permission prompt should only appear after the user interacts with the site (e.g. after viewing two articles).
- Store user subscription details (e.g. push endpoint and keys) securely and associate them with their chosen topics or preferences if category‑based notifications are offered in the future.
- For scheduled notifications, consider integrating with a queue or cron system (e.g. WP‑Cron or a custom Node.js service) that triggers push messages at set times.
- Evaluate third‑party services such as Firebase Cloud Messaging (FCM) or OneSignal to handle cross‑browser delivery and analytics. Factor their costs into the project budget.

### Timeline and budget

- **Timeline**: Provide an estimated timeframe for design, development, testing and deployment of the push notification system. Include time for integrating admin controls and analytics.
- **Budget**: Outline any costs associated with third‑party services or plugins (e.g. notification service fees) and additional development effort. Provide options for self‑hosted versus hosted solutions.

Integrating push notifications into the NovaNews PWA will increase engagement by keeping readers informed of breaking and scheduled content. The system must respect user consent and privacy while giving editors the flexibility to manage alerts.

---

## 17. Push Notification Brief (Formatted for Google Docs)

### Objective

Implement a push‑notification system on the **NovaNews** site to increase traffic and user engagement by alerting subscribers about important updates.

### Required Functionality

1. **Notification types**

   - **Breaking news:** immediate alerts for urgent stories.
   - **Daily alerts:** scheduled notifications once or twice per day (morning and late afternoon) encouraging users to visit the site.
   - **Custom alerts:** manually triggered messages for special events, competitions, promotions or podcast releases.

2. **User controls**

   - **Opt‑in/out:** users must be able to easily enable or disable notifications at any time.
   - **Scheduling:** if possible, allow editors to schedule notifications in advance.

3. **Target devices**

   - The initial scope focuses on **mobile devices** (push notifications sent to smartphones and tablets).

4. **Admin interface**

   - **Editorial control:** Lise and Ash need the ability to manage and send notifications from their side.
   - **Scheduling & editing:** admins should be able to schedule, edit and delete upcoming notifications.
   - **Testing:** provide a way to send test notifications before they go live.
   - **Analytics:** access to reporting on open/click rates for each notification.

5. **Project considerations**
   - **Timeline:** an estimated timeline for implementation should be provided.
   - **Budget:** identify any costs associated with third‑party services or plugins plus additional development work.

---

## 18. Responses to the NovaNews Web App Questions (Based on the Push Notification Brief)

**1. Content priorities**

The push brief does **not** specify which categories or content types should appear on the home screen or whether special content (videos, galleries, live blogs) requires unique presentation. These topics would need to be determined separately by the editorial team.

**2. Push notifications**

- **Triggers:** Notifications should be sent for breaking news, daily alerts (morning and late afternoon), and any custom events such as competitions, promotions or podcasts.
- **User opt‑in/out:** Users must be able to opt in or out of notifications easily. The brief does not specify category‑based preferences, but opt‑in/out is mandatory.
- **Frequency:** A maximum of one or two daily alerts is suggested, plus breaking news and manually triggered messages. Over‑notifying should be avoided to reduce uninstalls.

**3. Personalisation and offline content**

The push brief only addresses notifications; it does not cover personalising the feed, offline caching of articles or bookmarking features. Decisions on these items should come from a broader product strategy.

**4. User account and login**

The brief does not mention any account‑based features such as subscriptions, paywalls or commenting. Push notifications would likely be available without requiring a login. Any account functionality must be defined separately.

**5. Advertising and sponsorship**

The brief does not cover advertising formats or placement. Ads are outside the scope of the push notification specification and would need a separate plan.

**6. Analytics and metrics**

The only analytics mentioned are **notification open and click rates**. The team should ensure the admin dashboard provides these metrics. Other analytics (page views, category popularity, installation rates) are not addressed in the push brief.

**7. Platform requirements**

The brief targets mobile devices specifically. It does not state whether the PWA will be packaged for app stores or integrated with Windows/macOS features. Those requirements must be clarified separately.

**8. Design considerations**

Design aspects such as themes, dark mode, accessibility and alignment with the existing NovaNews aesthetic are not covered in the push brief and will need to be defined during the broader design process.