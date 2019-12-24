export default class DataWrapper<T> {
  constructor(
    private _maxX: number,
    private _minX: number,
    private _maxY: number,
    private _minY: number,
    private _dataArr: T
  ) {}

  get minX() {
    return this._minX;
  }

  get minY() {
    return this._minY;
  }

  get maxX() {
    return this._maxX;
  }

  get maxY() {
    return this._maxY;
  }

  get data() {
    return this._dataArr;
  }
}
