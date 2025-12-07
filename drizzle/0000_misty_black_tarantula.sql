CREATE TABLE "otaquiz_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "otaquiz_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "otaquiz_game" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"isFinished" boolean DEFAULT false NOT NULL,
	"animes" jsonb NOT NULL,
	"answers" jsonb,
	"currentAnimeIndex" integer DEFAULT 0 NOT NULL,
	"isShowingResult" boolean DEFAULT false NOT NULL,
	"userId" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "otaquiz_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "otaquiz_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "otaquiz_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "otaquiz_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "otaquiz_account" ADD CONSTRAINT "otaquiz_account_userId_otaquiz_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."otaquiz_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "otaquiz_game" ADD CONSTRAINT "otaquiz_game_userId_otaquiz_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."otaquiz_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "otaquiz_session" ADD CONSTRAINT "otaquiz_session_userId_otaquiz_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."otaquiz_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "otaquiz_account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "otaquiz_session" USING btree ("userId");