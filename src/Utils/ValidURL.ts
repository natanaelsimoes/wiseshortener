const urlPattern: RegExp = new RegExp(
    /*   Protocolo */ "^(https?:\\/\\/)?" +
      /* Domínio   */ "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      /* Ou IP     */ "((\\d{1,3}\\.){3}\\d{1,3}))" +
      /* Porta e Caminho */ "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      /* Consulta */ "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

function ValidURL(url: string): boolean {
  return !!urlPattern.test(url);
}

export default ValidURL;