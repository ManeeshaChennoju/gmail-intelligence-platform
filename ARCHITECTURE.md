# System Architecture

## High-Level Flow

```text
User
 ↓
Next.js Frontend
 ↓
API Routes
 ↓
Google OAuth
 ↓
Gmail API
 ↓
PostgreSQL (Neon)
 ↓
Gemini AI
```

---

## Authentication Flow

```text
User Login
 ↓
Google OAuth
 ↓
NextAuth
 ↓
Access Token
 ↓
Gmail API Access
```

---

## Email Sync Flow

```text
Gmail Inbox
 ↓
Gmail API
 ↓
Message Fetch
 ↓
Email Processing
 ↓
Prisma ORM
 ↓
PostgreSQL
```

Stored Data:

- Gmail Message ID
- Thread ID
- Subject
- Sender
- Body
- Summary
- Category

---

## Email Processing Flow

```text
Raw Email
 ↓
Summary Generation
 ↓
Category Detection
 ↓
Database Update
```

Supported Categories:

- Finance
- Notifications
- Job / Recruitment
- Newsletters
- Personal
- Work / Professional

---

## Compose Flow

```text
User Prompt
 ↓
Gemini AI
 ↓
Generated Draft
 ↓
Review
 ↓
Copy / Send
```

Fallback templates are used when AI generation is unavailable.

---

## Reply Flow

```text
Select Email
 ↓
Fetch Email Context
 ↓
Generate AI Reply
 ↓
Review
 ↓
Send via Gmail API
```

---

## Chat Agent Flow

```text
User Question
 ↓
Database Search
 ↓
Email Filtering
 ↓
Response Generation
 ↓
Dashboard Display
```

The agent only uses synced email data as its knowledge source.

---

## Database Design

### User

| Field | Type |
|---------|---------|
| id | String |
| name | String |
| email | String |

### Email

| Field | Type |
|---------|---------|
| id | String |
| gmailId | String |
| threadId | String |
| subject | String |
| sender | String |
| body | String |
| summary | String |
| category | String |
| userId | String |

---

## Scalability Considerations

- Gmail Pagination
- Incremental Sync
- Thread-Based Processing
- Database Indexing
- API Rate Limit Handling
- Gmail Quota Management