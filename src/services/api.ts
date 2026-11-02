// Chamadas para a API Java: https://challenge-java-sustent-game.onrender.com
import type { ItemRanking, Usuario, Video } from "../types/api";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

// Chama a API e devolve o JSON (ou lança erro se o status não for 2xx)
async function chamar(caminho: string, metodo = "GET", corpo?: object) {
  const resposta = await fetch(BASE_URL + caminho, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });

  if (resposta.status === 404) throw new Error("Registro não encontrado.");
  if (!resposta.ok) throw new Error("Erro " + resposta.status + " ao falar com a API.");

  // DELETE costuma voltar sem conteúdo
  const texto = await resposta.text();
  return texto ? JSON.parse(texto) : null;
}

// ---------- usuários ----------
export function listarUsuarios(): Promise<Usuario[]> {
  return chamar("/usuario");
}

export function buscarUsuario(id: number): Promise<Usuario> {
  return chamar("/usuario/" + id);
}

export function criarUsuario(nome: string, email: string): Promise<Usuario> {
  return chamar("/usuario", "POST", { nome, email, pontos: 0 });
}

export function atualizarUsuario(id: number, nome: string, email: string, pontos: number): Promise<Usuario> {
  return chamar("/usuario/" + id, "PUT", { nome, email, pontos });
}

// A API não deixa excluir usuário que ainda tem vídeo.
// Por isso apagamos os vídeos dele primeiro e só depois o usuário.
export async function excluirUsuario(id: number): Promise<void> {
  const videos = await listarVideos();
  for (const video of videos) {
    if (video.usuarioId === id) {
      await excluirVideo(video.id);
    }
  }
  await chamar("/usuario/" + id, "DELETE");
}

// ---------- vídeos ----------
export function listarVideos(): Promise<Video[]> {
  return chamar("/video");
}

export function buscarVideo(id: number): Promise<Video> {
  return chamar("/video/" + id);
}

export function criarVideo(urlVideo: string, usuarioId: number): Promise<Video> {
  return chamar("/video", "POST", { urlVideo, usuarioId });
}

export function atualizarVideo(id: number, urlVideo: string, usuarioId: number): Promise<Video> {
  return chamar("/video/" + id, "PUT", { urlVideo, usuarioId });
}

export function validarVideo(id: number): Promise<Video> {
  return chamar("/video/" + id + "/validar", "PATCH");
}

export function excluirVideo(id: number): Promise<void> {
  return chamar("/video/" + id, "DELETE");
}

// ---------- ranking ----------
export function obterRanking(): Promise<ItemRanking[]> {
  return chamar("/ranking");
}
