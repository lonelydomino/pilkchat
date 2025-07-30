# Pilk Chat Setup Guide

## Prerequisites

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **PostgreSQL** - Download from [postgresql.org](https://www.postgresql.org/)
3. **Git** - Download from [git-scm.com](https://git-scm.com/)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
cp env.example .env.local
```

Edit `.env.local` and update the database URL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/pilk_chat"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set Up Database

Create a PostgreSQL database:
```bash
createdb pilk_chat
```

Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Development Server

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

## Features Implemented

✅ **Landing Page** - Beautiful hero section with sign up/login
✅ **User Authentication** - Sign up and login forms
✅ **Dashboard Layout** - Sidebar navigation and header
✅ **Post Creation** - Create new posts with character limit
✅ **Post Feed** - Display posts with author info and timestamps
✅ **Post Interactions** - Like and repost functionality
✅ **Database Schema** - Complete Prisma schema for social media features
✅ **API Routes** - RESTful API for posts and authentication
✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## Next Steps

1. **Add Real Authentication** - Implement NextAuth.js with proper sessions
2. **Add Comments** - Implement comment system with nested replies
3. **Add User Profiles** - User profile pages with bio, avatar, etc.
4. **Add Search** - Search for users and posts
5. **Add Notifications** - Real-time notifications for interactions
6. **Add Media Upload** - Image and video upload functionality
7. **Add Direct Messages** - Private messaging between users
8. **Add Hashtags** - Hashtag system for categorizing posts
9. **Add Real-time Updates** - WebSocket integration for live updates
10. **Add Testing** - Unit and integration tests

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma client

## Database Management

View and edit your database with Prisma Studio:
```bash
npx prisma studio
```

Reset your database:
```bash
npx prisma db push --force-reset
```

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env.local`
- Ensure the database exists: `createdb pilk_chat`

### Port Already in Use
- Change the port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

### Prisma Issues
- Regenerate the client: `npx prisma generate`
- Reset the database: `npx prisma db push --force-reset`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 