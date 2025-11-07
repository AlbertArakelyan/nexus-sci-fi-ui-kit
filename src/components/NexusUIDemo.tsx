import { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, FileDown, ChevronDown, ChevronRight, 
  Settings, Home, User, Search, Bell, Heart, Star, Shield, Zap,
  Play, Pause, Volume2, VolumeX, Mail, Phone, Calendar, Clock, Eye, EyeOff
} from 'lucide-react';

// Sound System
const createSound = (frequency, duration = 200, type = 'sine') => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {
    console.log('Audio not supported');
  }
};

export const sounds = {
  hover: () => createSound(800, 100),
  click: () => createSound(1200, 150),
  success: () => createSound(1500, 200),
  error: () => createSound(400, 300, 'square'),
  toggle: () => createSound(1000, 100),
  focus: () => createSound(900, 80),
  select: () => createSound(1300, 120)
};

// Button Component
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  soundEnabled = true,
  className = '',
  onClick,
  onMouseEnter,
  ...props 
}) => {
  const handleClick = (e) => {
    if (disabled || loading) return;
    if (soundEnabled) sounds.click();
    onClick?.(e);
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading && soundEnabled) sounds.hover();
    onMouseEnter?.(e);
  };

  const baseClasses = "nexus-btn";
  const sizeClasses = {
    sm: 'nexus-btn-sm',
    md: 'nexus-btn-md', 
    lg: 'nexus-btn-lg'
  };
  const variantClasses = {
    primary: 'nexus-btn-primary',
    secondary: 'nexus-btn-secondary',
    danger: 'nexus-btn-danger',
    ghost: 'nexus-btn-ghost'
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabled ? 'nexus-btn-disabled' : '',
    loading ? 'nexus-btn-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <div className="nexus-spinner" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={18} />}
          {children && <span className="nexus-btn-text">{children}</span>}
          {Icon && iconPosition === 'right' && <Icon size={18} />}
        </>
      )}
    </button>
  );
};

// Input Component
export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  iconPosition = 'left',
  error,
  label,
  soundEnabled = true,
  className = '',
  onFocus,
  ...props 
}) => {
  const handleFocus = (e) => {
    if (soundEnabled) sounds.focus();
    onFocus?.(e);
  };

  const inputClasses = [
    'nexus-input',
    Icon && iconPosition === 'left' ? 'nexus-input-icon-left' : '',
    Icon && iconPosition === 'right' ? 'nexus-input-icon-right' : '',
    error ? 'nexus-input-error' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`nexus-input-wrapper ${className}`}>
      {label && <label className="nexus-input-label">{label}</label>}
      <div className="nexus-input-container">
        {Icon && iconPosition === 'left' && (
          <div className="nexus-input-icon nexus-input-icon-left-pos">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          className={inputClasses}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="nexus-input-icon nexus-input-icon-right-pos">
            <Icon size={18} />
          </div>
        )}
      </div>
      {error && <span className="nexus-input-error-text">{error}</span>}
    </div>
  );
};

// Checkbox Component
export const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  disabled = false,
  soundEnabled = true,
  className = '',
  ...props 
}) => {
  const handleChange = () => {
    if (disabled) return;
    if (soundEnabled) sounds.toggle();
    onChange?.(!checked);
  };

  const handleMouseEnter = () => {
    if (!disabled && soundEnabled) sounds.hover();
  };

  return (
    <div className={`nexus-checkbox-wrapper ${disabled ? 'nexus-checkbox-disabled' : ''} ${className}`}>
      <div
        className={`nexus-checkbox ${checked ? 'nexus-checkbox-checked' : ''}`}
        onClick={handleChange}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {checked && '✓'}
      </div>
      {label && (
        <label className="nexus-checkbox-label" onClick={handleChange}>
          {label}
        </label>
      )}
    </div>
  );
};

// Radio Component
export const Radio = ({ 
  checked = false, 
  onChange, 
  label, 
  name, 
  value,
  disabled = false,
  soundEnabled = true,
  className = '',
  ...props 
}) => {
  const handleChange = () => {
    if (disabled) return;
    if (soundEnabled) sounds.select();
    onChange?.(value);
  };

  const handleMouseEnter = () => {
    if (!disabled && soundEnabled) sounds.hover();
  };

  return (
    <div className={`nexus-radio-wrapper ${disabled ? 'nexus-radio-disabled' : ''} ${className}`}>
      <div
        className={`nexus-radio ${checked ? 'nexus-radio-checked' : ''}`}
        onClick={handleChange}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {checked && <div className="nexus-radio-dot" />}
      </div>
      {label && (
        <label className="nexus-radio-label" onClick={handleChange}>
          {label}
        </label>
      )}
    </div>
  );
};

// Card Component
export const Card = ({ 
  children, 
  title, 
  subtitle,
  variant = 'default',
  glowing = false,
  className = '',
  ...props 
}) => {
  const cardClasses = [
    'nexus-card',
    `nexus-card-${variant}`,
    glowing ? 'nexus-card-glowing' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {(title || subtitle) && (
        <div className="nexus-card-header">
          {title && <h3 className="nexus-card-title">{title}</h3>}
          {subtitle && <p className="nexus-card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="nexus-card-content">
        {children}
      </div>
    </div>
  );
};

// Select Component
export const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select option...',
  label,
  soundEnabled = true,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    if (soundEnabled) sounds.select();
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (soundEnabled) sounds.click();
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`nexus-select-wrapper ${className}`}>
      {label && <label className="nexus-select-label">{label}</label>}
      <div className="nexus-select-container">
        <div className="nexus-select" onClick={handleToggle}>
          <span className="nexus-select-value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`nexus-select-arrow ${isOpen ? 'nexus-select-arrow-open' : ''}`} size={18} />
        </div>
        {isOpen && (
          <div className="nexus-select-dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className={`nexus-select-option ${value === option.value ? 'nexus-select-option-selected' : ''}`}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => soundEnabled && sounds.hover()}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Toggle Component
export const Toggle = ({ 
  checked = false, 
  onChange, 
  label,
  disabled = false,
  soundEnabled = true,
  className = '',
  ...props 
}) => {
  const handleToggle = () => {
    if (disabled) return;
    if (soundEnabled) sounds.toggle();
    onChange?.(!checked);
  };

  const handleMouseEnter = () => {
    if (!disabled && soundEnabled) sounds.hover();
  };

  return (
    <div className={`nexus-toggle-wrapper ${disabled ? 'nexus-toggle-disabled' : ''} ${className}`}>
      <div
        className={`nexus-toggle ${checked ? 'nexus-toggle-checked' : ''}`}
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        <div className="nexus-toggle-slider" />
      </div>
      {label && (
        <label className="nexus-toggle-label" onClick={handleToggle}>
          {label}
        </label>
      )}
    </div>
  );
};

// Badge Component
export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const badgeClasses = [
    'nexus-badge',
    `nexus-badge-${variant}`,
    `nexus-badge-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

// Progress Component
export const Progress = ({ 
  value = 0, 
  max = 100,
  label,
  showValue = true,
  variant = 'default',
  className = '',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`nexus-progress-wrapper ${className}`}>
      {(label || showValue) && (
        <div className="nexus-progress-header">
          {label && <span className="nexus-progress-label">{label}</span>}
          {showValue && <span className="nexus-progress-value">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`nexus-progress nexus-progress-${variant}`} {...props}>
        <div 
          className="nexus-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Demo Component
const NexusUIDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('alpha');
  const [selectValue, setSelectValue] = useState('');
  const [toggleValue, setToggleValue] = useState(false);
  const [progress, setProgress] = useState(75);

  const selectOptions = [
    { value: 'neural-a', label: 'Neural Network Alpha' },
    { value: 'quantum-b', label: 'Quantum Processor Beta' },
    { value: 'ai-core-c', label: 'AI Core Gamma' },
    { value: 'cyber-d', label: 'Cyber Matrix Delta' }
  ];

  return (
    <div className="nexus-demo">
      <style jsx>{`
        .nexus-demo {
          min-height: 100vh;
          background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
          color: #00ff41;
          font-family: 'Courier New', monospace;
          padding: 20px;
        }

        /* CSS Variables */
        :root {
          --nexus-green: #00ff41;
          --nexus-blue: #00d4ff;
          --nexus-red: #ff6b6b;
          --nexus-yellow: #ffd43b;
          --nexus-purple: #b794f6;
        }

        /* Header */
        .nexus-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px;
          border: 2px solid var(--nexus-green);
          border-radius: 10px;
          background: rgba(0, 255, 65, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }

        .nexus-title {
          font-size: 3rem;
          margin: 0 0 10px 0;
          text-shadow: 0 0 10px var(--nexus-green);
          animation: nexus-glow 2s ease-in-out infinite alternate;
        }

        @keyframes nexus-glow {
          from { text-shadow: 0 0 10px var(--nexus-green); }
          to { text-shadow: 0 0 20px var(--nexus-green), 0 0 30px var(--nexus-green); }
        }

        .nexus-subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
          margin: 0;
        }

        /* Layout */
        .nexus-grid {
          display: grid;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .nexus-section {
          background: rgba(0, 255, 65, 0.02);
          border: 1px solid var(--nexus-green);
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
        }

        .nexus-section-title {
          color: var(--nexus-green);
          margin: 0 0 20px 0;
          font-size: 1.5rem;
          border-bottom: 1px solid var(--nexus-green);
          padding-bottom: 10px;
        }

        .nexus-demo-row {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          align-items: center;
          flex-wrap: wrap;
        }

        .nexus-demo-column {
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
          min-width: 200px;
        }

        .nexus-demo-group {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        /* Button Styles */
        .nexus-btn {
          background: transparent;
          border: 2px solid;
          cursor: pointer;
          border-radius: 5px;
          font-family: inherit;
          font-weight: bold;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .nexus-btn-sm { padding: 8px 16px; font-size: 0.875rem; }
        .nexus-btn-md { padding: 12px 24px; font-size: 1rem; }
        .nexus-btn-lg { padding: 16px 32px; font-size: 1.125rem; }

        .nexus-btn-primary {
          border-color: var(--nexus-green);
          color: var(--nexus-green);
        }

        .nexus-btn-primary:hover:not(.nexus-btn-disabled) {
          background: var(--nexus-green);
          color: #000;
          box-shadow: 0 0 15px var(--nexus-green);
          transform: translateY(-2px);
        }

        .nexus-btn-secondary {
          border-color: var(--nexus-blue);
          color: var(--nexus-blue);
        }

        .nexus-btn-secondary:hover:not(.nexus-btn-disabled) {
          background: var(--nexus-blue);
          color: #000;
          box-shadow: 0 0 15px var(--nexus-blue);
          transform: translateY(-2px);
        }

        .nexus-btn-danger {
          border-color: var(--nexus-red);
          color: var(--nexus-red);
        }

        .nexus-btn-danger:hover:not(.nexus-btn-disabled) {
          background: var(--nexus-red);
          color: #fff;
          box-shadow: 0 0 15px var(--nexus-red);
          transform: translateY(-2px);
        }

        .nexus-btn-ghost {
          border-color: transparent;
          color: var(--nexus-green);
        }

        .nexus-btn-ghost:hover:not(.nexus-btn-disabled) {
          border-color: var(--nexus-green);
          box-shadow: 0 0 10px var(--nexus-green);
        }

        .nexus-btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nexus-btn:active:not(.nexus-btn-disabled) {
          transform: translateY(0);
        }

        .nexus-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: nexus-spin 1s linear infinite;
        }

        @keyframes nexus-spin {
          to { transform: rotate(360deg); }
        }

        /* Input Styles */
        .nexus-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 100%;
        }

        .nexus-input-label {
          color: var(--nexus-green);
          font-size: 0.9rem;
          font-weight: bold;
        }

        .nexus-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .nexus-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--nexus-green);
          color: var(--nexus-green);
          padding: 12px;
          border-radius: 5px;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .nexus-input:focus {
          outline: none;
          box-shadow: 0 0 10px var(--nexus-green);
          border-color: var(--nexus-green);
        }

        .nexus-input-icon-left { padding-left: 48px; }
        .nexus-input-icon-right { padding-right: 48px; }

        .nexus-input-icon {
          position: absolute;
          color: var(--nexus-green);
          pointer-events: none;
          z-index: 1;
        }

        .nexus-input-icon-left-pos { left: 12px; }
        .nexus-input-icon-right-pos { right: 12px; cursor: pointer; pointer-events: auto; }

        .nexus-input-error {
          border-color: var(--nexus-red);
        }

        .nexus-input-error-text {
          color: var(--nexus-red);
          font-size: 0.8rem;
        }

        /* Checkbox Styles */
        .nexus-checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .nexus-checkbox-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nexus-checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid var(--nexus-green);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .nexus-checkbox-checked {
          background: var(--nexus-green);
          color: #000;
        }

        .nexus-checkbox:hover {
          box-shadow: 0 0 8px var(--nexus-green);
        }

        .nexus-checkbox-label {
          color: var(--nexus-green);
          cursor: pointer;
          user-select: none;
        }

        /* Radio Styles */
        .nexus-radio-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .nexus-radio-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nexus-radio {
          width: 20px;
          height: 20px;
          border: 2px solid var(--nexus-green);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .nexus-radio:hover {
          box-shadow: 0 0 8px var(--nexus-green);
        }

        .nexus-radio-dot {
          width: 8px;
          height: 8px;
          background: var(--nexus-green);
          border-radius: 50%;
        }

        .nexus-radio-label {
          color: var(--nexus-green);
          cursor: pointer;
          user-select: none;
        }

        /* Card Styles */
        .nexus-card {
          background: rgba(0, 255, 65, 0.02);
          border: 1px solid;
          border-radius: 10px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .nexus-card-default { border-color: var(--nexus-green); }
        .nexus-card-primary { border-color: var(--nexus-green); background: rgba(0, 255, 65, 0.05); }
        .nexus-card-secondary { border-color: var(--nexus-blue); background: rgba(0, 212, 255, 0.05); }
        .nexus-card-danger { border-color: var(--nexus-red); background: rgba(255, 107, 107, 0.05); }

        .nexus-card-glowing {
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }

        .nexus-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(0, 255, 65, 0.2);
        }

        .nexus-card-header {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--nexus-green);
        }

        .nexus-card-title {
          color: var(--nexus-green);
          margin: 0 0 5px 0;
          font-size: 1.3rem;
        }

        .nexus-card-subtitle {
          color: rgba(0, 255, 65, 0.7);
          margin: 0;
          font-size: 0.9rem;
        }

        .nexus-card-content {
          color: var(--nexus-green);
        }

        /* Select Styles */
        .nexus-select-wrapper {
          position: relative;
          width: 100%;
        }

        .nexus-select-label {
          color: var(--nexus-green);
          font-size: 0.9rem;
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }

        .nexus-select-container {
          position: relative;
        }

        .nexus-select {
          background: transparent;
          border: 1px solid var(--nexus-green);
          color: var(--nexus-green);
          padding: 12px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          min-width: 200px;
          width: 100%;
        }

        .nexus-select:hover {
          box-shadow: 0 0 10px var(--nexus-green);
        }

        .nexus-select-value {
          flex: 1;
        }

        .nexus-select-arrow {
          transition: transform 0.3s ease;
        }

        .nexus-select-arrow-open {
          transform: rotate(180deg);
        }

        .nexus-select-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #0c0c0c;
          border: 1px solid var(--nexus-green);
          border-top: none;
          border-radius: 0 0 5px 5px;
          z-index: 1000;
          max-height: 200px;
          overflow-y: auto;
        }

        .nexus-select-option {
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 255, 65, 0.1);
        }

        .nexus-select-option:hover {
          background: rgba(0, 255, 65, 0.1);
        }

        .nexus-select-option-selected {
          background: rgba(0, 255, 65, 0.2);
          font-weight: bold;
        }

        /* Toggle Styles */
        .nexus-toggle-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .nexus-toggle-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nexus-toggle {
          width: 50px;
          height: 24px;
          background: transparent;
          border: 2px solid var(--nexus-green);
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .nexus-toggle-checked {
          background: var(--nexus-green);
        }

        .nexus-toggle:hover {
          box-shadow: 0 0 8px var(--nexus-green);
        }

        .nexus-toggle-slider {
          width: 16px;
          height: 16px;
          background: var(--nexus-green);
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: all 0.3s ease;
        }

        .nexus-toggle-checked .nexus-toggle-slider {
          transform: translateX(26px);
          background: #000;
        }

        .nexus-toggle-label {
          color: var(--nexus-green);
          cursor: pointer;
          user-select: none;
        }

        /* Badge Styles */
        .nexus-badge {
          display: inline-flex;
          align-items: center;
          border: 1px solid;
          border-radius: 4px;
          font-weight: bold;
          white-space: nowrap;
        }

        .nexus-badge-sm { padding: 4px 8px; font-size: 0.75rem; }
        .nexus-badge-md { padding: 6px 12px; font-size: 0.875rem; }
        .nexus-badge-lg { padding: 8px 16px; font-size: 1rem; }

        .nexus-badge-default { border-color: var(--nexus-green); color: var(--nexus-green); }
        .nexus-badge-primary { border-color: var(--nexus-green); color: var(--nexus-green); background: rgba(0, 255, 65, 0.1); }
        .nexus-badge-secondary { border-color: var(--nexus-blue); color: var(--nexus-blue); background: rgba(0, 212, 255, 0.1); }
        .nexus-badge-danger { border-color: var(--nexus-red); color: var(--nexus-red); background: rgba(255, 107, 107, 0.1); }
        .nexus-badge-success { border-color: #10b981; color: #10b981; background: rgba(16, 185, 129, 0.1); }

        /* Progress Styles */
        .nexus-progress-wrapper {
          width: 100%;
        }

        .nexus-progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .nexus-progress-label {
          color: var(--nexus-green);
          font-size: 0.9rem;
        }

        .nexus-progress-value {
          color: var(--nexus-green);
          font-size: 0.9rem;
          font-weight: bold;
        }

        .nexus-progress {
          width: 100%;
          height: 12px;
          background: rgba(0, 255, 65, 0.1);
          border: 1px solid var(--nexus-green);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }

        .nexus-progress-fill {
          height: 100%;
          background: var(--nexus-green);
          transition: width 0.3s ease;
          position: relative;
        }

        .nexus-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: nexus-shimmer 2s infinite;
        }

        @keyframes nexus-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .nexus-progress-primary .nexus-progress-fill { background: var(--nexus-green); }
        .nexus-progress-secondary .nexus-progress-fill { background: var(--nexus-blue); }
        .nexus-progress-danger .nexus-progress-fill { background: var(--nexus-red); }
        .nexus-progress-success .nexus-progress-fill { background: #10b981; }

        /* Code Block */
        .nexus-code {
          background: rgba(0, 255, 65, 0.05);
          border: 1px solid var(--nexus-green);
          border-radius: 5px;
          padding: 15px;
          font-family: 'Courier New', monospace;
          color: var(--nexus-green);
          margin: 15px 0;
          overflow-x: auto;
          white-space: pre;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nexus-demo {
            padding: 10px;
          }
          
          .nexus-title {
            font-size: 2rem;
          }
          
          .nexus-demo-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .nexus-demo-group {
            justify-content: center;
          }
        }
      `}</style>

      <div className="nexus-header">
        <h1 className="nexus-title">⚡ NEXUS UI LIBRARY ⚡</h1>
        <p className="nexus-subtitle">Sci-Fi Component System v1.0 - Full Sound Effects Included</p>
      </div>

      <div className="nexus-grid">
        {/* Buttons Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">🔲 Buttons - All Variants & Sizes</h2>
          
          <div className="nexus-demo-row">
            <Button variant="primary" icon={Plus}>Primary Button</Button>
            <Button variant="secondary" icon={Settings}>Secondary</Button>
            <Button variant="danger" icon={Trash2}>Danger</Button>
            <Button variant="ghost" icon={Edit2}>Ghost</Button>
          </div>

          <div className="nexus-demo-row">
            <Button variant="primary" size="sm" icon={Save}>Small</Button>
            <Button variant="primary" size="md" icon={Star}>Medium</Button>
            <Button variant="primary" size="lg" icon={Shield}>Large</Button>
          </div>

          <div className="nexus-demo-row">
            <Button icon={Heart} iconPosition="right" variant="secondary">Icon Right</Button>
            <Button loading variant="primary">Loading State</Button>
            <Button disabled icon={X} variant="danger">Disabled</Button>
          </div>

          <div className="nexus-code">
{`<Button variant="primary" icon={Plus}>Primary Button</Button>
<Button variant="secondary" size="lg" icon={Settings}>Large Secondary</Button>
<Button variant="danger" icon={Trash2} disabled>Disabled Button</Button>
<Button loading>Loading...</Button>`}
          </div>
        </div>

        {/* Inputs Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">📝 Input Fields - With Icons & Validation</h2>
          
          <div className="nexus-demo-column">
            <Input
              label="Neural ID"
              placeholder="Enter your neural ID..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Input
              label="Search Database"
              placeholder="Search quantum database..."
              icon={Search}
              iconPosition="left"
            />

            <Input
              label="Email Address"
              placeholder="Enter your email..."
              icon={Mail}
              iconPosition="left"
              type="email"
            />

            <Input
              label="Secure Password"
              placeholder="Enter password..."
              icon={showPassword ? EyeOff : Eye}
              iconPosition="right"
              type={showPassword ? 'text' : 'password'}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              onMouseEnter={() => {
                const icon = document.querySelector('.nexus-input-icon-right-pos');
                if (icon) {
                  icon.style.cursor = 'pointer';
                  icon.onclick = () => setShowPassword(!showPassword);
                }
              }}
            />

            <Input
              label="Error Example"
              placeholder="This field has an error"
              error="Invalid quantum signature detected"
            />
          </div>

          <div className="nexus-code">
{`<Input
  label="Neural ID"
  placeholder="Enter your neural ID..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  icon={Search}
  iconPosition="left"
  error="Error message here"
/>`}
          </div>
        </div>

        {/* Checkboxes & Radios Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">☑️ Checkboxes & Radio Buttons</h2>
          
          <div className="nexus-demo-row">
            <div className="nexus-demo-column">
              <h3 style={{color: 'var(--nexus-green)', fontSize: '1.1rem', marginBottom: '10px'}}>Checkboxes</h3>
              <Checkbox
                checked={checkboxValue}
                onChange={setCheckboxValue}
                label="Enable Neural Interface"
              />
              <Checkbox
                checked={true}
                onChange={() => {}}
                label="Quantum Encryption (Always On)"
              />
              <Checkbox
                checked={false}
                onChange={() => {}}
                label="Standard Checkbox"
              />
              <Checkbox
                checked={false}
                disabled
                label="Disabled Checkbox"
              />
            </div>

            <div className="nexus-demo-column">
              <h3 style={{color: 'var(--nexus-green)', fontSize: '1.1rem', marginBottom: '10px'}}>Radio Buttons</h3>
              <Radio
                checked={radioValue === 'alpha'}
                onChange={(val) => setRadioValue(val)}
                label="Alpha Protocol"
                name="protocol"
                value="alpha"
              />
              <Radio
                checked={radioValue === 'beta'}
                onChange={(val) => setRadioValue(val)}
                label="Beta Protocol"
                name="protocol"
                value="beta"
              />
              <Radio
                checked={radioValue === 'gamma'}
                onChange={(val) => setRadioValue(val)}
                label="Gamma Protocol"
                name="protocol"
                value="gamma"
              />
              <Radio
                checked={false}
                disabled
                label="Disabled Radio"
                name="protocol"
                value="disabled"
              />
            </div>
          </div>

          <div className="nexus-code">
{`<Checkbox
  checked={checked}
  onChange={setChecked}
  label="Enable Neural Interface"
/>

<Radio
  checked={value === 'alpha'}
  onChange={(val) => setValue(val)}
  label="Alpha Protocol"
  name="protocol"
  value="alpha"
/>`}
          </div>
        </div>

        {/* Select & Toggle Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">🎛️ Select Dropdown & Toggle Switch</h2>
          
          <div className="nexus-demo-row">
            <div className="nexus-demo-column">
              <Select
                label="AI System Selection"
                options={selectOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Choose AI Core System..."
              />

              <Toggle
                checked={toggleValue}
                onChange={setToggleValue}
                label="Quantum Mode Enabled"
              />

              <Toggle
                checked={true}
                onChange={() => {}}
                label="Always Active System"
              />

              <Toggle
                checked={false}
                disabled
                label="Disabled Toggle"
              />
            </div>
          </div>

          <div className="nexus-code">
{`<Select
  label="AI System Selection"
  options={[
    { value: 'neural-a', label: 'Neural Network Alpha' },
    { value: 'quantum-b', label: 'Quantum Processor Beta' }
  ]}
  value={selectValue}
  onChange={setSelectValue}
  placeholder="Choose system..."
/>

<Toggle
  checked={toggleValue}
  onChange={setToggleValue}
  label="Quantum Mode Enabled"
/>`}
          </div>
        </div>

        {/* Cards Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">🗃️ Card Components - Multiple Variants</h2>
          
          <div className="nexus-demo-row">
            <Card
              title="Neural Network Status"
              subtitle="AI Core Alpha-7 System"
              variant="primary"
            >
              <p style={{marginBottom: '15px'}}>All neural pathways operating at optimal efficiency. System integrity at 98.7%.</p>
              <div className="nexus-demo-group">
                <Badge variant="success" size="sm">ONLINE</Badge>
                <Badge variant="primary" size="sm">AI-ENABLED</Badge>
              </div>
            </Card>

            <Card
              title="Quantum Processor"
              subtitle="Quantum Core Beta-3"
              variant="secondary"
              glowing
            >
              <p style={{marginBottom: '15px'}}>Quantum entanglement stable. Processing 2.3 × 10¹² operations per second.</p>
              <div className="nexus-demo-group">
                <Badge variant="secondary" size="sm">QUANTUM</Badge>
                <Badge variant="default" size="sm">ACTIVE</Badge>
              </div>
            </Card>
          </div>

          <Card variant="danger" title="⚠️ Security Alert" subtitle="Critical System Warning">
            <p style={{marginBottom: '15px'}}>Unauthorized access attempt detected on neural interface port 7734. Immediate action required.</p>
            <div className="nexus-demo-group">
              <Button variant="danger" size="sm" icon={Shield}>Activate Countermeasures</Button>
              <Badge variant="danger">CRITICAL</Badge>
            </div>
          </Card>

          <div className="nexus-code">
{`<Card
  title="Neural Network Status"
  subtitle="AI Core Alpha-7 System"
  variant="primary"
  glowing
>
  <p>Card content goes here...</p>
  <Badge variant="success">ONLINE</Badge>
</Card>`}
          </div>
        </div>

        {/* Badges Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">🏷️ Badge Components - Status Indicators</h2>
          
          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="success">Success</Badge>
            </div>
          </div>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Badge size="sm" variant="primary">Small Badge</Badge>
              <Badge size="md" variant="secondary">Medium Badge</Badge>
              <Badge size="lg" variant="success">Large Badge</Badge>
            </div>
          </div>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Badge variant="success">ONLINE</Badge>
              <Badge variant="danger">OFFLINE</Badge>
              <Badge variant="primary">PROCESSING</Badge>
              <Badge variant="secondary">STANDBY</Badge>
            </div>
          </div>

          <div className="nexus-code">
{`<Badge variant="primary">Primary</Badge>
<Badge variant="danger" size="lg">Large Danger</Badge>
<Badge variant="success" size="sm">Small Success</Badge>`}
          </div>
        </div>

        {/* Progress Bars Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">📊 Progress Bars - Animated Loading</h2>
          
          <div className="nexus-demo-column">
            <Progress
              value={progress}
              label="Neural Network Training Progress"
              variant="primary"
            />

            <Progress
              value={45}
              label="Quantum Synchronization"
              variant="secondary"
            />

            <Progress
              value={90}
              label="Security Protocol Initialization"
              variant="success"
            />

            <Progress
              value={25}
              label="Critical System Alert Level"
              variant="danger"
            />

            <div style={{marginTop: '20px'}}>
              <div className="nexus-demo-group">
                <Button
                  onClick={() => setProgress(Math.min(progress + 10, 100))}
                  icon={Plus}
                  size="sm"
                  variant="primary"
                >
                  Increase Progress
                </Button>
                <Button
                  onClick={() => setProgress(Math.max(progress - 10, 0))}
                  icon={X}
                  size="sm"
                  variant="secondary"
                >
                  Decrease Progress
                </Button>
                <Button
                  onClick={() => setProgress(Math.floor(Math.random() * 101))}
                  icon={Zap}
                  size="sm"
                  variant="ghost"
                >
                  Random
                </Button>
              </div>
            </div>
          </div>

          <div className="nexus-code">
{`<Progress
  value={75}
  max={100}
  label="Neural Network Training"
  variant="primary"
  showValue={true}
/>`}
          </div>
        </div>

        {/* Icons Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">🎯 Icon Support - Lucide React Library</h2>
          
          <p style={{marginBottom: '20px', color: 'rgba(0, 255, 65, 0.8)'}}>
            All components support icons from Lucide React. Pass any icon component as a prop.
          </p>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Button icon={Home} variant="primary">Home</Button>
              <Button icon={User} variant="primary">Profile</Button>
              <Button icon={Settings} variant="primary">Settings</Button>
              <Button icon={Bell} variant="primary">Alerts</Button>
            </div>
          </div>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Button icon={Play} variant="secondary">Play</Button>
              <Button icon={Pause} variant="secondary">Pause</Button>
              <Button icon={Volume2} variant="secondary">Volume</Button>
              <Button icon={VolumeX} variant="danger">Mute</Button>
            </div>
          </div>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Button icon={Mail} variant="ghost">Mail</Button>
              <Button icon={Phone} variant="ghost">Call</Button>
              <Button icon={Calendar} variant="ghost">Calendar</Button>
              <Button icon={Clock} variant="ghost">Time</Button>
            </div>
          </div>

          <div className="nexus-code">
{`import { Home, User, Settings, Bell, Search } from 'lucide-react';

<Button icon={Home} variant="primary">Home</Button>
<Button icon={Settings} variant="secondary">Settings</Button>
<Input icon={Search} placeholder="Search..." />`}
          </div>
        </div>

        {/* Sound System Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">🔊 Built-in Sound System</h2>
          
          <p style={{marginBottom: '20px', color: 'rgba(0, 255, 65, 0.8)'}}>
            Every component includes sci-fi sound effects using Web Audio API. Test them below:
          </p>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Button onClick={() => sounds.hover()} variant="primary" icon={Volume2}>
                Hover Sound
              </Button>
              <Button onClick={() => sounds.click()} variant="primary" icon={Volume2}>
                Click Sound
              </Button>
              <Button onClick={() => sounds.success()} variant="secondary" icon={Volume2}>
                Success Sound
              </Button>
              <Button onClick={() => sounds.error()} variant="danger" icon={Volume2}>
                Error Sound
              </Button>
            </div>
          </div>

          <div className="nexus-demo-row">
            <div className="nexus-demo-group">
              <Button onClick={() => sounds.toggle()} variant="ghost" icon={Volume2}>
                Toggle Sound
              </Button>
              <Button onClick={() => sounds.focus()} variant="ghost" icon={Volume2}>
                Focus Sound
              </Button>
              <Button onClick={() => sounds.select()} variant="ghost" icon={Volume2}>
                Select Sound
              </Button>
            </div>
          </div>

          <div className="nexus-code">
{`// Sounds play automatically on interaction:
// - hover: Mouse enters interactive elements
// - click: Button clicks and activations
// - focus: Input field receives focus
// - toggle: Checkbox/Radio/Toggle state changes
// - select: Dropdown option selection
// - success: Successful operations
// - error: Error states

// Disable sounds per component:
<Button soundEnabled={false}>Silent Button</Button>`}
          </div>
        </div>

        {/* Complete Example Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">📚 Complete Usage Example</h2>
          
          <Card title="User Registration Form" variant="primary" glowing>
            <div className="nexus-demo-column">
              <Input
                label="Full Name"
                placeholder="Enter your full name..."
                icon={User}
                iconPosition="left"
              />

              <Input
                label="Email Address"
                placeholder="your.email@nexus.ai"
                icon={Mail}
                iconPosition="left"
                type="email"
              />

              <Input
                label="Security Code"
                placeholder="Enter secure password..."
                icon={Shield}
                iconPosition="left"
                type="password"
              />

              <Select
                label="Access Level"
                options={[
                  { value: 'user', label: 'Standard User' },
                  { value: 'admin', label: 'Administrator' },
                  { value: 'root', label: 'Root Access' }
                ]}
                placeholder="Select access level..."
              />

              <Checkbox
                label="I agree to the Neural Interface Terms and Conditions"
              />

              <Checkbox
                label="Enable quantum encryption for all transmissions"
              />

              <div style={{marginTop: '20px'}}>
                <div className="nexus-demo-group">
                  <Button variant="primary" icon={Save} size="md">
                    Initialize Neural Link
                  </Button>
                  <Button variant="ghost" icon={X} size="md">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="nexus-code">
{`import { Save, User, Mail, Shield } from 'lucide-react';

function MyComponent() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  });

  return (
    <Card title="Registration" variant="primary" glowing>
      <Input
        label="Full Name"
        icon={User}
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      
      <Input
        label="Email"
        icon={Mail}
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      
      <Button variant="primary" icon={Save} onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
}`}
          </div>
        </div>

        {/* API Documentation Section */}
        <div className="nexus-section">
          <h2 className="nexus-section-title">📖 Component API Reference</h2>
          
          <div style={{color: 'rgba(0, 255, 65, 0.9)', lineHeight: '1.8'}}>
            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Button Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>variant</code>: "primary" | "secondary" | "danger" | "ghost" (default: "primary")</li>
              <li><code>size</code>: "sm" | "md" | "lg" (default: "md")</li>
              <li><code>icon</code>: Lucide React icon component</li>
              <li><code>iconPosition</code>: "left" | "right" (default: "left")</li>
              <li><code>loading</code>: boolean (shows spinner)</li>
              <li><code>disabled</code>: boolean</li>
              <li><code>soundEnabled</code>: boolean (default: true)</li>
              <li>Plus all standard HTML button props (onClick, onMouseEnter, etc.)</li>
            </ul>

            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Input Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>label</code>: string (field label)</li>
              <li><code>icon</code>: Lucide React icon component</li>
              <li><code>iconPosition</code>: "left" | "right" (default: "left")</li>
              <li><code>error</code>: string (error message to display)</li>
              <li><code>soundEnabled</code>: boolean (default: true)</li>
              <li>Plus all standard HTML input props (type, value, onChange, placeholder, etc.)</li>
            </ul>

            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Checkbox / Radio Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>checked</code>: boolean</li>
              <li><code>onChange</code>: function (receives new value)</li>
              <li><code>label</code>: string</li>
              <li><code>disabled</code>: boolean</li>
              <li><code>soundEnabled</code>: boolean (default: true)</li>
              <li>Radio also accepts: <code>name</code>, <code>value</code></li>
            </ul>

            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Card Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>title</code>: string</li>
              <li><code>subtitle</code>: string</li>
              <li><code>variant</code>: "default" | "primary" | "secondary" | "danger"</li>
              <li><code>glowing</code>: boolean (adds glow effect)</li>
            </ul>

            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Select Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>options</code>: Array of {`{value: string, label: string}`}</li>
              <li><code>value</code>: string (selected value)</li>
              <li><code>onChange</code>: function (receives selected value)</li>
              <li><code>label</code>: string</li>
              <li><code>placeholder</code>: string</li>
              <li><code>soundEnabled</code>: boolean (default: true)</li>
            </ul>

            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Badge Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>variant</code>: "default" | "primary" | "secondary" | "danger" | "success"</li>
              <li><code>size</code>: "sm" | "md" | "lg"</li>
            </ul>

            <h3 style={{color: 'var(--nexus-blue)', margin: '20px 0 15px 0', fontSize: '1.2rem'}}>Progress Props</h3>
            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
              <li><code>value</code>: number (current value)</li>
              <li><code>max</code>: number (default: 100)</li>
              <li><code>label</code>: string</li>
              <li><code>showValue</code>: boolean (default: true)</li>
              <li><code>variant</code>: "default" | "primary" | "secondary" | "danger" | "success"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusUIDemo;