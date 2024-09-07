import { PublicKey } from "@xoneorg/web3.js";

export const TOKEN_PROGRAM_ID = new PublicKey(
  "HuiToken11111111111111111111111111111111111"
);
export const ASSOCIATED_PROGRAM_ID = new PublicKey(
  "HuiATA1111111111111111111111111111111111111"
);

export async function associatedAddress({
  mint,
  owner,
}: {
  mint: PublicKey;
  owner: PublicKey;
}): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_PROGRAM_ID
    )
  )[0];
}
