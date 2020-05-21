export interface cpBasico {
  id: number;
  cp: number;
  calle: string;
  idPoblacion: number;
}

export interface poblacionBasico {
  id: number;
  nombre: string;
  idProvincia: number;
}

export interface provinciaBasico {
  id: number;
  nombre: string;
  idComunidad: number;
}

export interface comunidadesBasico {
  id: number;
  nombre: string;
  idpais: number;
}
