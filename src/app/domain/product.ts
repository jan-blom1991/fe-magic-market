import {Image} from './image';

export class Product {
  public id: number;
  public name: string;
  public category: string;
  public description: string;
  public stock: number;
  public price: number;
  public images: Image[];
  public imagesInUrl: string[];

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
