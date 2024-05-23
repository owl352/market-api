export interface IProductUpdate {
  _id: string;
  price: number | undefined;
  inStock: boolean | undefined;
  isAvailable: boolean | undefined;
  name: string | undefined;
  description: string | undefined;
  additions: string | undefined;
  images: string | undefined;
  previewImg: string | undefined;
}
