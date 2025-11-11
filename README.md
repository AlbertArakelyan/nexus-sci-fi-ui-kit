# ⚡ Nexus Sci-Fi UI Kit 

A futuristic sci-fi React component library with built-in sound effects and cyberpunk aesthetics. Perfect for creating immersive terminal-style interfaces and sci-fi applications.

> [!NOTE]
> The package is currently under active development and not published to `npm` yet.

## ✨ Features

- 🎨 **Cyberpunk Design** - Neon green aesthetic with glowing effects and terminal-style typography
- 🔊 **Built-in Sound System** - Web Audio API powered sci-fi sound effects for every interaction
- 🎯 **Icon Support** - Full integration with Lucide React icons
- 📦 **9 Core Components** - Everything you need for modern UIs
- ♿ **Accessible** - Semantic HTML and keyboard navigation support
- 📱 **Responsive** - Mobile-friendly layouts out of the box
- 🎭 **Multiple Variants** - Primary, secondary, danger, ghost styles for all components
- ⚡ **Zero Config** - Works immediately with sensible defaults

## 📦 Installation

```bash
npm install nexus-sci-fi-ui-kit lucide-react
# or
yarn add nexus-sci-fi-ui-kit lucide-react
# or
pnpm add nexus-sci-fi-ui-kit lucide-react
```

## 🚀 Quick Start

```jsx
import React, { useState } from 'react';
import { Button, Input, Card, Badge } from 'nexus-sci-fi-ui-kit';
import { Save, User } from 'lucide-react';

function App() {
  const [name, setName] = useState('');

  return (
    <Card title="Welcome to Nexus" variant="primary" glowing>
      <Input
        label="Username"
        icon={User}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your neural ID..."
      />
      <Button variant="primary" icon={Save}>
        Initialize Connection
      </Button>
      <Badge variant="success">ONLINE</Badge>
    </Card>
  );
}
```

## 📚 Components

You can see full library small demo and a _complete example_ in [COMPONENTS.md](./COMPONENTS.md)

---

## 🔊 Sound System

Nexus UI Kit includes a built-in sound system using Web Audio API. Every component plays appropriate sounds on interaction.

### Sound Types

- **hover** (800Hz) - Plays when mouse enters interactive elements
- **click** (1200Hz) - Plays on button clicks and activations
- **focus** (900Hz) - Plays when input fields receive focus
- **toggle** (1000Hz) - Plays on checkbox/radio/toggle state changes
- **select** (1300Hz) - Plays on dropdown option selection
- **success** (1500Hz) - For successful operations
- **error** (400Hz) - For error states

### Using Sounds Manually

```jsx
import { sounds } from 'nexus-sci-fi-ui-kit';

// Play sounds programmatically
sounds.success(); // Play success sound
sounds.error();   // Play error sound
sounds.click();   // Play click sound
```

### Disabling Sounds

```jsx
// Disable sounds on individual components
<Button soundEnabled={false}>Silent Button</Button>
<Input soundEnabled={false} placeholder="Silent input" />
<Checkbox soundEnabled={false} label="Silent checkbox" />
```

## 🎨 Styling & Theming

Nexus UI Kit uses CSS variables for easy customization:

```css
:root {
  --nexus-green: #00ff41;   /* Primary color */
  --nexus-blue: #00d4ff;    /* Secondary color */
  --nexus-red: #ff6b6b;     /* Danger color */
  --nexus-yellow: #ffd43b;  /* Warning color */
  --nexus-purple: #b794f6;  /* Accent color */
}
```

### Custom Styling

All components accept a `className` prop for custom styling:

```jsx
<Button className="my-custom-button" variant="primary">
  Custom Styled
</Button>

<Card className="my-custom-card" variant="primary">
  Custom card content
</Card>
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Web Audio API required for sound effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please open an issue on GitHub with:
- Component name
- Expected behavior
- Actual behavior
- Steps to reproduce

## 💡 Tips

1. **Performance**: Disable sounds in production if needed with `soundEnabled={false}`
2. **Accessibility**: Always provide labels for form inputs
3. **Icons**: Import only the icons you need from lucide-react to optimize bundle size
4. **Responsive**: Components are mobile-friendly but test on actual devices
5. **Theming**: Customize CSS variables to match your brand colors

## 🎯 Roadmap

- [ ] Dark/Light theme toggle
- [ ] More component variants
- [ ] Animation customization options
- [ ] TypeScript definitions
- [ ] Storybook documentation
- [ ] Additional sound packs

## 📄 License

MIT License - Feel free to use in personal and commercial projects.

---

**Made with ⚡ by Albert Arakelyan**
