# Master Prompt for Claude: Build African Creators ServiceFlow Platform

> **Instructions for Claude**: You are an elite principal engineer and systems architect. Your task is to build a production-ready, full-stack Service Automation & Booking Platform named **ServiceFlow** inside this Next.js 16 App Router codebase. Follow all guidelines below to write clean, type-safe, production-grade TypeScript code.

---

## 🎨 Design System & Aesthetics
- **Theme**: Luxury Dark Obsidian (`#050505`), Card Background (`#090909`), Primary Accent Gold (`#C5A059`), Foreground (`#FDFCF0`), Muted Text (`#8C8C82`), Borders (`#1F1F1F`).
- **Typography**: Playfair Display / Georgia (Serif for headers) & Outfit / Helvetica (Sans-serif for UI & body).
- **Libraries**: Tailwind CSS v4, `lucide-react` icons, `motion/react` for smooth scroll reveals and 3D transitions.

---

## 🏗️ Technical Architecture & Core Specifications

Build the following 5 core modules:

### 1. Data Models & Type Definitions (`types/serviceflow.ts`)
Define TypeScript interfaces for:
- `Merchant`: `id`, `name`, `slug`, `email`, `phone`, `city`, `logoUrl`, `sageApiKey`, `xeroTenantId`, `payfastMerchantId`.
- `ServiceItem`: `id`, `merchantId`, `title`, `description`, `category`, `basePrice`, `pricingModel` (`FLAT_FEE` | `PER_ROOM` | `HOURLY`), `durationMinutes`.
- `Booking`: `id`, `merchantId`, `serviceId`, `clientName`, `clientPhone`, `clientEmail`, `address`, `bookingDate`, `timeSlot`, `status`, `totalZar`.
- `Invoice`: `id`, `bookingId`, `invoiceNumber`, `amountZar`, `depositAmount`, `paymentStatus` (`UNPAID` | `DEPOSIT_PAID` | `PAID`), `payfastUrl`, `sageSyncStatus`.

### 2. Interactive Customer Booking Portal (`app/book/[merchant]/page.tsx`)
A 4-step wizard UI for clients:
- **Step 1: Service Selection**: Grid of services (Pest Control, Plumbing, Electrical, Cleaning).
- **Step 2: Property & Scope Input**: Dynamic inputs (number of bedrooms, bathrooms, square meters, address).
- **Step 3: Real-Time Quote & Calendar Slot Selector**:
  - Live calculated price in ZAR based on property scope.
  - Interactive date picker & 30-minute time slot reservation grid.
- **Step 4: Invoice & Payment Deposit**:
  - Instant PDF invoice preview.
  - PayFast / SnapScan checkout deposit button.
  - Automatic WhatsApp booking confirmation dispatch.

### 3. Merchant Admin Dashboard (`app/dashboard/page.tsx`)
A comprehensive management portal for business owners:
- **Analytics Bar**: Total Monthly Revenue (ZAR), Active Bookings, Hours Reclaimed, Pending Invoices.
- **Dispatch Calendar**: Interactive technician schedule & booking status list (`QUOTE_SENT`, `DEPOSIT_PAID`, `DISPATCHED`, `COMPLETED`).
- **Accounting Sync Hub**: One-click manual/automated sync to Sage Accounting & Xero.
- **WhatsApp Template Settings**: Customize automated booking confirmations, 24-hour reminders, and payment receipts.

### 4. API Routes (`app/api/v1/`)
- `POST /api/v1/quote`: Accepts service parameters and returns instant calculated quote.
- `POST /api/v1/booking`: Saves booking, reserves calendar slot, and sends Google Calendar invite.
- `POST /api/v1/invoice`: Generates PDF invoice & triggers Sage/Xero API webhook.
- `POST /api/v1/whatsapp`: Webhook for Meta WhatsApp Cloud API to send automated messages.

### 5. Utility Integrations (`lib/`)
- `lib/pdf-generator.ts`: Clean server-side PDF invoice builder.
- `lib/sage-xero.ts`: Sage & Xero API sync handlers.
- `lib/whatsapp.ts`: WhatsApp Cloud API message dispatcher.

---

## 🎯 Execution Checklist for Claude
1. Create `types/serviceflow.ts` with all strict interfaces.
2. Build `lib/pdf-generator.ts` and `lib/whatsapp.ts`.
3. Create the customer booking portal at `app/book/[merchant]/page.tsx`.
4. Build the merchant admin dashboard at `app/dashboard/page.tsx`.
5. Implement all `/api/v1/` routes with error handling.
6. Verify production build with `npm run build`.
