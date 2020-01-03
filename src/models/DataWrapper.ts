export default class DataWrapper<T> {
  constructor(private _labelX: string, private _labelY: string, private _dataArr: T) {}

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
