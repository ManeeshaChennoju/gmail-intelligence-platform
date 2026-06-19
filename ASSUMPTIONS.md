# Assumptions

## Gmail Access

The application assumes users grant Gmail API permissions during OAuth authentication.

## Email Categorization

Categorization is currently based on keyword-driven classification logic and can be extended with AI classification.

## Summarization

Summaries are generated from available email content and snippets.

## AI Generation

Gemini AI is used for:

- Compose Email
- Reply Generation

Fallback templates are provided when AI services are unavailable.

## Thread Awareness

Emails are stored with Gmail Thread IDs to support thread-based operations.

## Database

PostgreSQL (Neon) is used as the persistent storage layer.

## Security

OAuth tokens are managed through NextAuth and are not stored manually by the application.