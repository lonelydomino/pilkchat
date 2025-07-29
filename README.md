# Bluesky Clone

A modern, decentralized social media platform built with Next.js, TypeScript, and PostgreSQL.

## Features

- 🔐 User authentication and profiles
- 📝 Create, read, update, delete posts
- 👥 Follow/unfollow users
- ❤️ Like/unlike posts
- 🔄 Repost functionality
- 💬 Comments and replies
- 🔔 Real-time notifications
- 📱 Responsive design
- 🔍 Search functionality
- 🏷️ Hashtags and mentions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Caching**: Redis
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- Redis (optional for development)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bluesky-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bluesky_clone"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main app pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── types/                # TypeScript types
└── hooks/                # Custom React hooks
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:studio` - Open Prisma Studio

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details # pilkchat
