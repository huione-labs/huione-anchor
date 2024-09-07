import { Program, Provider } from "../index.js";
import { program as tokenProgram, HplToken } from "./token.js";

export { HplToken } from "./token.js";

export class Hpl {
  public static token(provider?: Provider): Program<HplToken> {
    return tokenProgram(provider);
  }
}
