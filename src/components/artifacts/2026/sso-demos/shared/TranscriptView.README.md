# TranscriptView Component

A comprehensive, accessible, print-friendly component that renders SSO authentication flows as a readable document. Designed for reading/text-oriented learners who prefer a full transcript over interactive demos.

## Features

### 1. Readable Document Format
- Linear, top-to-bottom reading flow
- Clear visual hierarchy with proper heading structure (h1-h3)
- Organized into logical sections per step

### 2. Print-Friendly
- Optimized `@media print` styles
- Clean black-on-white output when printed
- Page break control to keep content together
- Removes interactive elements in print mode

### 3. Accessibility (WCAG 2.1 AA Compliant)
- Proper semantic HTML (`<article>`, `<header>`, `<section>`)
- `role="article"` for each step
- Skip links for keyboard navigation
- Proper heading hierarchy (h2 for steps, h3 for sections)
- All code blocks wrapped in `<pre><code>` with `aria-label`
- Screen reader friendly linear reading flow
- Focus management for interactive elements

### 4. Export Capabilities
- **Copy All**: Copies entire transcript as plain text to clipboard
- **Print**: Triggers browser print dialog with optimized layout
- Future: Markdown export (ready for implementation)

### 5. Content Sections

Each step includes:
1. **Step number and title** (h2)
2. **Description paragraph**
3. **What the user sees** - URL bar and screen identifier
4. **HTTP exchanges** - Detailed request/response breakdown:
   - HTTP method, URL, status codes
   - Headers
   - Request/response bodies
   - Decoded payloads (SAML assertions, JWT tokens) via `expandedPayload`
   - Explanatory notes
5. **Active components** - Visual indicators of involved actors
6. **Security notes** (when present) - Highlighted security considerations

## Usage

### Basic Usage

```tsx
import { TranscriptView } from '../shared';
import { STEPS } from './steps.ts';
import { CONFIG } from './config.ts';

export function MyTranscript() {
  return <TranscriptView steps={STEPS} config={CONFIG} />;
}
```

### Integration with Interactive Demo

```tsx
import { SSODemoShell, TranscriptView } from '../shared';
import { STEPS, SCREENS, CONFIG } from './index.ts';

export function DemoWithTranscript() {
  const [view, setView] = useState<'interactive' | 'transcript'>('interactive');

  return (
    <div>
      {/* View switcher */}
      <nav>
        <button onClick={() => setView('interactive')}>Interactive</button>
        <button onClick={() => setView('transcript')}>Transcript</button>
      </nav>

      {/* Conditional rendering */}
      {view === 'transcript' ? (
        <TranscriptView steps={STEPS} config={CONFIG} />
      ) : (
        <SSODemoShell steps={STEPS} screens={SCREENS} config={CONFIG} />
      )}
    </div>
  );
}
```

## Props

### `TranscriptViewProps`

```typescript
interface TranscriptViewProps {
  /** Array of demo steps to render as transcript */
  steps: Step[];
  /** Demo configuration */
  config: DemoConfig;
}
```

See `types.ts` for full type definitions of `Step` and `DemoConfig`.

## Styling

### Dark Theme (Default)
- Background: `bg-gray-900`
- Text: `text-gray-100`
- Code blocks: `bg-gray-800`, `font-mono`
- Accents: Blue, emerald, amber for different message types

### Print Theme
- Background: White
- Text: Black
- Clean, high-contrast output
- Removes interactive buttons and decorative elements
- Optimized for paper/PDF

### Tailwind Classes Used
All styling uses existing Tailwind utility classes matching the `SSODemoShell.tsx` theme:
- Layout: `max-w-5xl`, `p-6`, `space-y-8`
- Typography: `text-3xl`, `font-bold`, `tracking-tight`
- Colors: `bg-gray-900`, `text-gray-100`, `border-blue-500`
- Responsive: Mobile-first approach with clean stacking

## Accessibility Features

### Keyboard Navigation
- Skip link to main content (Tab reveals)
- Table of contents with anchor links
- Skip links between steps
- All interactive elements keyboard accessible

### Screen Readers
- Proper ARIA labels on all code blocks
- Live regions for dynamic content
- Semantic HTML structure
- Descriptive link text

### Visual
- High contrast ratios
- Clear visual hierarchy
- Sufficient text sizing
- Visible focus indicators

## HTTP Message Display

The component renders different HTTP message types with distinct visual styling:

### Message Types
1. **REQUEST** (amber) - Browser requests
2. **RESPONSE** (emerald) - Server responses
3. **INTERNAL** (gray) - Internal processes
4. **SERVER→SERVER** (purple) - Backend communication
5. **SERVER RESPONSE** (purple) - Backend responses

### Expanded Payloads
For complex payloads like SAML assertions or JWT tokens, use the `expandedPayload` field:

```typescript
{
  type: "request",
  method: "POST",
  url: "https://logto.example.com/api/authn/saml/entra-connector",
  body: "SAMLResponse=PHNhbWxw...",
  expandedPayload: {
    label: "Decoded SAMLResponse (assertion)",
    content: `<samlp:Response ...>
  <!-- Full decoded XML -->
</samlp:Response>`
  }
}
```

Expanded payloads:
- Toggle-able in browser view (show/hide button)
- Always visible in print mode
- Syntax highlighted (green for readability)

## Plain Text Export

The `Copy All` button generates a plain text version of the entire transcript:

```text
================================================================================
OIDC-SAML Bridge Authentication Flow
Caddy + Logto (OIDC) + Entra (SAML)
Version: 1.0.0
================================================================================

STEP 1: User requests protected resource
--------------------------------------------------------------------------------

Description: User navigates to the dashboard. Caddy intercepts and checks auth.

What the User Sees:
  Browser URL: https://secrets.example.com/dashboard
  Screen: blank

HTTP Exchanges:

  [1] REQUEST
      Browser → Caddy
      GET https://secrets.example.com/dashboard
      Headers:
        Cookie: (none)
      Note: No session cookie present
...
```

Format features:
- Clean ASCII art separators
- Indented hierarchy
- Preserves all technical details
- Readable in any text editor
- Copy-paste friendly

## File Structure

```
shared/
├── TranscriptView.tsx           # Main component
├── TranscriptView.example.tsx   # Usage examples
├── TranscriptView.README.md     # This file
├── types.ts                     # Shared type definitions
└── index.ts                     # Re-exports TranscriptView
```

## Browser Compatibility

- Modern browsers with ES2020+ support
- Clipboard API for copy functionality
- Print media queries supported in all major browsers
- CSS Grid and Flexbox for layout

## Future Enhancements

Potential additions (not yet implemented):
- [ ] Markdown export download
- [ ] JSON export for programmatic analysis
- [ ] Search/filter functionality
- [ ] Collapsible sections
- [ ] Syntax highlighting for code blocks
- [ ] Dark/light theme toggle
- [ ] Font size controls

## Related Components

- `SSODemoShell.tsx` - Interactive demo shell
- `HttpEntry.tsx` - Individual HTTP message display (used for reference)
- `types.ts` - Shared type definitions

## Contributing

When modifying this component:
1. Maintain accessibility standards
2. Test print output
3. Verify keyboard navigation
4. Check responsive design on mobile
5. Ensure plain text export accuracy
6. Update this README if adding features
