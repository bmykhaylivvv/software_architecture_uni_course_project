CREATE TABLE announcement (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    title varchar(255),
    description varchar(255),
    PRIMARY KEY (id)
);

ALTER TABLE announcement ADD FULLTEXT(title, description);
