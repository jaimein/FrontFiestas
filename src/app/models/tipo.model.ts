export interface TipoBasico {
  id: number;
  descripcion: string;
}

export interface TipoTotal {
  id: number;
  descripcion: string;
  falt: Date;
  cusualt: string;
  fmod: Date;
  cusumod: string;
}
