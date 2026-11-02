import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import ApiStatus from "../components/ApiStatus";
import { atualizarUsuario, buscarUsuario, excluirUsuario, listarVideos } from "../services/api";
import { formatarNome } from "../lib/formatar";
import { CAMPO, COR_STATUS } from "../lib/estilos";
import type { Usuario, Video } from "../types/api";

export default function UsuarioDetalhe() {
  const { id } = useParams(); // pega o :id da URL (/usuarios/:id)
  const navigate = useNavigate();
  const idUsuario = Number(id);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function carregarDados() {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarUsuario(idUsuario);
      setUsuario(dados);
      setNome(dados.nome);
      setEmail(dados.email);

      const todosVideos = await listarVideos();
      setVideos(todosVideos.filter((v) => v.usuarioId === idUsuario));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar usuário.");
    }
    setCarregando(false);
  }

  useEffect(() => {
    carregarDados();
  }, [id]);

  async function aoSalvar(e: FormEvent) {
    e.preventDefault();
    if (!usuario) return;
    try {
      const atualizado = await atualizarUsuario(idUsuario, nome, email, usuario.pontos);
      setUsuario(atualizado);
      alert("Dados atualizados!");
    } catch {
      alert("Não foi possível salvar.");
    }
  }

  async function aoExcluir() {
    const msg = videos.length > 0
      ? "Este usuário tem " + videos.length + " vídeo(s). Excluir o usuário e os vídeos dele?"
      : "Excluir este usuário?";
    if (!confirm(msg)) return;
    try {
      await excluirUsuario(idUsuario); // apaga os vídeos e depois o usuário
      alert("Usuário excluído.");
      navigate("/usuarios"); // volta para a lista
    } catch {
      alert("Não foi possível excluir o usuário.");
    }
  }

  return (
    <section className="py-16">
      <Container>
        <Link to="/usuarios" className="mb-6 inline-block font-semibold text-teal">← Voltar para usuários</Link>

        {erro === "Registro não encontrado." ? (
          <div className="rounded-md border border-borderc bg-surface p-10 text-center">
            <h1 className="mb-2 text-[1.6rem]">Usuário #{id} não encontrado</h1>
            <p className="mb-6">Ele pode ter sido excluído. Veja a lista completa.</p>
            <Button to="/usuarios">Ver usuários</Button>
          </div>
        ) : (
          <ApiStatus carregando={carregando} erro={erro} onTentarNovamente={carregarDados} />
        )}

        {!carregando && usuario && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            <form onSubmit={aoSalvar} className="rounded-md border-t-4 border-teal bg-surface p-6 shadow-soft-sm md:p-8">
              <h1 className="mb-1 text-[1.6rem]">{formatarNome(usuario.nome)}</h1>
              <p className="mb-6 font-display text-[1.2rem] font-bold text-teal">{usuario.pontos} pontos</p>
              <label htmlFor="nome" className="mb-1 block text-[0.9rem] font-semibold text-deep">Nome</label>
              <input id="nome" required minLength={2} value={nome} onChange={(e) => setNome(e.target.value)} className={CAMPO + " mb-4"} />
              <label htmlFor="email" className="mb-1 block text-[0.9rem] font-semibold text-deep">E-mail</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={CAMPO + " mb-6"} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit">Salvar</Button>
                <Button type="button" variant="secondary" onClick={aoExcluir}>Excluir usuário</Button>
              </div>
            </form>

            <div className="rounded-md border border-borderc bg-surface p-6 shadow-soft-sm md:p-8">
              <h2 className="mb-4 text-[1.3rem]">Vídeos enviados</h2>
              {videos.length === 0 && (
                <p className="text-muted">Nenhum vídeo ainda. <Link to="/validar" className="font-semibold text-teal">Enviar uma ação</Link></p>
              )}
              <ul className="flex flex-col gap-3">
                {videos.map((v) => (
                  <li key={v.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-dotted border-borderc pb-3">
                    <Link to={"/videos/" + v.id} className="min-w-0 truncate text-[0.9rem]">{v.urlVideo}</Link>
                    <span className={"rounded-sm px-2 py-1 text-[0.75rem] font-semibold " + COR_STATUS[v.status]}>
                      {v.status} · {v.pontosRecebidos} pts
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
