CREATE DATABASE jwttutorial;
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- need to set an extension for recogonizing the uuid fnc


-- insert fake users

INSERT INTO users (user_name,user_email,user_password) VALUES ('Anubhav','anubhav@gmail.com','Anubhav@25');

-- Here it has to be single quotations, if double won't work.