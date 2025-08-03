import { pgTable, text, timestamp, boolean, integer, varchar, primaryKey, PgTableWithColumns } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified'),
  image: text('image'),
  username: text('username').unique().notNull(),
  password: text('password'),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Posts table
export const posts = pgTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  content: text('content').notNull(),
  published: boolean('published').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  authorId: text('authorId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  mediaUrls: text('mediaUrls').array(), // Array of image URLs
})

// Comments table
export const comments: PgTableWithColumns<any> = pgTable('comments', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  authorId: text('authorId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  postId: text('postId').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  parentId: text('parentId').references(() => comments.id),
})

// Likes table
export const likes = pgTable('likes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  postId: text('postId').notNull().references(() => posts.id, { onDelete: 'cascade' }),
}, (table) => ({
  userIdPostIdPk: primaryKey({ columns: [table.userId, table.postId] }),
}))

// Comment likes table
export const commentLikes = pgTable('comment_likes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  commentId: text('commentId').notNull().references(() => comments.id, { onDelete: 'cascade' }),
}, (table) => ({
  userIdCommentIdPk: primaryKey({ columns: [table.userId, table.commentId] }),
}))

// Reposts table
export const reposts = pgTable('reposts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  postId: text('postId').notNull().references(() => posts.id, { onDelete: 'cascade' }),
}, (table) => ({
  userIdPostIdPk: primaryKey({ columns: [table.userId, table.postId] }),
}))

// Bookmarks table
export const bookmarks = pgTable('bookmarks', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  postId: text('postId').notNull().references(() => posts.id, { onDelete: 'cascade' }),
}, (table) => ({
  userIdPostIdPk: primaryKey({ columns: [table.userId, table.postId] }),
}))

// Follows table
export const follows = pgTable('follows', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  followerId: text('followerId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followingId: text('followingId').notNull().references(() => users.id, { onDelete: 'cascade' }),
}, (table) => ({
  followerIdFollowingIdPk: primaryKey({ columns: [table.followerId, table.followingId] }),
}))

// Notifications table
export const notifications = pgTable('notifications', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  type: text('type').notNull(),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  relatedUserId: text('relatedUserId'),
  relatedPostId: text('relatedPostId'),
  relatedCommentId: text('relatedCommentId'),
})

// Hashtags table
export const hashtags = pgTable('hashtags', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Post hashtags junction table
export const postHashtags = pgTable('post_hashtags', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  postId: text('postId').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  hashtagId: text('hashtagId').notNull().references(() => hashtags.id, { onDelete: 'cascade' }),
}, (table) => ({
  postIdHashtagIdPk: primaryKey({ columns: [table.postId, table.hashtagId] }),
}))

// Conversations table
export const conversations = pgTable('conversations', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Conversation participants table
export const conversationParticipants = pgTable('conversation_participants', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt').defaultNow(),
  conversationId: text('conversationId').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  leftAt: timestamp('leftAt'),
}, (table) => ({
  conversationIdUserIdPk: primaryKey({ columns: [table.conversationId, table.userId] }),
}))

// Messages table
export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  conversationId: text('conversationId').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: text('senderId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  readAt: timestamp('readAt'),
})

// NextAuth tables
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (table) => ({
  providerProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
}))

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionToken: text('sessionToken').unique().notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
})

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').unique().notNull(),
  expires: timestamp('expires').notNull(),
}, (table) => ({
  identifierTokenPk: primaryKey({ columns: [table.identifier, table.token] }),
}))

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  commentLikes: many(commentLikes),
  reposts: many(reposts),
  bookmarks: many(bookmarks),
  followers: many(follows, { relationName: 'UserFollowers' }),
  following: many(follows, { relationName: 'UserFollowing' }),
  notifications: many(notifications),
  conversationParticipants: many(conversationParticipants),
  messages: many(messages),
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
  reposts: many(reposts),
  bookmarks: many(bookmarks),
  hashtags: many(postHashtags),
}))

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  replies: many(comments),
  likes: many(commentLikes),
}))

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}))

export const commentLikesRelations = relations(commentLikes, ({ one }) => ({
  user: one(users, {
    fields: [commentLikes.userId],
    references: [users.id],
  }),
  comment: one(comments, {
    fields: [commentLikes.commentId],
    references: [comments.id],
  }),
}))

export const repostsRelations = relations(reposts, ({ one }) => ({
  user: one(users, {
    fields: [reposts.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [reposts.postId],
    references: [posts.id],
  }),
}))

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [bookmarks.postId],
    references: [posts.id],
  }),
}))

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: 'UserFollowers',
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: 'UserFollowing',
  }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

export const hashtagsRelations = relations(hashtags, ({ many }) => ({
  posts: many(postHashtags),
}))

export const postHashtagsRelations = relations(postHashtags, ({ one }) => ({
  post: one(posts, {
    fields: [postHashtags.postId],
    references: [posts.id],
  }),
  hashtag: one(hashtags, {
    fields: [postHashtags.hashtagId],
    references: [hashtags.id],
  }),
}))

export const conversationsRelations = relations(conversations, ({ many }) => ({
  participants: many(conversationParticipants),
  messages: many(messages),
}))

export const conversationParticipantsRelations = relations(conversationParticipants, ({ one }) => ({
  conversation: one(conversations, {
    fields: [conversationParticipants.conversationId],
    references: [conversations.id],
  }),
  user: one(users, {
    fields: [conversationParticipants.userId],
    references: [users.id],
  }),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
})) 