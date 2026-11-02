import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import ApiStatus from "../components/ApiStatus";
import { atualizarVideo, buscarVideo, excluirVideo } from "../services/api";
import { CAMPO, COR_STATUS } from "../lib/estilos";
import type { Video } from "../types/api";

export default function VideoDetalhe() {
  const { id } = useParams(); // pega o :id da URL (/videos/:id)
  const navigate = useNavigate();
  const idVideo = Number(id);

  const [video, setVideo] = useState<Video | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [urlVideo, setUrlVideo] = useState("");

  async function carregarVideo() {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarVideo(idVideo);
      setVideo(dados);
      setUrlVideo(dados.urlVideo);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar vídeo.");
    }
    setCarregando(false);
  }

  useEffect(() => {
    carregarVideo();
  }, [id]);

  async function aoSalvar(e: FormEvent) {
    e.preventDefault();
    if (!video) return;
    try {
      setVideo(await atualizarVideo(idVideo, urlVideo, video.usuarioId));
      alert("Vídeo atualizado!");
    } catch {
      alert("Não foi possível atualizar o vídeo.");
    }
  }

  async function aoExcluir() {
    if (!confirm("Excluir este vídeo?")) return;
    try {
      await excluirVideo(idVideo);
      alert("Vídeo excluído.");
      navigate("/validar");
    } catch {
      alert("Não foi possível excluir.");
    }
  }

  return (
    <section className="py-16">
      <Container>
        <Link to="/validar" className="mb-6 inline-block font-semibold">← Voltar para Validar Ação</Link>

        {erro === "Registro não encontrado." ? (
          <div className="rounded-md border border-borderc bg-surface p-8 text-center">
            <h1 className="mb-2 text-[1.6rem]">Vídeo não encontrado</h1>
            <p className="mb-6">Ele pode ter sido excluído.</p>
            <Button to="/validar">Ver vídeos</Button>
          </div>
        ) : (
          <ApiStatus carregando={carregando} erro={erro} onTentarNovamente={carregarVideo} />
        )}

        {!carregando && video && (
          <form onSubmit={aoSalvar} className="mx-auto max-w-[640px] rounded-md border-t-4 border-teal bg-surface p-6 shadow-soft-sm md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-[1.6rem]">Vídeo #{video.id}</h1>
              <span className={"rounded-sm px-2 py-1 text-[0.8rem] font-semibold " + COR_STATUS[video.status]}>
                {video.status} · {video.pontosRecebidos} pts
              </span>
            </div>
            <p className="mb-4 text-[0.9rem]">
              Enviado em {new Date(video.dataEnvio).toLocaleString("pt-BR")} por{" "}
              <Link to={"/usuarios/" + video.usuarioId} className="font-semibold">
                usuário #{video.usuarioId}
              </Link>
            </p>
            <label htmlFor="urlVideo" className="mb-1 block text-[0.9rem] font-semibold text-deep">Link do vídeo</label>
            <input id="urlVideo" required minLength={3} value={urlVideo} onChange={(e) => setUrlVideo(e.target.value)} className={CAMPO + " mb-6"} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit">Salvar</Button>
              <Button type="button" variant="secondary" onClick={aoExcluir}>Excluir</Button>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
