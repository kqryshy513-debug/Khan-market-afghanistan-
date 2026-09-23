# Khan Market Afghanistan Foundation

This repository now includes the minimum production-grade foundation required to support the planned roadmap while preserving the documented recovery status.

## What is included

- Next.js application shell
- Database foundation using Prisma + SQLite
- Authentication and session handling
- RBAC foundation for CUSTOMER, SELLER, ADMIN, OWNER
- API validation and secure error handling
- Localization structure for English, Pashto, and Dari
- RTL/LTR-aware layout structure
- Responsive shell and placeholder application areas
- Audit logging foundation
- Testing scaffolding
- Documentation for setup and usage

## Important notes

- This is the foundation scope only. Phase 08 and later features are intentionally excluded.
- External services remain `NOT_CONFIGURED — credentials/configuration required` unless real values are supplied.
- No fake providers, fake payments, fake orders, or fake data were introduced.

## Setup

1. Copy `.env.example` to `.env` and set real values.
2. Install dependencies using your package manager.
3. Run Prisma generation and migrations.
4. Start the app.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run migrate`
- `npm run db:push`

## Default environment

The default database is SQLite and environment values are intentionally safe placeholders. Real deployments must set their own secure credentials.

## External integrations

- Storage: `NOT_CONFIGURED — credentials/configuration required`
- Payment: `NOT_CONFIGURED — credentials/configuration required`
- Delivery: `NOT_CONFIGURED — credentials/configuration required`
- Email: `NOT_CONFIGURED — credentials/configuration required`
