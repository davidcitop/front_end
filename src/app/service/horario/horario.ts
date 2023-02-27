import { Asignatura } from "../asignatura/asignatura";
import { Aula } from "../aula/aula";
import { Docente } from "../docente/docente";
import { Usuario } from "../usuario/usuario";

export class Horario {
    horCodigo: number;
    asignatura:Asignatura;
    aula:Aula;
    docente:Docente;
    usuario:Usuario;
    horFechaInicio: Date;
    horFechaFin: Date;
}
