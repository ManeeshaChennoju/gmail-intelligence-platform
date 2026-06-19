# Gmail Intelligence Platform

An AI-powered Gmail Intelligence Platform that integrates with Gmail using OAuth 2.0 and Gmail APIs to provide intelligent email management, summarization, categorization, AI-assisted composition, AI-powered replies, and conversational email search.

---

## Features

### Gmail Integration

- Google OAuth 2.0 Authentication
- Gmail API Integration
- Inbox Synchronization
- Email Metadata Extraction
- Email Storage in PostgreSQL
- Incremental Sync Support
- Thread Awareness

### Email Summarization

- Individual Email Summaries
- Context-Aware Summaries
- Thread-Level Understanding

### Email Categorization

Supported Categories:

- Finance
- Notifications
- Job / Recruitment
- Newsletters
- Personal
- Work / Professional

### AI Chat Agent

Ask questions such as:

- Show finance emails
- Show security emails
- Show job emails
- Show newsletters
- Summarize project discussions

### Compose Email

Generate professional emails from natural language prompts.

Examples:

- Write a leave request email
- Write a follow-up email
- Write a business proposal

### Reply Assistant

- Select existing email
- Generate contextual reply
- Send reply directly through Gmail
- Copy generated reply

### Dashboard

- Total Emails
- Finance Emails
- Notifications
- Promotions
- AI Search

---

## Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Sonner

### Backend

- Next.js API Routes

### Database

- PostgreSQL (Neon)
- Prisma ORM

### Authentication

- NextAuth
- Google OAuth 2.0

### AI

- Gemini 2.0 Flash

### Email Services

- Gmail API
- Google APIs SDK

---

## Project Structure

app/

├── dashboard/

├── compose/

├── reply/

├── api/

│ ├── auth/

│ ├── emails/

│ ├── compose/

│ ├── reply/

│ ├── chat/

│ ├── stats/

│ └── process-emails/

├── lib/

│ └── prisma.ts

prisma/

└── schema.prisma

---

## Environment Variables

Create a .env file:

```env
DATABASE_URL=

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GEMINI_API_KEY=
```

## Installation

```bash
npm install
```

## Database Setup

```bash
npx prisma generate
npx prisma db push
```

## Run Application

```bash
npm run dev
```

Application URL:

```text
http://localhost:3000
```

## Assignment Highlights

- Gmail OAuth Integration
- Gmail API Usage
- AI Email Summarization
- AI Reply Generation
- Email Categorization
- Conversational Email Search
- PostgreSQL Storage
- Thread Awareness
- Real Email Sending
