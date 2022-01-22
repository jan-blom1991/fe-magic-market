export class Image {
  public id: number;
  public fileName: string;
  public contentType: string;
  public bytes: string;
  public url: string;

  public constructor(init?: Partial<Image>) {
    Object.assign(this, init);
  }
}
