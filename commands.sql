CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'www.bloginosoite.com','Writing Resilien Components');
insert into blogs (author, url, title) values ('Kissa Mau', 'www.Kissamaukumau.com','Miu Mau Mau');