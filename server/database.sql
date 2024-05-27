CREATE TABLE users (
    idUser SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255), 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    home VARCHAR(255)
);
create TABLE UsersToken(
    idUserToken SERIAL PRIMARY KEY,
    idUser INTEGER NOT NULL,
    access VARCHAR(255) NOT NULL,
    refresh VARCHAR(255) NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
)

create TABLE CompanyToken(
    idCompanyToken SERIAL PRIMARY KEY,
    idCompany INTEGER NOT NULL,
    access VARCHAR(255) NOT NULL,
    refresh VARCHAR(255) NOT NULL,
    FOREIGN KEY (idCompany) REFERENCES company(idCompany)
)

CREATE TABLE company(
    idCompany SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255), 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tovars(
    idTovar SERIAL PRIMARY KEY,
    idCompany INTEGER,
    name VARCHAR(255),
    description VARCHAR(255),
    img VARCHAR(255),
    idBrand INTEGER,
    FOREIGN KEY (idCompany) REFERENCES company(idCompany),
    FOREIGN KEY (idBrand) REFERENCES brands(idBrand)
);

CREATE TABLE TovarsSize(
    idTovar INTEGER,
    idSize INTEGER,
    FOREIGN KEY (idTovar) REFERENCES tovars(idTovar),
    FOREIGN KEY (idSize) REFERENCES sizes(idSize),
    PRIMARY KEY (idTovar, idSize)
);

CREATE TABLE sizes(
    idSize SERIAL PRIMARY KEY,
    size INTEGER
);

CREATE TABLE TovarsColor(
    idTovar INTEGER,
    idColor INTEGER,
    FOREIGN KEY (idTovar) REFERENCES tovars(idTovar),
    FOREIGN KEY (idColor) REFERENCES colors(idColor),
    PRIMARY KEY (idTovar, idColor)
);

CREATE TABLE colors(
    idColor SERIAL PRIMARY KEY,
    color VARCHAR(255)
);

CREATE TABLE brands(
    idBrand SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE zakaz(
    idzakaz SERIAL PRIMARY KEY,
    idUser INTEGER,
    country VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    home VARCHAR(255),
    status VARCHAR(255),
    date DATE,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

CREATE TABLE TovarsZakaz(
    idzakaz SERIAL,
    idTovar INTEGER,
    idColor INTEGER,
    idSize INTEGER,
    FOREIGN KEY (idzakaz) REFERENCES zakaz(idzakaz),
    FOREIGN KEY (idTovar) REFERENCES tovars(idTovar),
    FOREIGN KEY (idColor) REFERENCES colors(idColor),
    FOREIGN KEY (idSize) REFERENCES sizes(idSize),
    PRIMARY KEY (idzakaz, idTovar, idColor, idSize)
);


