import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import ApiStatus from "../components/ApiStatus";
import { criarUsuario, listarUsuarios } from "../services/api";
import type { Usuario } from "../types/api";
import { formatarNome } from "../lib/formatar";
import { CAMPO } from "../lib/estilos";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function carregarUsuarios() {
    setCarregando(true);
    setErro(null);
    try {
      setUsuarios(await listarUsuarios());
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar usuários.");
    }
    setCarregando(false);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function aoEnviar(e: FormEvent) {
    e.preventDefault();
    try {
      const novo = await criarUsuario(nome, email);
      alert("Usuário " + formatarNome(novo.nome) + " cadastrado!");
      setNome("");
      setEmail("");
      carregarUsuarios();
    } catch {
      alert("Não foi possível cadastrar. Confira nome e e-mail.");
    }
  }

  return (
    <section className="py-16">
      <Container>
        <SectionHeading>
          <h1>Usuários SoulUp</h1>
          <p className="mx-auto max-w-[640px]">Cadastre participantes e acompanhe a pontuação de cada um.</p>
        </SectionHeading>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <form onSubmit={aoEnviar} className="rounded-md border-t-4 border-teal bg-surface p-6 shadow-soft-sm md:p-8">
            <h2 className="mb-5 text-[1.3rem]">Novo usuário</h2>
            <label htmlFor="nome" className="mb-1 block text-[0.9rem] font-semibold text-deep">Nome</label>
            <input id="nome" required minLength={2} value={nome} onChange={(e) => setNome(e.target.value)} className={CAMPO + " mb-4"} />
            <label htmlFor="email" className="mb-1 block text-[0.9rem] font-semibold text-deep">E-mail</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={CAMPO + " mb-6"} />
            <Button type="submit" block>Cadastrar</Button>
          </form>

          <div>
            <ApiStatus carregando={carregando} erro={erro} onTentarNovamente={carregarUsuarios} />
            {!carregando && !erro && (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {usuarios.length === 0 && <li className="text-muted">Nenhum usuário cadastrado.</li>}
                {usuarios.map((u) => (
                  <li key={u.id}>
                    <Link
                      to={"/usuarios/" + u.id}
                      className="block rounded-md border border-borderc bg-surface p-5 shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-teal"
                    >
                      <strong className="block text-deep">{formatarNome(u.nome)}</strong>
                      <span className="block truncate text-[0.85rem] text-muted">{u.email}</span>
                      <span className="mt-2 block font-display font-bold text-teal">{u.pontos} pts</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
