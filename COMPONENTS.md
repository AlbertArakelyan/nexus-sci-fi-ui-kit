# 📚 Components

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
