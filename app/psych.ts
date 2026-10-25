import Datum from "./datum";

export default class Psychromatics {
    magicNumbers = {
        sensible: 1.1 as number,
        latent: .68 as number,
        total: 4.45 as number
    };
    entry: Datum;
    exit: Datum;
    air: number;
    constructor(entry: Datum, exit: Datum, air: number) {
        this.entry = entry;
        this.exit = exit;
        this.air = air;
    }
    sensibleHeat(entry: Datum, exit: Datum, air: number): number {
        if (air == undefined) {
            throw new Error("No CFM value!");
            return 0;
        }
        if (exit.dbt && entry.dbt) {
            return this.magicNumbers.sensible * air * (exit.dbt - entry.dbt)
        } else {
            throw new Error("Missing dry bulb temperature!")
        }
    }

    latentHeat(entry: Datum, exit: Datum, air: number): number {
        if (air == undefined) {
            throw new Error("No CFM value!");
            return 0;
        }
        if (exit.w && entry.w) {
           return this.magicNumbers.latent * air * (exit.w - entry.w)
        } else {
            throw new Error("Missing humidity ratio!")
        }
    }

    totalByH(entry: Datum, exit: Datum, air: number): number {
        if (air == undefined) {
            throw new Error("No CFM value!");
            return 0;
        }
        if (exit.h && entry.h) {
        return this.magicNumbers.total * air * (exit.h - entry.h)
        } else {
            throw new Error("Missing enthalpy value!")
        }
    }

    totalBySum(entry: Datum, exit: Datum, air: number): number {
        if (air == undefined) {
            throw new Error("No CFM value!");
            return 0;
        }
        return this.sensibleHeat(entry, exit, air) + this.latentHeat(entry, exit, air)
    }

    print(){
        console.log(`Sensible Heat: ${this.sensibleHeat(this.entry, this.exit, this.air)} btu, Latent Heat: ${this.latentHeat(this.entry, this.exit, this.air)} btu, Total Heat (by enthalpy): ${this.totalByH(this.entry, this.exit, this.air)} btu, Total Heat (by sum of latent and sensible): ${this.totalBySum(this.entry, this.exit, this.air)} btu `)
    }
}