# Contributing to NexusMart

Thank you for your interest in contributing to NexusMart! We welcome issues, feature suggestions, and pull requests to help improve the platform.

## Development Workflow

1. Fork or clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your local environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Run Prisma database migrations (if database is configured):
   ```bash
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Pull Request Guidelines

- Ensure your code adheres to standard React / Next.js practices.
- Write meaningful commit messages following the Conventional Commits specification.
- Test your modifications locally before creating a pull request.