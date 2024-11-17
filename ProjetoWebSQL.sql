DROP DATABASE IF EXISTS projeto_web;
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
    Imagem BLOB,
    Descricao VARCHAR(500),
    Preco DECIMAL(10 ,2) NOT NULL,
    Num_Compras INT DEFAULT 0
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
    
DROP TRIGGER IF EXISTS Tgr_Compra_Insert;
DELIMITER $$
CREATE TRIGGER Tgr_Compra_Insert
AFTER INSERT ON Compra  -- A Trigger dispara após o INSERT
FOR EACH ROW
BEGIN
UPDATE Pacote
SET Num_Compras = Num_Compras + 1
WHERE Id_Pacote = NEW.fk_Pacote_Id_Pacote;
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
SET Num_Compras = Num_Compras -1
WHERE Id_Pacote = OLD.fk_Pacote_Id_Pacote;
END $$
DELIMITER ;

-- Teste de criação de pacotes --
-- INSERT INTO Pacote (Titulo, Descricao, Preco) VALUES
-- ('Barramas', 'Descubra a beleza exótica de Barramas, onde praias de areia branca e águas cristalinas esperam por você.', 0.00),
-- ('Rio de Janeiro', 'Explore o vibrante Rio de Janeiro, famoso por seu carnaval, suas praias icônicas e a impressionante estátua do Cristo Redentor.', 0.00),
-- ('Maceió', 'Maceió oferece um cenário tropical com suas lagoas azuis e praias encantadoras, ideal para relaxar e desfrutar do sol.', 0.00),
-- ('Gramados', 'A charmosa Gramado é conhecida por seu clima europeu, arquitetura pitoresca e festivais sazonais encantadores.', 0.00),
-- ('Porto Seguro', 'Porto Seguro é o destino perfeito para quem busca diversão e cultura, com suas praias deslumbrantes e rica história.', 0.00),
-- ('Tokyo', 'Tokyo combina a modernidade com a tradição, oferecendo uma experiência única com seus templos antigos e arranha-céus futuristas.', 0.00),
-- ('Irlanda', 'A Irlanda é conhecida por suas paisagens verdes, castelos históricos e a calorosa hospitalidade de seus habitantes.', 0.00),
-- ('Barcelona', 'Barcelona encanta com sua arquitetura deslumbrante de Gaudí, suas praias e uma vibrante cena cultural e gastronômica.', 0.00),
-- ('Paris', 'Paris, a cidade das luzes, é famosa por seus monumentos icônicos, museus de renome e uma rica tradição de café e gastronomia.', 0.00);



 INSERT INTO Pacote (Titulo, Descricao, Preco) VALUES
 ('Paris', 'Pacote com visitas aos principais pontos turísticos como Torre Eiffel e Louvre.', 1500.00),
 ('Rio de Janeiro', 'Inclui passeios pelo Cristo Redentor e praias de Copacabana.', 1200.00),
 ('Nova Iorque', 'Explore a cidade que nunca dorme com visitas à Estátua da Liberdade e Central Park.', 1800.00),
 ('Tóquio', 'Experiência cultural com visitas a templos e modernidade da cidade.', 2000.00),
 ('Roma', 'Tour histórico com visitas ao Coliseu e Vaticano.', 1600.00),
 ('Dubai', 'Inclui passeios pelo deserto e visita ao Burj Khalifa.', 2500.00),
 ('Sydney', 'Descubra a Ópera de Sydney e as praias famosas.', 1700.00),
 ('Londres', 'Visitas ao Big Ben e ao Palácio de Buckingham.', 1900.00),
 ('Cairo', 'Tour pelas Pirâmides de Gizé e Museu Egípcio.', 1400.00),
 ('Bangkok', 'Experiência cultural com templos e mercados flutuantes.', 1300.00);
 
SELECT * FROM USUARIO;
SELECT * FROM PACOTE;
