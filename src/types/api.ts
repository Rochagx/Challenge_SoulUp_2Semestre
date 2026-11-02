export interface Usuario {
  id: number;
  nome: string;
  email: string;
  pontos: number;
}

export type StatusVideo = "PENDENTE" | "APROVADO" | "REJEITADO";

export interface Video {
  id: number;
  urlVideo: string;
  status: StatusVideo;
  dataEnvio: string;
  pontosRecebidos: number;
  usuarioId: number;
}

export interface ItemRanking {
  posicao: number;
  idUsuario: number;
  nome: string;
  pontos: number;
  acessoRecompensa: boolean;
}
