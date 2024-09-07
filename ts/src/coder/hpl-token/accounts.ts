import * as BufferLayout from "buffer-layout";
import { publicKey, uint64, coption, bool, uint128 } from "./buffer-layout.js";
import { AccountsCoder } from "../index.js";
import { Idl, IdlTypeDef } from "../../idl.js";
import { accountSize } from "../common.js";

export class HplTokenAccountsCoder<A extends string = string>
  implements AccountsCoder
{
  constructor(private idl: Idl) {}

  public async encode<T = any>(accountName: A, account: T): Promise<Buffer> {
    switch (accountName) {
      case "token": {
        const buffer = Buffer.alloc(189);
        const len = TOKEN_ACCOUNT_LAYOUT.encode(account, buffer);
        return buffer.slice(0, len);
      }
      case "mint": {
        const buffer = Buffer.alloc(90);
        const len = MINT_ACCOUNT_LAYOUT.encode(account, buffer);
        return buffer.slice(0, len);
      }
      case "mintMeta": {
        const buffer = Buffer.alloc(205);
        const len = TOKEN_META_LAYOUT.encode(account, buffer);
        return buffer.slice(0, len);
      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  public decode<T = any>(accountName: A, ix: Buffer): T {
    return this.decodeUnchecked(accountName, ix);
  }

  public decodeUnchecked<T = any>(accountName: A, ix: Buffer): T {
    switch (accountName) {
      case "token": {
        return decodeTokenAccount(ix);
      }
      case "mint": {
        return decodeMintAccount(ix);
      }
      case "mintMeta": {
        return decodeMintMetaAccount(ix);
      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  // TODO: this won't use the appendData.
  public memcmp(accountName: A, _appendData?: Buffer): any {
    switch (accountName) {
      case "token": {
        return {
          dataSize: 189,
        };
      }
      case "mint": {
        return {
          dataSize: 90,
        };
      }
      case "mintMeta": {
        return {
          dataSize: 205,
        };
      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  public size(idlAccount: IdlTypeDef): number {
    return accountSize(this.idl, idlAccount) ?? 0;
  }
}

function decodeMintAccount<T = any>(ix: Buffer): T {
  return MINT_ACCOUNT_LAYOUT.decode(ix) as T;
}

function decodeTokenAccount<T = any>(ix: Buffer): T {
  return TOKEN_ACCOUNT_LAYOUT.decode(ix) as T;
}

function decodeMintMetaAccount<T = any>(ix: Buffer): T {
  return TOKEN_META_LAYOUT.decode(ix) as T;
}

const MINT_ACCOUNT_LAYOUT = BufferLayout.struct([
  coption(publicKey(), "mintAuthority"),
  uint128("supply"),
  BufferLayout.u8("decimals"),
  bool("isInitialized"),
  coption(publicKey(), "freezeAuthority"),
]);

const TOKEN_META_LAYOUT = BufferLayout.struct([
  bool("isInitialized"),
  coption(publicKey(), "Authority"),
  BufferLayout.blob(168,'meta'),
]);


const TOKEN_ACCOUNT_LAYOUT = BufferLayout.struct([
  publicKey("mint"),
  publicKey("authority"),
  uint128("amount"),
  coption(publicKey(), "delegate"),
  BufferLayout.u8("state"),
  coption(uint128(), "isNative"),
  uint128("delegatedAmount"),
  coption(publicKey(), "closeAuthority"),
]);
