Create DATABASE Projeto_Web;
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
    Num_Compras INT
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

DROP TRIGGER IF EXISTS Tgr_Compra_Insert;
DELIMITER $$
CREATE TRIGGER Tgr_Compra_Insert
AFTER INSERT -- A Trigger dispara após o INSERT
ON Compra
FOR EACH ROW
BEGIN
UPDATE Pacote
SET Num_Compras = OLD.Num_Compras + 1
WHERE Id_Pacote = fk_Pacote_Id_Pacote;
END $$
DELIMITER ;


DROP TRIGGER IF EXISTS Tgr_Compra_Delete;
DELIMITER $$
CREATE TRIGGER Tgr_Compra_Delete
AFTER DELETE -- A Trigger dispara após o DELETE
ON Compra
FOR EACH ROW
BEGIN
UPDATE Pacote
SET Num_Compras = 
WHERE ID_Prod = OLD.fk_ID_Prod;
END $$
DELIMITER ;

-- Teste de criação de pacotes --
-- INSERT INTO 