import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import useDocumentMeta from "../hooks/useDocumentMeta";

interface Usuario {
  nome: string;
  cidade: string;
  pontos: number;
}

type Periodo = "semanal" | "mensal" | "geral";

const DADOS: Record<Periodo, Usuario[]> = {
  semanal: [
    { nome: "Marina Costa", cidade: "Sao Paulo, SP", pontos: 96 },
    { nome: "Lucas Almeida", cidade: "Recife, PE", pontos: 91 },
    { nome: "Beatriz Lima", cidade: "Curitiba, PR", pontos: 87 },
    { nome: "Rafael Souza", cidade: "Salvador, BA", pontos: 82 },
    { nome: "Helena Pires", cidade: "Porto Alegre, RS", pontos: 78 },
    { nome: "Diego Martins", cidade: "Belo Horizonte, MG", pontos: 74 },
    { nome: "Camila Rocha", cidade: "Fortaleza, CE", pontos: 69 },
    { nome: "Pedro Henrique", cidade: "Manaus, AM", pontos: 62 },
  ],
  mensal: [
    { nome: "Beatriz Lima", cidade: "Curitiba, PR", pontos: 98 },
    { nome: "Marina Costa", cidade: "Sao Paulo, SP", pontos: 95 },
    { nome: "Diego Martins", cidade: "Belo Horizonte, MG", pontos: 90 },
    { nome: "Rafael Souza", cidade: "Salvador, BA", pontos: 86 },
    { nome: "Lucas Almeida", cidade: "Recife, PE", pontos: 81 },
    { nome: "Helena Pires", cidade: "Porto Alegre, RS", pontos: 77 },
    { nome: "Pedro Henrique", cidade: "Manaus, AM", pontos: 71 },
    { nome: "Camila Rocha", cidade: "Fortaleza, CE", pontos: 65 },
  ],
  geral: [
    { nome: "Marina Costa", cidade: "Sao Paulo, SP", pontos: 99 },
    { nome: "Beatriz Lima", cidade: "Curitiba, PR", pontos: 97 },
    { nome: "Rafael Souza", cidade: "Salvador, BA", pontos: 94 },
    { nome: "Lucas Almeida", cidade: "Recife, PE", pontos: 92 },
    { nome: "Diego Martins", cidade: "Belo Horizonte, MG", pontos: 89 },
    { nome: "Helena Pires", cidade: "Porto Alegre, RS", pontos: 85 },
    { nome: "Camila Rocha", cidade: "Fortaleza, CE", pontos: 80 },
    { nome: "Pedro Henrique", cidade: "Manaus, AM", pontos: 76 },
  ],
};

const CORES_MEDALHA: Record<number, string> = {
  1: "text-[#d4a017]",
  2: "text-[#95a5a6]",
  3: "text-[#cd7f32]",
};

function corPosicao(posicao: number): string {
  return CORES_MEDALHA[posicao] ?? "text-teal";
}

export default function Ranking() {
  useDocumentMeta(
    "Ranking — SoulUp",
    "Acompanhe o ranking SoulUp em tempo real: classificação semanal, mensal e geral dos usuários mais sustentáveis.",
  );

  const [abaAtual, setAbaAtual] = useState<Periodo>("semanal");
  const [busca, setBusca] = useState("");

  const ordenados = useMemo(() => {
    const buscaMinuscula = busca.toLowerCase();
    const filtrados = DADOS[abaAtual].filter((usuario) =>
      usuario.nome.toLowerCase().includes(buscaMinuscula),
    );
    return [...filtrados].sort((a, b) => b.pontos - a.pontos);
  }, [abaAtual, busca]);

  return (
    <section className="py-16">
      <Container>
        <SectionHeading>
          <h1>Ranking SoulUp</h1>
          <p className="mx-auto max-w-[640px]">
            Os usuários mais engajados da comunidade. O líder mensal ganha
            conta de energia subsidiada pelos parceiros.
          </p>
        </SectionHeading>

        <div
          className="mb-6 flex gap-2 overflow-x-auto border-b-2 border-borderc"
          role="tablist"
          aria-label="Filtrar período"
        >
          {(["semanal", "mensal", "geral"] as Periodo[]).map((periodo) => {
            const ativo = abaAtual === periodo;
            return (
              <button
                key={periodo}
                role="tab"
                onClick={() => setAbaAtual(periodo)}
                className={`-mb-0.5 whitespace-nowrap border-b-[3px] px-5 py-3 font-body text-[0.95rem] font-semibold transition-all ${
                  ativo
                    ? "border-teal text-teal"
                    : "border-transparent text-muted hover:text-deep"
                }`}
              >
                {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="mb-6 max-w-[360px]">
          <label htmlFor="ranking-search" className="mb-1 block text-[0.9rem] font-semibold text-deep">
            <Icon name="search" className="mr-1" /> Buscar usuário
          </label>
          <input
            type="text"
            id="ranking-search"
            placeholder="Digite um nome…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full rounded-sm border-2 border-borderc bg-bg px-4 py-3 font-body text-[0.95rem] text-deep transition-colors focus:border-teal focus:bg-white focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-md bg-surface shadow-soft-sm">
            <thead>
              <tr>
                <th className="bg-deep px-4 py-3 text-left font-display text-[0.9rem] uppercase tracking-wider text-white">
                  Pos.
                </th>
                <th className="bg-deep px-4 py-3 text-left font-display text-[0.9rem] uppercase tracking-wider text-white">
                  Usuário
                </th>
                <th className="bg-deep px-4 py-3 text-left font-display text-[0.9rem] uppercase tracking-wider text-white">
                  Cidade
                </th>
                <th className="bg-deep px-4 py-3 text-left font-display text-[0.9rem] uppercase tracking-wider text-white">
                  Pontos
                </th>
              </tr>
            </thead>
            <tbody>
              {ordenados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted">
                    Nenhum usuario encontrado.
                  </td>
                </tr>
              ) : (
                ordenados.map((usuario, indice) => {
                  const posicao = indice + 1;
                  return (
                    <tr
                      key={usuario.nome}
                      className="border-b border-borderc transition-colors last:border-b-0 hover:bg-bg"
                    >
                      <td className={`w-[50px] px-4 py-3 font-display text-[1.1rem] font-bold ${corPosicao(posicao)}`}>
                        {posicao}º
                      </td>
                      <td className="px-4 py-3">
                        <strong>{usuario.nome}</strong>
                      </td>
                      <td className="px-4 py-3">{usuario.cidade}</td>
                      <td className="px-4 py-3 font-display font-bold text-deep">{usuario.pontos}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-[0.9rem] text-muted">
          Dados ilustrativos para demonstração.
        </p>
      </Container>
    </section>
  );
}
