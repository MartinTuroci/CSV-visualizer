export default class DataWrapper<T> {
  constructor(
    private _maxX: number,
    private _minX: number,
    private _maxY: number,
    private _minY: number,
    private _labelX: string,
    private _labelY: string,
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

  get labelX() {
    return this._labelX;
  }

  get labelY() {
    return this._labelY;
  }

  get data() {
    return this._dataArr;
  }
}
