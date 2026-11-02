// Chamadas para a API Java: https://challenge-java-sustent-game.onrender.com
import type { Usuario } from "../types/api";

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

export async function excluirUsuario(id: number): Promise<void> {
  await chamar("/usuario/" + id, "DELETE");
}

