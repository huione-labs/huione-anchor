import * as BufferLayout from "buffer-layout";
import camelCase from "camelcase";
import { PublicKey } from "@xoneorg/web3.js";
import { InstructionCoder } from "../index.js";
import { Idl } from "../../idl.js";
import { uint128 } from "./buffer-layout.js";

export class HplTokenInstructionCoder implements InstructionCoder {
  constructor(_: Idl) {}

  encode(ixName: string, ix: any): Buffer {
    switch (camelCase(ixName)) {
      case "initializeMint": {
        return encodeInitializeMint(ix);
      }
      case "initializeAccount": {
        return encodeInitializeAccount(ix);
      }
      case "initializeMultisig": {
        return encodeInitializeMultisig(ix);
      }
      case "transfer": {
        return encodeTransfer(ix);
      }
      case "approve": {
        return encodeApprove(ix);
      }
      case "revoke": {
        return encodeRevoke(ix);
      }
      case "setAuthority": {
        return encodeSetAuthority(ix);
      }
      case "mintTo": {
        return encodeMintTo(ix);
      }
      case "burn": {
        return encodeBurn(ix);
      }
      case "closeAccount": {
        return encodeCloseAccount(ix);
      }
      case "freezeAccount": {
        return encodeFreezeAccount(ix);
      }
      case "thawAccount": {
        return encodeThawAccount(ix);
      }
      case "transferChecked": {
        return encodeTransferChecked(ix);
      }
      case "approvedChecked": {
        return encodeApproveChecked(ix);
      }
      case "mintToChecked": {
        return encodeMintToChecked(ix);
      }
      case "burnChecked": {
        return encodeBurnChecked(ix);
      }
      case "intializeAccount2": {
        return encodeInitializeAccount2(ix);
      }
      case "syncNative": {
        return encodeSyncNative(ix);
      }
      case "updateSymbol": {
        return encodeUpdateSymbol(ix);
      }
      case "updateName": {
        return encodeUpdateName(ix);
      }
      case "updateIcon": {
        return encodeUpdateIcon(ix);
      }
      case "createMintMetaAccount": {
        return encodeCreateMintMetaAccount(ix);
      }
      case "initMintMetaAccount": {
        return encodeInitMintMetaAccount(ix);
      }
      default: {
        throw new Error(`Invalid instruction: ${ixName}`);
      }
    }
  }

  encodeState(_ixName: string, _ix: any): Buffer {
    throw new Error("HPL token does not have state");
  }
}

function encodeInitializeMint({
  decimals,
  mintAuthority,
  freezeAuthority,

}: any): Buffer {
  return encodeData({
    initializeMint: {
      decimals,
      mintAuthority: mintAuthority.toBuffer(),
      freezeAuthorityOption: !!freezeAuthority,
      freezeAuthority: (freezeAuthority || PublicKey.default).toBuffer(),
    },
  });
}

function encodeInitializeAccount(_ix: any): Buffer {
  return encodeData({
    initializeAccount: {},
  });
}

function encodeInitializeMultisig({ m }: any): Buffer {
  return encodeData({
    initializeMultisig: {
      m,
    },
  });
}

function encodeTransfer({ amount }: any): Buffer {
  return encodeData({
    transfer: { amount },
  });
}

function encodeApprove({ amount }: any): Buffer {
  return encodeData({
    approve: { amount },
  });
}

function encodeRevoke(_ix: any): Buffer {
  return encodeData({
    revoke: {},
  });
}

function encodeSetAuthority({ authorityType, newAuthority }: any): Buffer {
  return encodeData({
    setAuthority: { 
      authorityType,
      newAuthorityOption : !!newAuthority,
      newAuthority: (newAuthority || PublicKey.default).toBuffer(),
    },
  });
}

function encodeMintTo({ amount }: any): Buffer {
  return encodeData({
    mintTo: { amount },
  });
}

function encodeBurn({ amount }: any): Buffer {
  return encodeData({
    burn: { amount },
  });
}

function encodeCloseAccount(_: any): Buffer {
  return encodeData({
    closeAccount: {},
  });
}

function encodeFreezeAccount(_: any): Buffer {
  return encodeData({
    freezeAccount: {},
  });
}

function encodeThawAccount(_: any): Buffer {
  return encodeData({
    thawAccount: {},
  });
}

function encodeTransferChecked({ amount, decimals }: any): Buffer {
  return encodeData({
    transferChecked: { amount, decimals },
  });
}

function encodeApproveChecked({ amount, decimals }: any): Buffer {
  return encodeData({
    approveChecked: { amount, decimals },
  });
}

function encodeMintToChecked({ amount, decimals }: any): Buffer {
  return encodeData({
    mintToChecked: { amount, decimals },
  });
}

function encodeBurnChecked({ amount, decimals }: any): Buffer {
  return encodeData({
    burnChecked: { amount, decimals },
  });
}

function encodeInitializeAccount2({ authority }: any): Buffer {
  return encodeData({
    initilaizeAccount2: { authority },
  });
}

function encodeSyncNative(_: any): Buffer {
  return encodeData({
    syncNative: {},
  });
}

function encodeUpdateSymbol({ symbol }: any): Buffer {
  let symbol_str = symbol.toString() + '\n';
  let symbol_buff = Buffer.from(symbol_str.toString());
  let buff_zeroPad = Buffer.alloc(8);
  symbol_buff.copy(buff_zeroPad);
  return encodeData({
    updateSymbol: { symbol:buff_zeroPad },
  });
}

function encodeUpdateName({ name }: any): Buffer {
  let name_str = name.toString() + '\n';
  let name_buff = Buffer.from(name_str.toString());
  let buff_zeroPad = Buffer.alloc(32);
  name_buff.copy(buff_zeroPad);
  return encodeData({
    updateName: { name:buff_zeroPad },
  });
}

function encodeUpdateIcon({ icon }: any): Buffer {
  let icon_str = icon.toString() + '\n';
  let icon_buff = Buffer.from(icon_str.toString());
  let buff_zeroPad = Buffer.alloc(128);
  icon_buff.copy(buff_zeroPad);
  return encodeData({
    updateIcon: { icon:buff_zeroPad },
  });
}

function encodeCreateMintMetaAccount({ }: any): Buffer {
  return encodeData({
    createMintMetaAccount: {},
  });
}


function encodeInitMintMetaAccount({
  symbol,
  name,
  icon
}: any): Buffer {
  let meta_str = symbol.toString() + '\n' + name.toString() + '\n' + icon.toString() + '\n';
  let meta_buff = Buffer.from(meta_str.toString());
  let buff_zeroPad = Buffer.alloc(168);
  meta_buff.copy(buff_zeroPad);
  return encodeData({
    initMintMetaAccount: {
      meta:buff_zeroPad,
    },
  });
}

const LAYOUT = BufferLayout.union(BufferLayout.u8("instruction"));
LAYOUT.addVariant(
  0,
  BufferLayout.struct([
  BufferLayout.u8("decimals"),
  BufferLayout.blob(32, "mintAuthority"),
  BufferLayout.u8("freezeAuthorityOption"),
  publicKey("freezeAuthority"),
  ]),
  "initializeMint"
);
LAYOUT.addVariant(1, BufferLayout.struct([]), "initializeAccount");
LAYOUT.addVariant(
  2,
  BufferLayout.struct([BufferLayout.u8("m")]),
  "initializeMultisig"
);
LAYOUT.addVariant(
  3,
  BufferLayout.struct([uint128("amount")]),
  "transfer"
);
LAYOUT.addVariant(
  4,
  BufferLayout.struct([uint128("amount")]),
  "approve"
);
LAYOUT.addVariant(5, BufferLayout.struct([]), "revoke");
LAYOUT.addVariant(
  6,
  BufferLayout.struct([
  BufferLayout.u8("authorityType"),
  BufferLayout.u8("newAuthorityOption"),
  publicKey("newAuthority"),
  ]),
  "setAuthority"
);
LAYOUT.addVariant(
  7,
  BufferLayout.struct([uint128("amount")]),
  "mintTo"
);
LAYOUT.addVariant(
  8,
  BufferLayout.struct([uint128("amount")]),
  "burn"
);
LAYOUT.addVariant(9, BufferLayout.struct([]), "closeAccount");
LAYOUT.addVariant(10, BufferLayout.struct([]), "freezeAccount");
LAYOUT.addVariant(11, BufferLayout.struct([]), "thawAccount");
LAYOUT.addVariant(
  12,
  BufferLayout.struct([
    uint128("amount"),
    BufferLayout.u8("decimals"),
  ]),
  "transferChecked"
);
LAYOUT.addVariant(
  13,
  BufferLayout.struct([
    uint128("amount"),
    BufferLayout.u8("decimals"),
  ]),
  "approvedChecked"
);
LAYOUT.addVariant(
  14,
  BufferLayout.struct([
    BufferLayout.nu64("amount"),
    uint128("decimals"),
  ]),
  "mintToChecked"
);
LAYOUT.addVariant(
  15,
  BufferLayout.struct([
    uint128("amount"),
    BufferLayout.u8("decimals"),
  ]),
  "burnedChecked"
);
LAYOUT.addVariant(
  16,
  BufferLayout.struct([publicKey("authority")]),
  "InitializeAccount2"
);
LAYOUT.addVariant(17, BufferLayout.struct([]), "syncNative");
LAYOUT.addVariant(
  18,
  BufferLayout.struct([
    BufferLayout.blob(8,'symbol'),
  ]),
  "updateSymbol"
);
LAYOUT.addVariant(
  19,
  BufferLayout.struct([
    BufferLayout.blob(32,'name'),
  ]),
  "updateName"
);
LAYOUT.addVariant(
  20,
  BufferLayout.struct([
    BufferLayout.blob(128,'icon'),
  ]),
  "updateIcon"
);
LAYOUT.addVariant(
  21,
  BufferLayout.struct([
  ]),
  "createMintMetaAccount"
);
LAYOUT.addVariant(
  22,
  BufferLayout.struct([
    BufferLayout.blob(168,'meta'),
  ]),
  "initMintMetaAccount"
);

function publicKey(property: string): any {
  return BufferLayout.blob(32, property);
}

function encodeData(instruction: any): Buffer {
  let b = Buffer.alloc(instructionMaxSpan);
  let span = LAYOUT.encode(instruction, b);
  return b.slice(0, span);
}

const instructionMaxSpan = Math.max(
  // @ts-ignore
  ...Object.values(LAYOUT.registry).map((r) => r.span)
);

