CREATE DATABASE Projeto_Web;
USE Projeto_Web;

CREATE TABLE Usuario (
    Id_Usuario  INT PRIMARY KEY AUTO_INCREMENT ,
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Senha VARCHAR(100)
);

CREATE TABLE Pacote (
    Id_Pacote INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100),
    Preco FLOAT
);

CREATE TABLE Compra (
    Id_Compra INT PRIMARY KEY AUTO_INCREMENT,
    fk_Usuario_Id_Usuario INT,
    fk_Pacote_Id_Pacote INT,
    DataPartida DATE,
    DataRetorno DATE
);
 
ALTER TABLE Compra ADD CONSTRAINT FK_Compra_1
    FOREIGN KEY (fk_Usuario_Id_Usuario)
    REFERENCES Usuario (Id_Usuario)
    ON DELETE RESTRICT;
 
ALTER TABLE Compra ADD CONSTRAINT FK_Compra_2
    FOREIGN KEY (fk_Pacote_Id_Pacote)
    REFERENCES Pacote (Id_Pacote)
    ON DELETE RESTRICT;
    
SELECT * FROM USUARIO;
SELECT * FROM PACOTE;