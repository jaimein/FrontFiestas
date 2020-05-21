export interface FiestaNombres {
  id: number;
  fecha: Date;
  nombreGrupo: string;
  nombreTipo: string;
  localidad: string;
  zona: string;
}

export interface Fiestatotal {
  id: string;
  fecha: Date;
  nombreGrupo: string;
  nombreTipo: string;
  localidad: string;
  zona: string;
}

export interface FiestaCreacion {
  fecha: Date;
  id_grupo: number;
  id_tipo: number;
  id_codigo_postal: number;
}
