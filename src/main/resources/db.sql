CREATE TABLE users
(
    id       INT                 NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)        NOT NULL,
    email     VARCHAR(255)        NOT NULL,
    city VARCHAR(255)        NOT NULL


)
    ENGINE = InnoDB;
-- Table: roles
CREATE TABLE roles
(
    id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE users_roles
(
    users_id INT NOT NULL,
    roles_id INT NOT NULL,

    FOREIGN KEY (users_id) REFERENCES users (id),
    FOREIGN KEY (roles_id) REFERENCES roles (id),

    UNIQUE (users_id, roles_id)
) ENGINE = InnoDB;



INSERT INTO users
VALUES (1, 'Gogi', '1234', 'dfgsd@dfgd.ru', 'Piter');
INSERT INTO users
VALUES (2, 'apolon', '1234', 'sdvadw@awfe.com', 'Varkuta');
INSERT INTO users
VALUES (3, 'admin', 'admin', 'admin@zloy.ru', 'Moscow');

INSERT INTO roles
VALUES (1, 'ROLE_USER');
INSERT INTO roles
VALUES (2, 'ROLE_ADMIN');

INSERT INTO users_roles
VALUES (1, 2);
INSERT INTO users_roles
VALUES (2, 1);
INSERT INTO users_roles
VALUES (3, 1);
INSERT INTO users_roles
VALUES (3, 2);
