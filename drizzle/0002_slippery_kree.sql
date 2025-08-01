CREATE TABLE "comment_likes" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"userId" text NOT NULL,
	"commentId" text NOT NULL,
	CONSTRAINT "comment_likes_userId_commentId_pk" PRIMARY KEY("userId","commentId")
);
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "mediaUrls" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_commentId_comments_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;