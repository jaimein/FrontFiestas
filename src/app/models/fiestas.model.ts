export interface FiestaNombres {
  id: number;
  fecha: Date;
  nombreGrupo: string;
  nombreTipo: string;
  localidad: string;
  zona: string;
}

export interface Fiestatotal {
  id: number;
  fecha: Date;
  falt: Date;
  cusualt: string;
  idGrupo: number;
  idTipo: number;
  idCodigoPostal: number;
  fmod: Date;
  cusumod: string;
}

export interface FiestaCreacion {
  fecha: Date;
  id_grupo: number;
  id_tipo: number;
  id_codigo_postal: number;
}
