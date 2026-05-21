# Nutri Ally — Frontend Infrastructure

## Tech Stack

| Layer            | Technology                          | Version   |
|------------------|-------------------------------------|-----------|
| Framework        | Next.js (App Router)                | 15.2.1    |
| Language         | TypeScript (strict mode)            | 5.7.3     |
| React            | React 19                            | 19.0.0    |
| UI Library       | Mantine                             | 7.16.0    |
| Auth             | NextAuth v5 (beta) + Prisma adapter | 5.0.0-b25 |
| ORM              | Prisma                              | 6.3.1     |
| File Storage     | AWS S3                              | 3.731.1   |
| CSS              | CSS Modules + PostCSS               | —         |
| Data Fetching    | SWR                                 | 2.3.0     |
| Charts           | Recharts + Mantine Charts           | 2.15.1    |
| Observability    | OpenTelemetry / Vercel OTEL         | —         |
| Icons            | Tabler Icons                        | 3.29.0    |
| Fonts            | Geist Sans / Geist Mono (local)     | —         |

---

## Directory Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.js               # Root layout (fonts, metadata, Providers)
│   ├── Providers.tsx            # Client provider stack
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles + utility classes
│   ├── fonts/                   # Local Geist font files (.woff)
│   │
│   ├── auth/                   # Sign-in page
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   ├── auth.js             # NextAuth config (exported `auth` helper)
│   │   └── _components/        # Auth-specific components
│   │
│   ├── gallery/                # Food gallery (browse + search)
│   │   ├── page.tsx            # Server component — fetches food list
│   │   ├── client.tsx          # Client listing view
│   │   ├── layout.js           # Parallel route layout (@modal, @recommendation)
│   │   ├── loading.js          # Suspense fallback
│   │   ├── [food]/             # Dynamic food detail page
│   │   ├── @modal/(.)[food]/   # Intercepted route modal
│   │   ├── @recommendation/    # Parallel slot — food recommendations
│   │   └── _components/        # FoodCard, SearchBar
│   │
│   ├── dashboard/              # Nutrition dashboard
│   │   ├── page.tsx            # Server component — reads cookie targets
│   │   ├── client.tsx          # Client dashboard view
│   │   └── _components/        # MacrosChart, MacroSlider, NutrientIndicator
│   │
│   ├── mealscart/              # Meal basket / cart
│   │   ├── page.tsx            # Server component — session check
│   │   ├── client.tsx          # Client cart view
│   │   └── _components/        # MealCard, FoodItem, SavedMeals
│   │
│   ├── profile/                # User profile page
│   │   ├── page.tsx            # Server component — session guard
│   │   └── client.tsx          # Client profile form + avatar upload
│   │
│   └── api/                    # API routes (still .js)
│       ├── auth/               # NextAuth handler, actions, deleteAccount
│       ├── fetch_food_data/    # Food data fetch + server actions
│       ├── meals/              # Meal CRUD + server actions
│       ├── nutrition/          # Nutrition calculation endpoint
│       ├── s3/                 # S3 upload handler + server actions
│       └── search/             # Food search endpoint
│
├── components/                 # Shared components
│   ├── navigation/             # NavBar (server) + NavbarClient
│   ├── modal/                  # Modal wrapper
│   ├── profile/                # CropAvatar (forwardRef)
│   ├── shared/                 # MacrosDisplay
│   └── typography/             # TextVariants (Mantine Text.withProps presets)
│
├── context/                    # React context
│   ├── BasketContext.ts        # createContext<BasketContextType | null>
│   └── BasketProvider.tsx      # Provider with add/update/remove item
│
├── hooks/                      # Custom hooks
│   ├── useBasket.ts            # Typed basket context hook
│   └── useNutritionalInfo.ts   # Returns Partial<NutritionData>
│
├── theme/                      # Mantine theme overrides
│   ├── index.ts                # mergeThemeOverrides(typography, colors, components)
│   ├── colors.ts               # leaf / sand / coral palettes + semantic tokens
│   ├── typography.ts           # Geist font, clamp() headings, rem() sizes, shadows
│   └── components/             # Per-component overrides
│       ├── index.ts            # Merges button + text + input
│       ├── button/             # Button transition + active transform
│       ├── text/               # Text variant styles (lg-bold, md-regular, etc.)
│       └── input/              # Filled variant + focus ring
│
├── types/
│   ├── domain/
│   │   ├── index.ts            # MealItem, MealBasket, FoodItem, DailyIntake, etc.
│   │   └── constants.ts        # macroNutrients, microNutrients, getDailyRecommendedIntake
│   └── next-auth.d.ts          # Module augmentation for User (gender, birthday, etc.)
│
├── middleware.js                # Auth guard for /profile
└── instrumentation.js          # OpenTelemetry setup
```

---

## Provider Stack

Order matters — outermost to innermost:

```
SessionProvider          (next-auth session)
  └─ MantineProvider     (theme + color scheme)
       └─ Notifications  (toast notifications)
            └─ BasketProvider  (meal cart state)
                 └─ Navbar     (app shell + navigation)
                      └─ {children}
```

---

## Theme System

Three composable layers merged via `mergeThemeOverrides`:

### Colors (`theme/colors.ts`)
- **Primary:** `leaf` (green) — 10-shade palette, primary shade 6
- **Accent:** `sand` (gold/amber) — 10-shade palette
- **Alert:** `coral` (orange-red) — 10-shade palette
- **Semantic tokens** in `theme.other`: `background`, `surface`, `border`, `text`, `muted`, `primary`, `accent`, etc.

### Typography (`theme/typography.ts`)
- Font: Geist Sans (local woff), fallback to system sans-serif
- Headings: `clamp()` fluid sizing from h1 (2.8–4.8rem) to h6 (18px)
- Font sizes: xs(13) / sm(14) / md(16) / lg(18) / xl(20) in rem
- Shadows: green-tinted with increasing blur (8px → 54px)

### Component Overrides (`theme/components/`)
- **Button:** Transition on background/transform, active press (-1px translateY)
- **Text:** Variants via `classNames` — `lg-bold`, `md-regular`, `sm-medium`, `xs-bold`
- **Input:** Filled variant with leaf-colored focus ring

### Text Presets (`components/typography/TextVariants.ts`)
Pre-configured `Text.withProps()` exports: `TextLgBold`, `TextMdRegular`, `TextSmMedium`, `TextXsBold`.

---

## Global CSS (`globals.css`)

### CSS Custom Properties
```
--app-background      #f4efe5     warm paper
--app-surface         rgba(…)     glassmorphism card fill
--app-border          rgba(…)     subtle green-tinted border
--app-text            #213127     dark forest green
--app-muted           #667868     secondary text
--app-primary         #4b9068     main green
--app-accent          #cb984d     gold highlight
--app-shadow          …           card shadow
```

### Utility Classes
| Class             | Purpose                                      |
|-------------------|----------------------------------------------|
| `.page-shell`     | Max-width 1180px centered container           |
| `.page-shell--wide` | Max-width 1280px variant                   |
| `.page-stack`     | Vertical flex with 1.5rem gap                 |
| `.section-card`   | Glassmorphic card (blur + border + shadow)    |
| `.subtle-card`    | Muted background card, no blur                |
| `.eyebrow`        | Uppercase pill label (green on light green)   |
| `.page-header`    | Flex row, space-between, wraps                |
| `.page-heading`   | Column flex for eyebrow + title + copy        |
| `.metric-pill`    | Inline stat badge                             |
| `.list-reset`     | Remove list styling                           |
| `.app-shell-main` | Content area below 92px navbar                |

---

## Routing Patterns

### Server/Client Split
Every page follows the same pattern:
- `page.tsx` — **server component** (data fetching, auth checks, cookie reads)
- `client.tsx` — **client component** (interactivity, state, event handlers)

The server component fetches data and passes it as props to the client component.

### Parallel Routes (Gallery)
- `@recommendation` — shows food recommendations alongside the gallery
- `@modal` — intercepted route for food detail modal overlay
- `default.tsx` files handle unmatched parallel slots

### Protected Routes
- `/profile` is protected by `middleware.js` (redirects to `/auth` if no session)

---

## Data Flow

### Authentication
NextAuth v5 (beta) with Prisma adapter. Providers configured in `app/auth/auth.js`. Session available server-side via `auth()`, client-side via `useSession()`.

### Meal Basket (Client State)
`BasketProvider` holds `MealBasket` state (`{ breakfast, lunch, dinner }`) in React context. Components use the `useBasket()` hook to add, update, or remove `MealItem` entries.

### Nutrition Calculations
`getDailyRecommendedIntake()` in `types/domain/constants.ts` computes daily intake targets using Mifflin-St Jeor BMR equation, adjustable by user profile (gender, weight, height, age, activity level) and macro overrides.

### API Routes (Backend-for-Frontend)
All under `src/app/api/`:
- **Food data** — fetches from external food database (OpenFoodFacts)
- **Search** — search endpoint for food items
- **Meals** — CRUD operations for saved meals (Prisma-backed)
- **Nutrition** — nutrition analysis calculations
- **S3** — avatar image upload/retrieval
- **Auth** — authentication actions, account deletion

---

## PostCSS Configuration

```js
plugins: {
  'postcss-preset-mantine': { autoRem: true },
  'postcss-simple-vars': {
    variables: {
      'mantine-breakpoint-xs': '36em',
      'mantine-breakpoint-sm': '48em',
      'mantine-breakpoint-md': '62em',
      'mantine-breakpoint-lg': '75em',
      'mantine-breakpoint-xl': '88em',
    }
  }
}
```

`autoRem: true` converts px values in CSS Modules to rem automatically.

---

## Next.js Configuration

- **React Strict Mode:** enabled
- **Styled Components compiler:** enabled (legacy, can be removed)
- **Remote Images:** `images.openfoodfacts.org` whitelisted for product photos
- **Fonts:** Geist Sans + Geist Mono loaded locally via `next/font/local`

---

## External Integrations

| Service          | Purpose                   | Notes                          |
|------------------|---------------------------|--------------------------------|
| OpenFoodFacts    | Food product database     | Remote images + API            |
| AWS S3           | Avatar image storage      | Upload via API route           |
| Prisma / DB      | User data, saved meals    | Adapter for NextAuth           |
| Google Tag Manager | Analytics               | GTM-TNCF4GJC                  |
| Resend           | Email auth provider       | Magic link sign-in             |

---

## Files Still in JavaScript

API routes, middleware, and auth config remain as `.js`:
- `src/app/api/**/*.js` (12 files)
- `src/middleware.js`
- `src/instrumentation.js`
- `src/app/auth/auth.js`
- `src/app/gallery/layout.js`, `loading.js`
- `src/app/layout.js`

These are candidates for a future TypeScript conversion pass.
