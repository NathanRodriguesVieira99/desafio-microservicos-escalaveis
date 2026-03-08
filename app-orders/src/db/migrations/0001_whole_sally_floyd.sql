CREATE TABLE "costumers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL,
	"country" text NOT NULL,
	"date_of_birth" date,
	CONSTRAINT "costumers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_costumer_id_costumers_id_fk" FOREIGN KEY ("costumer_id") REFERENCES "public"."costumers"("id") ON DELETE no action ON UPDATE no action;