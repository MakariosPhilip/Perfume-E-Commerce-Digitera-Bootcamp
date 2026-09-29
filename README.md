# Digitera Bootcamp 1

This project is a complete e-commerce solution split into two main applications:

- Frontend: Next.js storefront
- CMS: Sanity Studio dashboard

The goal of the project is to display products, manage content, and handle cart and checkout flow in an organized way using a feature-based architecture in the frontend.

---

## 1. Overview

### The project consists of:

- website/: the main frontend application (Next.js)
- dashboard/: content management panel using Sanity Studio

### Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- Jest
- Cypress
- ESLint + Prettier
- Sanity CMS
- pnpm

---

## 2. Project structure

```text
digitera-bootcamp-1/
├── dashboard/            # Sanity Studio
│   ├── schemaTypes/
│   ├── scripts/
│   ├── static/
│   ├── sanity.config.ts
│   ├── package.json
│   └── ...
│
├── website/              # Frontend app
│   ├── src/
│   ├── public/
│   ├── cypress/
│   ├── docs/
│   ├── package.json
│   └── ...
│
├── README.md             # Main project documentation
└── ...
```

### Description of each section

#### website/
This is the public storefront built with Next.js App Router.

It includes:

- product pages
- product detail pages
- shopping cart
- checkout flow
- shared components
- feature layers such as products and cart
- integration services with Sanity

#### dashboard/
This is the CMS admin panel built with Sanity Studio.

It includes:

- schema definitions
- categories
- occasions
- products
- scent families
- product options
- scripts for data, image, and catalog management

---

## 3. Prerequisites

Make sure you have:

- Node.js 20 or newer
- pnpm 10 or newer
- Git

It is recommended to enable Corepack:

```bash
corepack enable
```

---

## 4. Installation

### 1) Clone the project

```bash
git clone <repository-url>
cd digitera-bootcamp-1
```

### 2) Install dependencies

From the project root, run:

```bash
pnpm install
```

If each project is managed independently, you can also install dependencies inside each folder:

```bash
cd website
pnpm install

cd ../dashboard
pnpm install
```

> In this project, pnpm is the official package manager.

---

## 5. Environment variables

### website app

Create a .env.local file inside the website folder:

```bash
cd website
copy .env.example .env.local
```

If .env.example does not exist, create the file manually with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_USE_MOCK_API=true
```

### Important notes

- Do not commit secrets to Git
- Use .env.local only during development
- Some public variables such as NEXT_PUBLIC_* are exposed to the browser and are visible to clients

### dashboard app

The projectId and dataset are configured in:

```text
dashboard/sanity.config.ts
```

In the current version:

```ts
projectId: 'snek8u82'
dataset: 'production'
```

If the project is moved to a different Sanity account or a new project is created, these values must be updated.

---

## 6. Running the project

### 6.1 Start the frontend website

From inside the website folder:

```bash
cd website
pnpm dev
```

Then open the browser at:

```text
http://localhost:3000
```

### 6.2 Start the Sanity Studio dashboard

From inside the dashboard folder:

```bash
cd dashboard
pnpm dev
```

Sanity Studio usually opens in the browser through a local URL similar to:

```text
http://localhost:3333
```

---

## 7. Available scripts

### website package scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:watch
pnpm test:e2e
pnpm cypress:open
```

### dashboard package scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm deploy
pnpm deploy-graphql
pnpm seed
pnpm import-images
pnpm replace-catalog
pnpm typegen
```

---

## 8. Frontend details

### Application structure in website/src

```text
src/
├── app/
│   ├── cart/
│   ├── checkout/
│   ├── products/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── shared/
│   └── ui/
│
├── config/
│   └── env.ts
│
├── features/
│   ├── cart/
│   └── products/
│
├── lib/
│   ├── api/
│   └── utils/
│
├── sanity/
│   ├── client.ts
│   ├── image.ts
│   └── queries.ts
```

### Design approach

The project follows a feature-based architecture where:

- each feature contains:
  - components/
  - hooks/
  - services/
  - store/
  - types/
  - utils/
  - index.ts

This reduces duplication and prevents logic overlap between sections.

### Included features

- product listing page
- product detail page
- shopping cart
- total calculation
- cart item removal
- cart state updates using Zustand
- data fetching with TanStack Query
- unit testing support with Jest
- end-to-end testing with Cypress

---

## 9. Sanity CMS details

### Dashboard project

Sanity is used to store and manage data such as:

- categories
- occasions
- products
- scent families
- product options

### Core schema files

```text
dashboard/schemaTypes/
├── documents/
│   ├── category.ts
│   ├── occasion.ts
│   └── product.ts
├── objects/
│   └── product-option.ts
├── shared/
│   ├── define-taxonomy.ts
│   └── slug.ts
├── index.ts
```

### Data structure notes

- each schema is defined in the schemaTypes folder
- structure is used to configure the admin interface
- visionTool is available for querying and testing data

---

## 10. Data queries and Sanity client

The frontend communicates with Sanity through:

```text
website/src/sanity/client.ts
```

It uses:

```ts
createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-09-23',
  useCdn: process.env.NODE_ENV === 'production',
})
```

This means the application requires a valid Sanity project and a correct dataset to function properly.

---

## 11. Development and testing workflow

### Run type checks and validation

```bash
cd website
pnpm typecheck
pnpm lint
pnpm test
```

### End-to-end testing

The app must be running before executing E2E tests:

```bash
cd website
pnpm dev
pnpm test:e2e
```

Or:

```bash
pnpm cypress:open
```

---

## 12. Important notes

- Do not place secrets inside NEXT_PUBLIC_* variables because they are exposed to the browser
- Do not write business logic directly in app/ when it fits better inside a feature
- Use shared components only when they are genuinely reusable
- Do not mix cart and product logic in the same file if there is a separate feature boundary
- Keep the project organized to reduce merge conflicts in team workflows

---

## 13. Quick start

### Run the storefront only

```bash
cd website
pnpm install
pnpm dev
```

### Run the CMS dashboard

```bash
cd dashboard
pnpm install
pnpm dev
```

### Build the app for production

```bash
cd website
pnpm build
pnpm start
```

---

## 14. Common issues

### 1) Sanity connection errors

Check that:

- the projectId is valid
- the dataset is correct
- the .env.local values are configured properly

### 2) The app does not open on localhost:3000

Check that:

- Next.js is running inside the website folder
- pnpm install was completed successfully
- port 3000 is not already in use

### 3) Sanity Studio does not start

Check that:

- dependencies are installed inside dashboard
- sanity.config.ts is configured correctly
- access permissions to the Sanity project are valid

---

## 15. Summary

This project combines:

- a modern e-commerce storefront using Next.js
- a product content system using Sanity
- a clean division between frontend and CMS logic
- a scalable structure suitable for professional development

If you are working in a team, this project is well organized for parallel development, making it easier to split tasks while minimizing code conflicts.

---

## 16. Quick references

- Website app: `website/`
- Dashboard app: `dashboard/`
- Main frontend README: `website/README.md`
- App routes: `website/src/app/`
- Features: `website/src/features/`
- Sanity config: `dashboard/sanity.config.ts`
