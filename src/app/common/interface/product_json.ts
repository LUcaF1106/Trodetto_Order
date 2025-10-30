export interface ProductJson {
  id: number;
  nome: string;
  prezzo: number;
  categoria: string;
  con: {
    id: number;
    nome: string;
  }[];
}
