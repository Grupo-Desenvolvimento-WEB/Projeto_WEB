CREATE DATABASE Projeto_Web;
USE Projeto_Web;

CREATE TABLE Usuario (
    Id_Usuario  INT PRIMARY KEY AUTO_INCREMENT ,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Senha VARCHAR(100) NOT NULL
);

CREATE TABLE Pacote (
    Id_Pacote INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL,
    Descricao VARCHAR(100),
    Preco FLOAT NOT NULL
);

CREATE TABLE Compra (
    Id_Compra INT PRIMARY KEY AUTO_INCREMENT,
    fk_Usuario_Id_Usuario INT,
    fk_Pacote_Id_Pacote INT,
    DataPartida DATE NOT NULL,
    DataRetorno DATE NOT NULL
);
 
ALTER TABLE Compra ADD CONSTRAINT FK_Compra_1
    FOREIGN KEY (fk_Usuario_Id_Usuario)
    REFERENCES Usuario (Id_Usuario)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
 
ALTER TABLE Compra ADD CONSTRAINT FK_Compra_2
    FOREIGN KEY (fk_Pacote_Id_Pacote)
    REFERENCES Pacote (Id_Pacote)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
    
SELECT * FROM USUARIO;
SELECT * FROM PACOTE;

-- Teste de criação de pacotes --
-- INSERT INTO 