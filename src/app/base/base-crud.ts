export interface BaseCrud {
  all: (...params: any) => Promise<any>;
  delete: (id: number) => Promise<any>;
}
