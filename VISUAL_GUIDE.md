# 🎨 Visual Guide - Spouse Feature

## Before & After

### Before (No Spouse Support)
```
┌─────────────────────────┐
│  👑 Gen 1               │
│  👤 John Chikwape       │
│  🎂 Born: 1950-01-15    │
│  👪 Parent: None        │
└─────────────────────────┘
```

### After (With Spouse Support)
```
┌─────────────────────────┐
│  👑 Gen 1               │
│  👤 John Chikwape       │
│  🎂 Born: 1950-01-15    │
│  👪 Parent: None        │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│  💕 PARTNER             │
│  ┌───────────────────┐  │
│  │ 👤 Mary Smith     │  │
│  │ 💍 1975-06-10     │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

## UI Components

### 1. Member Card (Main)
- **Color**: Gradient (purple, pink, blue, etc.)
- **Size**: 280-340px wide
- **Content**: Name, birth date, generation, parent
- **Hover**: Lifts up with shadow

### 2. Spouse Card (New!)
- **Color**: Pink theme (#FFF5F7 background)
- **Border**: 2px solid pink (#FED7E2)
- **Size**: Fits within member card
- **Content**: Name, marriage/birth date
- **Icon**: 💕 heart emoji

## Color Scheme

### Member Cards by Generation
```
Gen 1: Purple gradient  (#667eea → #764ba2)
Gen 2: Pink gradient    (#f093fb → #f5576c)
Gen 3: Blue gradient    (#4facfe → #00f2fe)
Gen 4: Green gradient   (#43e97b → #38f9d7)
Gen 5: Orange gradient  (#fa709a → #fee140)
```

### Spouse Cards (All Generations)
```
Background: Pink.50     (#FFF5F7)
Border: Pink.200        (#FED7E2)
Text: Gray.800          (#1A202C)
Avatar: Pink.400        (#F687B3)
```

## Layout Examples

### Single Spouse
```
┌─────────────────────────────┐
│ John Chikwape               │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ 💕 PARTNER                  │
│ ┌─────────────────────────┐ │
│ │ 👤 Mary Smith           │ │
│ │ 💍 Married: 1975-06-10  │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Multiple Spouses (Remarriage)
```
┌─────────────────────────────┐
│ David Chikwape              │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ 💕 PARTNERS (2)             │
│ ┌─────────────────────────┐ │
│ │ 👤 Sarah Johnson        │ │
│ │ 💍 Married: 2000-04-20  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 👤 Lisa Brown           │ │
│ │ 💍 Married: 2015-09-12  │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Partner (No Marriage Date)
```
┌─────────────────────────────┐
│ Emma Chikwape               │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ 💕 PARTNER                  │
│ ┌─────────────────────────┐ │
│ │ 👤 Michael Davis        │ │
│ │ 🎂 Born: 2000-07-22     │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Responsive Behavior

### Desktop (> 768px)
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Parent   │  │ Parent   │  │ Parent   │
│ + Spouse │  │ + Spouse │  │ + Spouse │
└──────────┘  └──────────┘  └──────────┘
     │             │             │
     └─────────────┴─────────────┘
              │
     ┌────────┴────────┐
     │                 │
┌──────────┐      ┌──────────┐
│ Child    │      │ Child    │
│ + Spouse │      │ + Spouse │
└──────────┘      └──────────┘
```

### Mobile (< 768px)
```
┌──────────┐
│ Parent   │
│ + Spouse │
└──────────┘
     │
┌──────────┐
│ Child 1  │
│ + Spouse │
└──────────┘
     │
┌──────────┐
│ Child 2  │
│ + Spouse │
└──────────┘
```

## Animations

### Card Entrance
```
1. Fade in (opacity: 0 → 1)
2. Scale up (scale: 0.9 → 1)
3. Slide up (y: 20px → 0)
Duration: 0.4s
```

### Hover Effect
```
1. Lift up (translateY: 0 → -4px)
2. Shadow grows (10px → 20px blur)
3. Background tint appears
Duration: 0.2s
```

### Connecting Lines
```
1. Draw from top (scaleY: 0 → 1)
2. Stagger children (delay: 0.1s each)
Duration: 0.3-0.5s
```

## Icons Used

| Icon | Meaning | Where |
|------|---------|-------|
| 🦓 | Zebra (family totem) | Header, footer |
| 👑 | Generation 1 | Gen badges |
| 💎 | Generation 2 | Gen badges |
| ⭐ | Generation 3 | Gen badges |
| ✨ | Generation 4+ | Gen badges |
| 💕 | Love/Partnership | Spouse section |
| 💍 | Marriage | Marriage date |
| 🎂 | Birthday | Birth date |
| 👪 | Family | Parent reference |
| 👤 | Person | Avatar fallback |

## Spacing & Sizing

### Card Dimensions
```
Width:
  Mobile:  280px
  Tablet:  300px
  Desktop: 320-340px

Padding:
  Card:    20px (5 in Chakra)
  Section: 12px (3 in Chakra)

Gaps:
  Between cards:    32px (8 in Chakra)
  Between spouses:  8px (2 in Chakra)
  Between sections: 12px (3 in Chakra)
```

### Typography
```
Member Name:
  Mobile:  18px (lg)
  Desktop: 20-24px (xl)
  Weight:  Bold (700)

Spouse Name:
  Size:    14px (sm)
  Weight:  Semibold (600)

Dates:
  Size:    12px (xs)
  Weight:  Normal (400)

Generation Badge:
  Size:    10-12px (xs)
  Weight:  Bold (700)
```

## Border Styles

### Member Cards
```
Border: 1px solid
Color:  Gray.200 (#E2E8F0)
Radius: 16px (2xl)
Shadow: 0 10px 30px rgba(0,0,0,0.15)
```

### Spouse Cards
```
Border: 2px solid
Color:  Pink.200 (#FED7E2)
Radius: 12px (xl)
Shadow: 0 4px 12px rgba(0,0,0,0.08)
```

### Spouse Section Divider
```
Border: 2px dashed
Color:  Pink.200 (#FED7E2)
Style:  Top border only
```

## Accessibility

### Color Contrast
- Text on white: ✅ WCAG AAA
- Pink cards: ✅ WCAG AA
- Gradient text: ✅ WCAG AA

### Interactive Elements
- Hover states: ✅ Clear visual feedback
- Focus states: ✅ Keyboard navigation
- Touch targets: ✅ Minimum 44x44px

### Screen Readers
- Semantic HTML: ✅ Proper structure
- Alt text: ✅ Avatar fallbacks
- ARIA labels: ✅ Where needed

## Print Styles

When printing the family tree:
```css
- Background: White
- Orientation: Landscape
- Margins: 1cm
- Colors: Preserved
- Shadows: Reduced
```

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers
✅ Tablet browsers

## Performance

- Animations: GPU accelerated
- Images: Lazy loaded
- Rendering: Optimized with React
- Bundle size: Minimal impact

---

This visual guide helps you understand how the spouse feature looks and behaves in the UI! 🎨
