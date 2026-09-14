import { type FormEvent, useState } from "react";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Container from "../components/Container";
import useDocumentMeta from "../hooks/useDocumentMeta";

const PASSOS = [
  {
    numero: "01",
    icone: "upload" as const,
    titulo: "Upload",
    descricao: "Usuário envia foto ou vídeo da ação realizada.",
  },
  {
    numero: "02",
    icone: "robot" as const,
    titulo: "Análise",
    descricao: "O Bot identifica o tipo de ação e seu impacto.",
  },
  {
    numero: "03",
    icone: "check" as const,
    titulo: "Validação",
    descricao: "Ação aprovada gera pontos conforme o peso ambiental.",
  },
  {
    numero: "04",
    icone: "trophy" as const,
    titulo: "Ranking",
    descricao: "Sua posição na comunidade é atualizada instantaneamente.",
  },
];

const CAMPO_BASE =
  "w-full rounded-sm border border-borderc bg-bg px-3.5 py-3 font-body text-[0.95rem] text-deep focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-teal";

export default function Validar() {
  useDocumentMeta(
    "Validar Ação — SoulUp",
    "Como funciona a validação de ações sustentáveis na plataforma SoulUp.",
  );

  const [tipoAcao, setTipoAcao] = useState("reciclagem");
  const [descricao, setDescricao] = useState("");

  function aoEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <section className="py-16">
        <Container>
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <span className="mb-2 inline-block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-teal">
              Como validar uma ação
            </span>
            <h1 className="my-2">Registre sua ação sustentável</h1>
            <p>
              Preencha o formulário com os dados da ação. O Bot SoulUp valida a
              evidência automaticamente e atualiza sua pontuação no ranking.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              className="rounded-md border-t-4 border-teal border-x border-b border-borderc bg-surface p-10 shadow-soft-sm"
              onSubmit={aoEnviar}
            >
              <h2 className="mb-5 text-[1.3rem]">Formulário de envio</h2>

              <div className="mb-4">
                <label htmlFor="tipoAcao" className="mb-1 block text-[0.9rem] font-semibold text-deep">
                  Tipo de ação
                </label>
                <select
                  id="tipoAcao"
                  name="tipoAcao"
                  value={tipoAcao}
                  onChange={(e) => setTipoAcao(e.target.value)}
                  className={CAMPO_BASE}
                >
                  <option value="reciclagem">Reciclagem</option>
                  <option value="transporte">Transporte limpo</option>
                  <option value="agua">Economia de água</option>
                  <option value="energia">Energia consciente</option>
                  <option value="plantio">Plantio</option>
                  <option value="consumo">Consumo consciente</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="descricao" className="mb-1 block text-[0.9rem] font-semibold text-deep">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Conte rapidamente o que você fez."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className={`${CAMPO_BASE} min-h-[96px] resize-y`}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="evidencia" className="mb-1 block text-[0.9rem] font-semibold text-deep">
                  Evidência (foto)
                </label>
                <input type="file" id="evidencia" name="evidencia" accept="image/*" className={CAMPO_BASE} />
              </div>

              <Button type="submit" variant="primary" block>
                Enviar para validação
              </Button>
            </form>

            <aside
              className="rounded-md border border-dashed border-borderc bg-surface p-6"
              aria-label="Pesos das ações"
            >
              <h3 className="mb-3 text-[1.05rem]">Peso das ações (0–100)</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] text-muted">
                <li className="flex gap-2 border-b border-dotted border-borderc py-2">
                  <strong className="min-w-[110px] text-deep">Reciclagem</strong> 10–25 pts por envio
                </li>
                <li className="flex gap-2 border-b border-dotted border-borderc py-2">
                  <strong className="min-w-[110px] text-deep">Transporte limpo</strong> 15–30 pts
                </li>
                <li className="flex gap-2 border-b border-dotted border-borderc py-2">
                  <strong className="min-w-[110px] text-deep">Economia de água</strong> 10–20 pts
                </li>
                <li className="flex gap-2 border-b border-dotted border-borderc py-2">
                  <strong className="min-w-[110px] text-deep">Energia consciente</strong> 15–25 pts
                </li>
                <li className="flex gap-2 border-b border-dotted border-borderc py-2">
                  <strong className="min-w-[110px] text-deep">Plantio</strong> 30–60 pts
                </li>
                <li className="flex gap-2 py-2">
                  <strong className="min-w-[110px] text-deep">Consumo consciente</strong> 5–15 pts
                </li>
              </ul>
              <p className="mt-3 text-[0.8rem] text-muted">
                Pontuações finais variam conforme análise do Bot SoulUp.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-teal">
              Como o Bot SoulUp valida
            </span>
            <h2>4 etapas — tudo automático em produção.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS.map((passo) => (
              <article
                key={passo.numero}
                className="relative rounded-md border border-borderc bg-surface p-6 shadow-soft-sm"
              >
                <span className="absolute right-4 top-4 font-display text-[1.4rem] font-bold text-borderc">
                  {passo.numero}
                </span>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-sm bg-gradient-to-br from-teal to-mint text-white">
                  <Icon name={passo.icone} style={{ width: "28px", height: "28px" }} />
                </div>
                <h3 className="mb-2">{passo.titulo}</h3>
                <p className="text-[0.95rem]">{passo.descricao}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
