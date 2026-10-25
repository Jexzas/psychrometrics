export default class Datum {
    dbt?: number;
    wbt?: number;
    h?: number;
    w?: number;
    rh?: number;
    constructor(dbt: number, wbt: number, h: number, w: number, rh: number) {
        if (dbt) {
            this.dbt = dbt;
        }
        if (wbt) {
            this.wbt = wbt;
        }
        if (h) {
            this.h = h;
        }
        if (w) {
            this.w = w;
        }
        if (rh) {
            this.rh = rh;
        }
    }
}