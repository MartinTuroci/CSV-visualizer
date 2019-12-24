export default class CsvObjectModel {
  constructor(private _x: number, private _y: number, private _description: string) {}

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get description(): string {
    return this._description;
  }
}
