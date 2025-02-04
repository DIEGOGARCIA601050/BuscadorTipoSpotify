CREATE TABLE Canciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    letra TEXT,
    genero VARCHAR(100),
    ano INT,
    album VARCHAR(100)
);
