---
name: Academic Guidance System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434656'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004ced'
  primary: '#003ec7'
  on-primary: '#ffffff'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#4a5e88'
  on-secondary: '#ffffff'
  secondary-container: '#bacfff'
  on-secondary-container: '#435881'
  tertiary: '#3737c5'
  on-tertiary: '#ffffff'
  tertiary-container: '#5153de'
  on-tertiary-container: '#e3e2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#b2c6f7'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#32466f'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 64px
---

## Brand & Style
The design system embodies a **Corporate Modern** aesthetic tailored for higher education and professional development. It focuses on establishing immediate trust through a structured, clean, and balanced layout. The brand personality is authoritative yet supportive, characterized by generous whitespace that reduces cognitive load during the mentor selection process.

Key visual identifiers include high-clarity iconography, a systematic use of blue tones to represent institutional stability, and a sophisticated "stepper" journey that gamifies the user's progress without losing professional integrity.

## Colors
The palette is anchored by **Deep Navy (#001A41)** for primary brand elements and headings, ensuring strong legibility and an institutional feel. **Vibrant Blue (#0052FF)** serves as the primary action color, used for buttons, active states, and progress indicators. 

A refined neutral scale ranging from white to slate grays provides the foundation for card backgrounds and borders. Semantic colors (green for availability, amber for pending) are used sparingly to communicate status without overwhelming the professional color harmony.

## Typography
The system utilizes a dual-font approach to balance character with utility. **Plus Jakarta Sans** is used for headings and brand touchpoints to provide a modern, friendly, and geometric feel. **Inter** is the workhorse for body copy and data-dense mentor profiles, chosen for its exceptional legibility at small sizes.

Hierarchy is established through significant weight shifts. Large display titles use tight letter spacing and heavy weights to command attention, while labels utilize uppercase styling and bold weights to clearly define metadata sections.

## Layout & Spacing
The layout follows a **Fixed Grid** system centered on a 1280px max-width container for desktop. A 12-column structure is used, with sidebars (filters) typically occupying 3 columns and main content areas occupying 9 columns.

Spacing follows an 8px base grid. Layouts prioritize vertical rhythm with consistent gaps between sections (64px) and smaller, grouped spacing within cards (16px–24px). On mobile, the grid collapses to a single column with 16px side margins, and the horizontal "Step Progress" component transforms into a condensed or scrollable variant.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and subtle **Ambient Shadows**. The primary background is a very light neutral (#F8FAFC), while interactive cards use a pure white surface (#FFFFFF) with a soft, 10% opacity blue-tinted shadow to appear "lifted."

A "low-contrast outline" technique (1px border in #E2E8F0) is used for secondary elements like input fields and inactive cards. High-priority elements, such as the active step in a journey or a selected mentor card, utilize a thicker 2px primary blue border to eliminate ambiguity.

## Shapes
The shape language is consistently **Rounded**. A standard radius of 0.5rem (8px) is applied to all primary cards, buttons, and input fields. This softened geometry balances the professional "corporate" colors to make the platform feel more approachable.

Buttons and specific tag elements may utilize a fully rounded (pill) shape to distinguish them from structural layout components like filters or profile containers.

## Components

### Buttons
- **Primary:** Solid #0052FF background, white text, 8px radius. Includes a trailing arrow icon for "forward" actions.
- **Secondary:** White background with a 1px #0052FF border and blue text.
- **Ghost:** No background or border, used for "Reset" or "Back" actions.

### Progress Stepper
A horizontal connector line (dashed for future steps, solid blue for completed) linking circular nodes. Active nodes are enlarged with an inner icon and a soft glow effect. Completed nodes feature a checkmark.

### Cards
- **Mentor Card:** White surface, 8px radius, subtle shadow. Features a circular avatar with a status dot indicator, horizontal tag clusters for skills, and a clear "View Profile" call-to-action.
- **Field Card:** Centered icon with a tinted background (e.g., light blue for Computing, light orange for Engineering) to provide visual categorization.

### Inputs & Filters
- **Search Bar:** Large padding with a leading magnifying glass icon.
- **Filter Groups:** Accordion-style headers with "plus" icons for expansion.
- **Chips/Tags:** Small, rounded containers with low-opacity background tints matching the category's primary hue.