export interface BaseList {
  all: () => Promise<void>;
  ionViewWillEnter: () => void;
}
