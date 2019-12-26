export default class CsvObjectModel {
  constructor(private _x: number, private _y: number) {}

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
