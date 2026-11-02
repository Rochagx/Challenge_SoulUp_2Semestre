// Deixa cada palavra com a primeira letra maiúscula e o resto minúscula
export function formatarNome(nome: string): string {
  const palavras = nome.trim().split(" ");
  let resultado = "";
  for (const palavra of palavras) {
    if (palavra === "") continue;
    const nova = palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    resultado = resultado === "" ? nova : resultado + " " + nova;
  }
  return resultado;
}
