-- COCKTAILS DATABASE SCHEMA


create database cocktails_db;
use cocktails_db;
create table savedDrinks(
	id int auto_increment not null,
    drinkName varchar(100) not null,
    apiDrinkId int not null,
    primary key(id)
);