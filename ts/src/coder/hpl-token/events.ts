import { EventCoder } from "../index.js";
import { Idl } from "../../idl.js";
import { Event } from "../../program/event.js";
import { IdlEvent } from "../../idl.js";

export class HplTokenEventsCoder implements EventCoder {
  constructor(_idl: Idl) {}

  decode<E extends IdlEvent = IdlEvent, T = Record<string, string>>(
    _log: string
  ): Event<E, T> | null {
    throw new Error("HPL token program does not have events");
  }
}
