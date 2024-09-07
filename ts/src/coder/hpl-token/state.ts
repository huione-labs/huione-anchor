import { StateCoder } from "../index.js";
import { Idl } from "../../idl.js";

export class HplTokenStateCoder implements StateCoder {
  constructor(_idl: Idl) {}

  encode<T = any>(_name: string, _account: T): Promise<Buffer> {
    throw new Error("HPL token does not have state");
  }
  decode<T = any>(_ix: Buffer): T {
    throw new Error("HPL token does not have state");
  }
}
