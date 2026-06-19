# Gmail Intelligence Platform

An AI-powered Gmail Intelligence Platform that integrates with Gmail using Google OAuth 2.0 and Gmail APIs to provide intelligent email management, categorization, AI-assisted email composition, AI-powered replies, and conversational email search.

---

## Live Demo

**Vercel Deployment:**

https://gmail-intelligence-platform-495qk8h9j.vercel.app/
---

## Features

### Gmail Integration

* Google OAuth 2.0 Authentication
* Gmail API Integration
* Inbox Synchronization
* Email Metadata Extraction
* Email Storage in PostgreSQL
* Thread Awareness
* Multi-User Support
* User-Specific Email Isolation

### Email Categorization

Automatically categorizes emails into:

* Finance
* Notifications
* Job / Recruitment
* Newsletters
* Personal
* Work / Professional

### AI Email Search

Ask questions about your inbox using natural language.

Examples:

* Show finance emails
* Show notification emails
* Show job emails
* Show newsletters
* Show work emails
* Show personal emails

### AI Email Composer

Generate professional emails from simple prompts.

Examples:

* Write a leave request email
* Write a follow-up email
* Write a meeting request email
* Write a business proposal

### AI Reply Assistant

* Select an email from your inbox
* Generate contextual AI replies
* Copy generated reply
* Send reply directly through Gmail

### Dashboard Analytics

* Total Emails
* Finance Emails
* Notifications
* Newsletters
* Job / Recruitment Emails
* Conversational Email Search

---

## Technology Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4
* Sonner (Toast Notifications)

### Backend

* Next.js API Routes

### Database

* PostgreSQL (Neon)
* Prisma ORM

### Authentication

* NextAuth.js
* Google OAuth 2.0

### AI

* Google Gemini 2.0 Flash

### Email Services

* Gmail API
* Google APIs SDK

### Deployment

* Vercel

---

## Project Architecture

```text
app/

├── dashboard/
├── compose/
├── reply/

├── api/
│   ├── auth/
│   ├── emails/
│   ├── emails/list/
│   ├── compose/
│   ├── reply/
│   ├── reply/send/
│   ├── chat/
│   ├── stats/
│   ├── threads/
│   └── process-emails/

├── lib/
│   └── prisma.ts

prisma/
└── schema.prisma
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GEMINI_API_KEY=
```

---

## Installation

```bash
npm install
```

---

## Database Setup

```bash
npx prisma generate
npx prisma db push
```

---

## Run Application

```bash
npm run dev
```

Application URL:

```text
http://localhost:3000
```

---

## Assignment Highlights

* Google OAuth 2.0 Authentication
* Gmail API Integration
* AI Email Categorization
* AI Email Composer
* AI Reply Assistant
* Conversational Email Search
* PostgreSQL Database Integration
* Prisma ORM
* Multi-User Support
* User-Specific Email Isolation
* Real Gmail Email Sending
* Production Deployment on Vercel

---

## Future Enhancements

* Advanced AI Email Summarization
* Semantic Email Search
* Email Priority Detection
* Smart Follow-Up Suggestions
* Attachment Analysis
* Gmail Label Management
* Real-Time Email Synchronization
* Analytics Dashboard Enhancements

```
```
