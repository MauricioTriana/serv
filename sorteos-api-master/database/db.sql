CREATE DATABASE sorteosapi;

\l

\c sorteoapi;

CREATE TABLE redimir(
   id SERIAL PRIMARY KEY,
   cantidadBoletas INTEGER NOT null,
   numeroDocumento TEXT NOT NULL,
   sorteoId INTEGER NOT NULL,
   tipoDocumento TEXT NOT NULL

);

INSERT INTO redimir (cantidadBoletas, numeroDocumento, sorteoId, tipoDocumento)
    VALUES (3, '107187687',1,'CC');

select * from redimir;


CREATE TABLE sorteo(
   id SERIAL PRIMARY KEY,
   activo BOOLEAN NOT NULL,
   nombre TEXT NOT NULL,
   valorPuntos INTEGER NOT NULL,
   fechaInicial DATE NOT NULL,
   fechaFinal DATE NOT NULL

);


INSERT INTO sorteo (activo, nombre, valorPuntos, fechaInicial, fechaFinal)
    VALUES (true, 'Carro 0 km',1000,'13/01/2020','23/01/2020');

update sorteo set fechaFinal='16/01/2019';

CREATE TABLE configuracion(
   id SERIAL PRIMARY KEY,
   maximoBoletas INTEGER NOT null

);


INSERT INTO configuracion(maximoBoletas)
VALUES(5);

update configuracion set maximoBoletas=6;
