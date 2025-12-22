# src/components/artifacts/ExampleReactDemo.md
---
# React Integration Guide

React has been successfully integrated into this Astro + Starlight project using Astro Islands architecture.

## Quick Start

### 1. Create Your React Component

Place your React component in `src/components/`:

```jsx
// src/components/MyDemo.jsx
import { useState } from 'react';

export default function MyDemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### 2. Use in Astro Pages

Create an `.astro` file in `src/pages/`:

```astro
---
import MyDemo from '../components/MyDemo.jsx';
---

<html>
  <body>
    <h1>My Page</h1>
    <MyDemo client:load />
  </body>
</html>
```

### 3. Use in MDX Documentation Files

For Starlight documentation, create an `.mdx` file in `src/content/docs/`:

```mdx
---
title: Interactive Demo
description: Page with embedded React component
---

import MyDemo from '../../../components/MyDemo.jsx';

# Interactive Demo

Here's a live demo:

<MyDemo client:load />
```

**Note:** Use relative imports - from docs content you need `../../../components/` to reach the components directory.

## Client Directives

Choose the right hydration strategy:

| Directive | When to Use | Performance Impact |
|-----------|-------------|-------------------|
| `client:load` | Critical interactive components | Hydrates immediately, blocks page |
| `client:idle` | Non-critical UI elements | Hydrates when browser is idle |
| `client:visible` | Below-the-fold components | Hydrates when scrolled into view |
| `client:only="react"` | Browser-API dependent code | No SSR, client-only |
| _(none)_ | Static display only | No hydration, no JS bundle |

### Examples

```astro
<!-- Immediate hydration -->
<ComplexDemo client:load />

<!-- Lazy hydration -->
<SidebarWidget client:idle />

<!-- Scroll-triggered -->
<ChartComponent client:visible />

<!-- Client-only (needs window, document, etc) -->
<BrowserSpecific client:only="react" />

<!-- Static render (no interactivity) -->
<StaticDiagram />
```

## Best Practices

1. **Prefer Vue for new components** - Vue is your primary framework, use React only when necessary
2. **Use `client:visible` for heavy components** - Reduces initial JS bundle size
3. **Avoid `client:load` unless critical** - Delays page interactivity
4. **Test without JS** - Components without directives should render useful static HTML
5. **Keep React bundles separate** - Don't import React components in Vue files or vice versa

## Mixing Vue and React

Both frameworks can coexist in the same page:

```astro
---
import VueCounter from '../components/VueCounter.vue';
import ReactDemo from '../components/ReactDemo.jsx';
---

<VueCounter client:load />
<ReactDemo client:visible />
```

Each island hydrates independently with its own framework runtime.

## TypeScript Support

For TypeScript React components, use `.tsx`:

```tsx
// src/components/TypedDemo.tsx
import { useState } from 'react';

interface Props {
  initialCount?: number;
}

export default function TypedDemo({ initialCount = 0 }: Props) {
  const [count, setCount] = useState(initialCount);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Testing the Integration

Visit the example page to see React integration in action:

```bash
pnpm dev
```

Then navigate to: `http://localhost:4321/demo-example`

## File Structure

```
src/
├── components/
│   ├── ExampleReactDemo.jsx     # Example React component
│   └── *.vue                     # Your existing Vue components
├── pages/
│   └── demo-example.astro        # Example page with React
└── content/
    └── docs/
        └── {lang}/
            └── *.mdx             # Use MDX for React in docs
```

## Configuration

React integration is configured in `config/integrations.mjs`:

```javascript
import react from "@astrojs/react";

export function createIntegrations() {
  return [markdoc(), vue(), react(), starlight(starlightConfig)];
}
```

## Troubleshooting

**Problem:** Component not interactive
- **Solution:** Add a `client:*` directive

**Problem:** "Can't resolve 'react'"
- **Solution:** Run `pnpm install` to ensure packages are installed

**Problem:** Hooks not working
- **Solution:** Ensure you're using a `client:*` directive (not static render)

**Problem:** TypeScript errors
- **Solution:** Check `@types/react` and `@types/react-dom` are installed

## Resources

- [Astro Islands Documentation](https://docs.astro.build/en/concepts/islands/)
- [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Client Directives Reference](https://docs.astro.build/en/reference/directives-reference/#client-directives)
