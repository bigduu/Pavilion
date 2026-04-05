# Pavilion

Pavilion is the official website and public documentation surface for the Bodhi AI stack.

It is the place where the external story gets unified:
- **Bodhi AI** as the desktop AI product
- **Bamboo** as the structured Rust runtime
- **Lotus** as the visible interaction layer

## What Pavilion is for

Pavilion is not the runtime and not the desktop shell itself.
Its job is to:

- explain the product clearly to new users
- keep marketing language and docs entry points consistent
- route users toward download, first run, advanced automation, and developer paths
- make the Bodhi AI / Lotus / Bamboo relationship easy to understand

## Core paths

- Home page: product positioning and conversion
- Download page: stable desktop install entry
- Docs page: first run, automation, architecture, and developer paths
- Article layer: longer-form founder / product narrative

## Local development

```bash
cd pavilion
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Messaging boundary

Pavilion should stay aligned with the current external narrative:

- Bodhi AI = the AI that actually works
- Bamboo = structured local-first Rust runtime
- Lotus = visible UI layer
- the stack is differentiated by execution visibility, structured runtime design, and automation that compounds over time

## Related repositories

- Bodhi: https://github.com/bigduu/Bodhi
- Lotus: https://github.com/bigduu/Lotus
- Bamboo: https://github.com/bigduu/Bamboo-agent
