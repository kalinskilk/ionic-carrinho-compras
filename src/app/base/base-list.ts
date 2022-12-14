export interface BaseList {
  all: (...params: any) => Promise<void>;
  ionViewWillEnter: () => void;
}
