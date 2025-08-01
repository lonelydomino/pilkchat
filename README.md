# Pilk Chat

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
- 🔖 **Bookmarks system** - Save and organize posts for later reading

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
cd pilk-chat
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
DATABASE_URL="postgresql://username:password@localhost:5432/pilk_chat"

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
└── types/                # TypeScript types
```

## Bookmarks Feature

The bookmarks system allows users to:

- **Save posts** by clicking the bookmark icon on any post
- **View saved posts** in a dedicated bookmarks page
- **Remove bookmarks** by clicking the bookmark icon again
- **See bookmark count** in the sidebar navigation
- **Get notifications** when bookmarking/unbookmarking posts
- **Refresh bookmarks** to see the latest saved posts

### API Endpoints

- `GET /api/bookmarks` - Fetch user's bookmarked posts
- `POST /api/posts/[id]/bookmark` - Toggle bookmark status

### Components

- `BookmarksPage` - Main bookmarks page with loading states and error handling
- `PostCard` - Enhanced with bookmark functionality
- `ToastContainer` - Toast notifications for user feedback
- `Sidebar` - Shows bookmark count in navigation

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma client

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
