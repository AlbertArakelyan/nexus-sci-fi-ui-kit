# ⚡ Nexus UI Kit

A futuristic sci-fi React component library with built-in sound effects and cyberpunk aesthetics. Perfect for creating immersive terminal-style interfaces and sci-fi applications.

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

### Button

Versatile button component with multiple variants, sizes, and icon support.

```jsx
import { Button } from 'nexus-sci-fi-ui-kit';
import { Plus, Edit2, Trash2 } from 'lucide-react';

<Button variant="primary" size="md" icon={Plus}>
  Add Item
</Button>

<Button variant="secondary" size="lg" icon={Edit2} iconPosition="right">
  Edit
</Button>

<Button variant="danger" icon={Trash2} disabled>
  Delete
</Button>

<Button loading>Processing...</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "danger" | "ghost" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `icon`: Lucide React icon component
- `iconPosition`: "left" | "right" (default: "left")
- `loading`: boolean - Shows loading spinner
- `disabled`: boolean
- `soundEnabled`: boolean (default: true)
- All standard HTML button props (onClick, onMouseEnter, etc.)

---

### Input

Styled input field with icon support, labels, and error states.

```jsx
import { Input } from 'nexus-sci-fi-ui-kit';
import { Search, Mail, Shield } from 'lucide-react';

<Input
  label="Email Address"
  icon={Mail}
  type="email"
  placeholder="your.email@nexus.ai"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Input
  label="Password"
  icon={Shield}
  iconPosition="right"
  type="password"
  error="Password must be at least 8 characters"
/>
```

**Props:**
- `label`: string - Field label
- `icon`: Lucide React icon component
- `iconPosition`: "left" | "right" (default: "left")
- `error`: string - Error message to display
- `soundEnabled`: boolean (default: true)
- All standard HTML input props (type, value, onChange, placeholder, etc.)

---

### Card

Container component with optional header, multiple variants, and glowing effect.

```jsx
import { Card, Badge } from 'nexus-sci-fi-ui-kit';

<Card
  title="System Status"
  subtitle="Neural Network Core"
  variant="primary"
  glowing
>
  <p>All systems operational</p>
  <Badge variant="success">ONLINE</Badge>
</Card>
```

**Props:**
- `title`: string
- `subtitle`: string
- `variant`: "default" | "primary" | "secondary" | "danger" (default: "default")
- `glowing`: boolean - Adds glow effect
- `className`: string

---

### Checkbox

Custom styled checkbox with label support.

```jsx
import { Checkbox } from 'nexus-sci-fi-ui-kit';

<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the Neural Interface Terms"
/>

<Checkbox checked={true} disabled label="Always enabled" />
```

**Props:**
- `checked`: boolean
- `onChange`: function - Receives new boolean value
- `label`: string
- `disabled`: boolean
- `soundEnabled`: boolean (default: true)

---

### Radio

Radio button component for mutually exclusive selections.

```jsx
import { Radio } from 'nexus-sci-fi-ui-kit';

<Radio
  checked={protocol === 'alpha'}
  onChange={(value) => setProtocol(value)}
  label="Alpha Protocol"
  name="protocol"
  value="alpha"
/>

<Radio
  checked={protocol === 'beta'}
  onChange={(value) => setProtocol(value)}
  label="Beta Protocol"
  name="protocol"
  value="beta"
/>
```

**Props:**
- `checked`: boolean
- `onChange`: function - Receives the value
- `label`: string
- `name`: string - Radio group name
- `value`: any - Value when selected
- `disabled`: boolean
- `soundEnabled`: boolean (default: true)

---

### Select

Dropdown select component with custom styling.

```jsx
import { Select } from 'nexus-sci-fi-ui-kit';

const options = [
  { value: 'neural-a', label: 'Neural Network Alpha' },
  { value: 'quantum-b', label: 'Quantum Processor Beta' },
  { value: 'ai-core-c', label: 'AI Core Gamma' }
];

<Select
  label="AI System"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Choose system..."
/>
```

**Props:**
- `label`: string
- `options`: Array<{value: string, label: string}>
- `value`: string - Currently selected value
- `onChange`: function - Receives selected value
- `placeholder`: string
- `soundEnabled`: boolean (default: true)

---

### Toggle

Switch/toggle component for on/off states.

```jsx
import { Toggle } from 'nexus-sci-fi-ui-kit';

<Toggle
  checked={quantumMode}
  onChange={setQuantumMode}
  label="Quantum Mode Enabled"
/>
```

**Props:**
- `checked`: boolean
- `onChange`: function - Receives new boolean value
- `label`: string
- `disabled`: boolean
- `soundEnabled`: boolean (default: true)

---

### Badge

Small status indicator component.

```jsx
import { Badge } from 'nexus-sci-fi-ui-kit';

<Badge variant="success" size="md">ONLINE</Badge>
<Badge variant="danger">OFFLINE</Badge>
<Badge variant="primary" size="sm">PROCESSING</Badge>
```

**Props:**
- `variant`: "default" | "primary" | "secondary" | "danger" | "success" (default: "default")
- `size`: "sm" | "md" | "lg" (default: "md")
- `className`: string

---

### Progress

Animated progress bar with shimmer effect.

```jsx
import { Progress } from 'nexus-sci-fi-ui-kit';

<Progress
  value={75}
  max={100}
  label="Neural Network Training"
  variant="primary"
  showValue={true}
/>

<Progress
  value={uploadProgress}
  label="Uploading Data"
  variant="secondary"
/>
```

**Props:**
- `value`: number - Current progress value
- `max`: number (default: 100)
- `label`: string
- `showValue`: boolean (default: true) - Show percentage
- `variant`: "default" | "primary" | "secondary" | "danger" | "success"

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

---

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

---

## 🖼️ Complete Example

```jsx
import React, { useState } from 'react';
import {
  Button, Input, Card, Select, Checkbox, 
  Toggle, Badge, Progress, Radio
} from 'nexus-sci-fi-ui-kit';
import { Save, User, Mail, Shield, Settings } from 'lucide-react';

function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    aiSystem: '',
    enableQuantum: false,
    protocol: 'alpha',
    agreeToTerms: false
  });
  const [progress, setProgress] = useState(65);

  const aiOptions = [
    { value: 'neural-a', label: 'Neural Network Alpha' },
    { value: 'quantum-b', label: 'Quantum Processor Beta' },
    { value: 'ai-core-c', label: 'AI Core Gamma' }
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card title="Neural Interface Setup" subtitle="Configuration Panel" variant="primary" glowing>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input
            label="Full Name"
            icon={User}
            placeholder="Enter your name..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <Input
            label="Email Address"
            icon={Mail}
            type="email"
            placeholder="your.email@nexus.ai"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <Input
            label="Security Code"
            icon={Shield}
            type="password"
            placeholder="Enter secure password..."
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <Select
            label="AI System Selection"
            options={aiOptions}
            value={formData.aiSystem}
            onChange={(value) => setFormData({...formData, aiSystem: value})}
            placeholder="Choose AI Core..."
          />

          <div>
            <h4 style={{ color: '#00ff41', marginBottom: '10px' }}>Protocol Selection</h4>
            <Radio
              checked={formData.protocol === 'alpha'}
              onChange={(value) => setFormData({...formData, protocol: value})}
              label="Alpha Protocol"
              name="protocol"
              value="alpha"
            />
            <Radio
              checked={formData.protocol === 'beta'}
              onChange={(value) => setFormData({...formData, protocol: value})}
              label="Beta Protocol"
              name="protocol"
              value="beta"
            />
          </div>

          <Toggle
            checked={formData.enableQuantum}
            onChange={(value) => setFormData({...formData, enableQuantum: value})}
            label="Enable Quantum Encryption"
          />

          <Checkbox
            checked={formData.agreeToTerms}
            onChange={(value) => setFormData({...formData, agreeToTerms: value})}
            label="I agree to the Neural Interface Terms and Conditions"
          />

          <Progress
            value={progress}
            label="System Initialization Progress"
            variant="primary"
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button 
              variant="primary" 
              icon={Save}
              disabled={!formData.agreeToTerms}
              onClick={handleSubmit}
            >
              Initialize Neural Link
            </Button>
            <Button variant="ghost" icon={Settings}>
              Advanced Settings
            </Button>
            <Badge variant="success">READY</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
```

---

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Web Audio API required for sound effects

---

## 📄 License

MIT License - Feel free to use in personal and commercial projects.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 🐛 Issues

Found a bug? Please open an issue on GitHub with:
- Component name
- Expected behavior
- Actual behavior
- Steps to reproduce

---

## 💡 Tips

1. **Performance**: Disable sounds in production if needed with `soundEnabled={false}`
2. **Accessibility**: Always provide labels for form inputs
3. **Icons**: Import only the icons you need from lucide-react to optimize bundle size
4. **Responsive**: Components are mobile-friendly but test on actual devices
5. **Theming**: Customize CSS variables to match your brand colors

---

## 🎯 Roadmap

- [ ] Dark/Light theme toggle
- [ ] More component variants
- [ ] Animation customization options
- [ ] TypeScript definitions
- [ ] Storybook documentation
- [ ] Additional sound packs

---

**Made with ⚡ by Albert Arakelyan**