-- Drop table

-- DROP TABLE "babyBack".baby_reg_details;

CREATE TABLE "babyBack".baby_reg_details (
	uuid varchar(255) NOT NULL,
	baby_name varchar(255) NOT NULL,
	fathers_name varchar(255) NOT NULL,
	mothers_name varchar(255) NOT NULL,
	date_of_birth date NOT NULL,
	gender varchar(255) NOT NULL,
	avtar_link varchar(255) NULL DEFAULT 'DEFAULT_VALUE'::character varying,
	CONSTRAINT baby_reg_details_fk0 FOREIGN KEY (uuid) REFERENCES users(uuid)
);

-- Drop table

-- DROP TABLE "babyBack".blogs;

CREATE TABLE "babyBack".blogs (
	uuid varchar(255) NOT NULL,
	blog_id serial NOT NULL,
	blog_title varchar(255) NOT NULL,
	blog_sub_title varchar(255) NULL,
	blog_content varchar(255) NULL,
	image_link varchar(255) NULL,
	video_link varchar(255) NULL,
	description varchar(255) NULL,
	CONSTRAINT blogs_pk PRIMARY KEY (blog_id),
	CONSTRAINT blogs_fk0 FOREIGN KEY (uuid) REFERENCES users(uuid)
);

-- Drop table

-- DROP TABLE "babyBack".doctors;

CREATE TABLE "babyBack".doctors (
	doctor_id varchar(255) NOT NULL,
	doctor_name varchar(255) NOT NULL,
	doctor_specialization varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	mobile_number int4 NOT NULL,
	address varchar(255) NOT NULL,
	clinic_timings varchar(255) NOT NULL,
	doctor_description varchar(255) NULL,
	image varchar(255) NULL DEFAULT 'EXISTS'::character varying,
	CONSTRAINT doctors_pk PRIMARY KEY (doctor_id)
);

-- Drop table

-- DROP TABLE "babyBack".notes;

CREATE TABLE "babyBack".notes (
	uuid varchar(255) NOT NULL,
	note_id serial NOT NULL,
	note_text text NOT NULL,
	CONSTRAINT notes_pk PRIMARY KEY (note_id),
	CONSTRAINT notes_fk0 FOREIGN KEY (uuid) REFERENCES users(uuid)
);

-- Drop table

-- DROP TABLE "babyBack".nutrition_calorie_ideal;

CREATE TABLE "babyBack".nutrition_calorie_ideal (
	id serial NOT NULL,
	item_id serial NOT NULL,
	item_name varchar(255) NOT NULL,
	month_1 varchar(255) NOT NULL,
	month_2 varchar(255) NOT NULL,
	month_3 varchar(255) NOT NULL,
	month_4 varchar(255) NOT NULL,
	month_5 varchar(255) NOT NULL,
	month_6 varchar(255) NOT NULL,
	month_7 varchar(255) NOT NULL,
	month_8 varchar(255) NOT NULL,
	month_9 varchar(255) NOT NULL,
	month_10 varchar(255) NOT NULL,
	month_11 varchar(255) NOT NULL,
	month_12 varchar(255) NOT NULL,
	CONSTRAINT nutrition_calorie_ideal_pk PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE "babyBack".nutrition_calorie_user;

CREATE TABLE "babyBack".nutrition_calorie_user (
	uuid varchar(255) NOT NULL,
	item_id int4 NOT NULL,
	date_of_entry date NULL DEFAULT now(),
	amount int4 NOT NULL DEFAULT 0,
	CONSTRAINT nutrition_calorie_user_fk0 FOREIGN KEY (uuid) REFERENCES users(uuid),
	CONSTRAINT nutrition_calorie_user_fk1 FOREIGN KEY (item_id) REFERENCES nutrition_calorie_ideal(id)
);

-- Drop table

-- DROP TABLE "babyBack".overall_growth_ideal;

CREATE TABLE "babyBack".overall_growth_ideal (
	id serial NOT NULL,
	duration int4 NOT NULL,
	height float8 NOT NULL,
	weight float8 NOT NULL,
	CONSTRAINT overall_growth_ideal_duration_key UNIQUE (duration),
	CONSTRAINT overall_growth_ideal_pk PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE "babyBack".overall_growth_user;

CREATE TABLE "babyBack".overall_growth_user (
	uuid varchar(255) NOT NULL,
	entry_id serial NOT NULL,
	"date" date NULL DEFAULT now(),
	height float8 NOT NULL,
	weight float8 NOT NULL,
	CONSTRAINT overall_growth_user_pk PRIMARY KEY (entry_id),
	CONSTRAINT overall_growth_user_fk0 FOREIGN KEY (uuid) REFERENCES users(uuid)
);

-- Drop table

-- DROP TABLE "babyBack".user_detail;

CREATE TABLE "babyBack".user_detail (
	uuid varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	date_of_joining date NOT NULL,
	city varchar(255) NULL,
	CONSTRAINT user_detail_pk PRIMARY KEY (uuid),
	CONSTRAINT user_detail_fk0 FOREIGN KEY (uuid) REFERENCES users(uuid)
);

-- Drop table

-- DROP TABLE "babyBack".users;

CREATE TABLE "babyBack".users (
	uuid varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	mobile_number int4 NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pk PRIMARY KEY (uuid)
);

-- Drop table

-- DROP TABLE "babyBack".vaccinations_ideal;

CREATE TABLE "babyBack".vaccinations_ideal (
	vaccination_id serial NOT NULL,
	vaccination_name varchar(255) NOT NULL,
	duration int4 NOT NULL,
	user_added bool NULL,
	CONSTRAINT vaccinations_ideal_pk PRIMARY KEY (vaccination_id)
);

-- Drop table

-- DROP TABLE "babyBack".vaccinations_user;

CREATE TABLE "babyBack".vaccinations_user (
	uuid varchar(255) NOT NULL,
	vaccination_id serial NOT NULL,
	expected_date date NULL,
	user_response bool NOT NULL DEFAULT false,
	CONSTRAINT vaccinations_user_fk1 FOREIGN KEY (vaccination_id) REFERENCES vaccinations_ideal(vaccination_id)
);
