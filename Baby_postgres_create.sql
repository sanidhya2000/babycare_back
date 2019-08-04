CREATE TABLE "Users" (
	"uuid" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"Password" varchar(255),
	"mobile_number" int(255),
	CONSTRAINT "Users_pk" PRIMARY KEY ("uuid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "User_detail" (
	"uuid" varchar(255) NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Date_of_joining" DATE(255) NOT NULL,
	"City" varchar(255),
	CONSTRAINT "User_detail_pk" PRIMARY KEY ("uuid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "baby_reg_details" (
	"uuid" varchar(255) NOT NULL,
	"baby_name" varchar(255) NOT NULL,
	"fathers_name" varchar(255) NOT NULL,
	"mothers_name" varchar(255) NOT NULL,
	"date_of_birth" DATE(255) NOT NULL,
	"gender" varchar(255) NOT NULL,
	"avtar_link" varchar(255) DEFAULT 'DEFAULT_VALUE'
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Blogs" (
	"uuid" varchar(255) NOT NULL,
	"blog_id" serial(255) NOT NULL,
	"blog_title" varchar(255) NOT NULL,
	"blog_sub_title" varchar(255),
	"blog_content" varchar(255),
	"image_link" varchar(255),
	"video_link" varchar(255),
	"description" varchar(255),
	CONSTRAINT "Blogs_pk" PRIMARY KEY ("blog_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Doctors" (
	"doctor_id" varchar(255) NOT NULL,
	"doctor_name" varchar(255) NOT NULL,
	"doctor_specialization" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"mobile_number" int(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"clinic_timings" varchar(255) NOT NULL,
	"doctor_description" varchar(255),
	"image" varchar(255) DEFAULT 'EXISTS',
	CONSTRAINT "Doctors_pk" PRIMARY KEY ("doctor_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "overall_growth_ideal" (
	"id" serial(255) NOT NULL,
	"duration" int(255) NOT NULL UNIQUE,
	"height" float8(255) NOT NULL,
	"weight" float8(255) NOT NULL,
	CONSTRAINT "overall_growth_ideal_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "overall_growth_user" (
	"uuid" varchar(255) NOT NULL,
	"entry_id" serial(255) NOT NULL,
	"date" DATE(255) NOT NULL,
	"height" float8(255) NOT NULL,
	"weight" float8(255) NOT NULL,
	CONSTRAINT "overall_growth_user_pk" PRIMARY KEY ("entry_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Vaccinations_ideal" (
	"vaccination_id" serial NOT NULL,
	"vaccination_name" varchar(255) NOT NULL,
	"duration" int(255) NOT NULL,
	"user_added" bool(255),
	CONSTRAINT "Vaccinations_ideal_pk" PRIMARY KEY ("vaccination_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Vaccinations_user" (
	"uuid" varchar(255) NOT NULL,
	"vaccination_id" varchar(255) NOT NULL,
	"expected_date" DATE(255),
	"user_response" bool(255) NOT NULL DEFAULT 'NO',
	"user_response" DATE(255)
) WITH (
  OIDS=FALSE
);



CREATE TABLE "nutrition_calorie_ideal" (
	"id" serial NOT NULL,
	"item_id" serial(255) NOT NULL,
	"item_name" varchar(255) NOT NULL,
	"month_1" varchar(255) NOT NULL,
	"month_2" varchar(255) NOT NULL,
	"month_3" varchar(255) NOT NULL,
	"month_4" varchar(255) NOT NULL,
	"month_5" varchar(255) NOT NULL,
	"month_6" varchar(255) NOT NULL,
	"month_7" varchar(255) NOT NULL,
	"month_8" varchar(255) NOT NULL,
	"month_9" varchar(255) NOT NULL,
	"month_10" varchar(255) NOT NULL,
	"month_11" varchar(255) NOT NULL,
	"month_12" varchar(255) NOT NULL,
	CONSTRAINT "nutrition_calorie_ideal_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "nutrition_calorie_user" (
	"uuid" varchar(255) NOT NULL,
	"item_id" int(255) NOT NULL,
	"date_of_entry" DATE(255) NOT NULL,
	"amount" int(255) NOT NULL DEFAULT '0'
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Notes" (
	"uuid" varchar(255) NOT NULL,
	"note_id" serial(255) NOT NULL,
	"note_text" TEXT(255) NOT NULL,
	CONSTRAINT "Notes_pk" PRIMARY KEY ("note_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "User_detail" ADD CONSTRAINT "User_detail_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");

ALTER TABLE "baby_reg_details" ADD CONSTRAINT "baby_reg_details_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");

ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");



ALTER TABLE "overall_growth_user" ADD CONSTRAINT "overall_growth_user_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");


ALTER TABLE "Vaccinations_user" ADD CONSTRAINT "Vaccinations_user_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");
ALTER TABLE "Vaccinations_user" ADD CONSTRAINT "Vaccinations_user_fk1" FOREIGN KEY ("vaccination_id") REFERENCES "Vaccinations_ideal"("vaccination_id");


ALTER TABLE "nutrition_calorie_user" ADD CONSTRAINT "nutrition_calorie_user_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");
ALTER TABLE "nutrition_calorie_user" ADD CONSTRAINT "nutrition_calorie_user_fk1" FOREIGN KEY ("item_id") REFERENCES "nutrition_calorie_ideal"("id");

ALTER TABLE "Notes" ADD CONSTRAINT "Notes_fk0" FOREIGN KEY ("uuid") REFERENCES "Users"("uuid");

