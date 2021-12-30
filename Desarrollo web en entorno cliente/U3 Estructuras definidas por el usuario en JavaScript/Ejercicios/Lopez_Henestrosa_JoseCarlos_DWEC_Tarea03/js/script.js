"use strict"

import { Arbitro, Campeonato, Equipo, Jugador } from "./index.js";

/*
Dejo comentadas las invocaciones a los métodos toString() de los 
jugadores para evitar grandes bloques de texto en el HTML.
*/
const fillTeam = (team, players) => {
	players.forEach(player => {
		//player.toString();
		team.altaJugador(player);
	});
}

const emptyTeam = (team, players) => {
	players.forEach(player => {
		//player.toString();
		team.eliminarJugador(player);
	});
}

// ---------- ARBITRO 
const arbitro1 = new Arbitro("Isabel Chinchilla", "Teruel", 2002);
const arbitro2 = new Arbitro("Carmen Pérez", "Ávila", 2007);
const arbitro3 = new Arbitro("Luisa García", "sevilla", 2009);

// ---------- CAMPEONATO
const campeonato1 = new Campeonato("Campeonato Juvenil de Fútbol", "", "");
const campeonato2 = new Campeonato("Campeonato Nacional Navideño de Fútbol", "Madrid", "hola");

// ---------- EQUIPO 
const equipoCordoba = new Equipo("CB Córdoba", "Córdoba", "cordoba.png", "Esteban Millán");
const equipoArchidona = new Equipo("Archidona Atlético", "archidona", "archidona.png", "Antonio Cuéllar");
const equipoAlmogia = new Equipo("Almogía Atletic", "almogía", "almogia.png", "Josefina Salas");
const equipoAntequera = new Equipo("Antequera CF", "antequera", "antequera.png", "Juan Manuel Herranz");
// Para crear un equipo con el escudo por defecto:
/*
const equipoDefault = new Equipo("Equipo", "Ciudad", "hola", "Entrenador");
equipoDefault.toString();
*/

// ---------- JUGADOR (están creados con el orden del dorsal inverso para ser ordenados después con el método ordenaJugDorsal())
const jugadoresCordoba = [
	new Jugador("Martín Jurado López", "cór", "22 Dec 2008", 10, 'b'),
	new Jugador("Alejandro Cano Peralta", "Málaga", "12 Dec 2008", 9, 'a'),
	new Jugador("David Jiménez Lara", "Sevilla", "22 Oct 2007", 8, 'b'),
	new Jugador("David Carrillo Rubio", "Almería", "06 Nov 2006", 7, 'e'),
	new Jugador("Juan Hueso Bellido", "Cádiz", "07 Mar 2004", 6, 'ap')
];

const jugadoresArchidona = [
	new Jugador("Jesús Núñez Alba", "Tarragona", "24 Jul 2009", 5, 'a'),
	new Jugador("Manuel Domínguez Gil", "Leida", "14 Jun 2010", 4, 'p'),
	new Jugador("Álvaro Doblado Onieva", "Barcelona", "02 Aug 2008", 3, 'b'),
	new Jugador("Francisco Fernández Mejías", "Girona", "17 Sep 2007", 2, 'e'),
	new Jugador("Clemente Casado Joyera", "Huesca", "08 Jun 2006", 1, 'ap')
];

const jugadoresAlmogia = [
	new Jugador("Eduardo Rodríguez Rodríguez", "Palencia", "07 Jan 2008", 20, 'a'),
	new Jugador("Germán Roldán Domínguez", "Burgos", "13 Dec 2007", 19, 'p'),
	new Jugador("Ismael Rodríguez Luque", "León", "03 Feb 2009", 18, 'b'),
	new Jugador("Jesús González Trani", "Salamanca", "7 May 2009", 17, 'e'),
	new Jugador("David Conde Lobato", "Segovia", "22 Apr 2008", 16, 'ap')
];

const jugadoresAntequera = [
	new Jugador("Álvaro Guerrero Linares", "Lugo", "20 Feb 2002", 15, 'a'),
	new Jugador("Marcelino García Heredia", "A Coruña", "17 Dec 2003", 14, 'p'),
	new Jugador("Adrián Molina Luque", "Pontevedra", "05 Feb 2004", 13, 'b'),
	new Jugador("Christian Jiménez Ayala", "Orense", "22 Mar 2002", 12, 'e'),
	new Jugador("José Antonio Lara", "Asturias", "18 Apr 2005", 11, 'ap')
];

/* 
---------------------------------------------
OPERACIONES
--------------------------------------------- 
*/

// ---------- INFO DE ÁRBITROS
arbitro1.toString();
arbitro2.toString();
arbitro3.toString();

// ---------- ALTA DE JUGADORES 
fillTeam(equipoCordoba, jugadoresCordoba);
equipoCordoba.ordenaJugDorsal();
equipoCordoba.toString();

fillTeam(equipoArchidona, jugadoresArchidona);
equipoArchidona.ordenaJugDorsal();
equipoArchidona.toString();

fillTeam(equipoAlmogia, jugadoresAlmogia);
equipoAlmogia.ordenaJugDorsal();
equipoAlmogia.toString();

fillTeam(equipoAntequera, jugadoresAntequera);
equipoAntequera.ordenaJugDorsal();
equipoAntequera.toString();

// ---------- ADICIÓN DE PARTICIPANTES AL CAMPEONATO
const participantes = [
	arbitro1, 
	arbitro2, 
	arbitro3, 
	equipoCordoba, 
	equipoArchidona, 
	equipoAlmogia, 
	equipoAntequera
];
participantes.forEach(participante => campeonato1.anadirParticipantes(participante));
campeonato1.toString();

// ---------- ELIMINACIÓN DE JUGADORES
emptyTeam(equipoCordoba, jugadoresCordoba);
equipoCordoba.toString();

emptyTeam(equipoArchidona, jugadoresArchidona);
equipoArchidona.toString();

emptyTeam(equipoAlmogia, jugadoresAlmogia);
equipoAlmogia.toString();

emptyTeam(equipoAntequera, jugadoresAntequera);
equipoAntequera.toString();