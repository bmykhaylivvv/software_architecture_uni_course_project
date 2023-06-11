CREATE TABLE project.announcement (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    title varchar(255),
    description varchar(255),
    PRIMARY KEY (id)
);

  ALTER TABLE project.announcement ADD FULLTEXT(title, description);
