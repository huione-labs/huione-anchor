import { Idl } from "../../idl.js";
import { Coder } from "../index.js";
import { HplTokenInstructionCoder } from "./instruction.js";
import { HplTokenStateCoder } from "./state.js";
import { HplTokenAccountsCoder } from "./accounts.js";
import { HplTokenEventsCoder } from "./events.js";

/**
 * Coder for the HPL token program.
 */
export class HplTokenCoder implements Coder {
  readonly instruction: HplTokenInstructionCoder;
  readonly accounts: HplTokenAccountsCoder;
  readonly state: HplTokenStateCoder;
  readonly events: HplTokenEventsCoder;

  constructor(idl: Idl) {
    this.instruction = new HplTokenInstructionCoder(idl);
    this.accounts = new HplTokenAccountsCoder(idl);
    this.events = new HplTokenEventsCoder(idl);
    this.state = new HplTokenStateCoder(idl);
  }
}
