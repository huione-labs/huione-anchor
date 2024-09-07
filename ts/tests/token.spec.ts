import {Hpl,AnchorProvider,Wallet} from '../src';
import {u128} from '../src/coder/hpl-token/buffer-layout.js';

import { 
    Keypair, 
    PublicKey,
    Connection, 
    SYSVAR_RENT_PUBKEY,
    LAMPORTS_PER_HC,
    Transaction,
    TransactionInstruction,
    SystemProgram,
    Signer } from "@xoneorg/web3.js";
import * as fs from "fs/promises";

const KEYPAIR_PATH = "/root/.config/huione/token.json";

let hasBalance = false;

const info = (s: string) => {
    console.log(`\x1b[1;36m${s}\x1b[0m`);
  };

async function loadKp() {
    try {
      const kpBytes = await fs.readFile(KEYPAIR_PATH);
      const kp = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(kpBytes.toString()))
      );
  
      return kp;
    } catch {
      info("Creating test keypair file...");
      const randomKp = new Keypair();
      await fs.writeFile(
        KEYPAIR_PATH,
        JSON.stringify(Array.from(randomKp.secretKey))
      );
      return randomKp;
    }
  }

async function getProvider() {
    const kp = await loadKp();

    const ENDPOINT = "https://pubchain-rpc.xone.la";
    const conn = new Connection(ENDPOINT, {
        commitment: "confirmed",
    });
    
    const wallet = new Wallet(kp);
    const provider = new AnchorProvider(
        conn,
        wallet,
        AnchorProvider.defaultOptions()
    );

    if (!hasBalance && !(await provider.connection.getBalance(kp.publicKey))) {
        const txHash = await provider.connection.requestAirdrop(
        kp.publicKey,
        BigInt(1000 * LAMPORTS_PER_HC)
        );
        await confirmTx(txHash);
        hasBalance = true;
    }

    return provider;
}

async function confirmTx(txHash: string) {
    const provider = await getProvider();
    const blockhashInfo = await provider.connection.getLatestBlockhash();
    await provider.connection.confirmTransaction(txHash,'max');
}

async function sendAndConfirmTx(
    payer :PublicKey,
    ixs: TransactionInstruction[],
    signers: Signer[]
) {
    const provider = await getProvider();
    const blockhashInfo = await provider.connection.getLatestBlockhash();
    const tx = new Transaction().add(...ixs);
    tx.feePayer = payer;
    tx.recentBlockhash = blockhashInfo.blockhash;
    tx.sign(...signers);
    const txHash = await provider.connection.sendRawTransaction(tx.serialize());
    await confirmTx(txHash);

    return txHash;
}

describe("Token", () => {

    it("Token Test", async () => {

        const kpBytes = await fs.readFile("/root/.config/huione/token.json");
        const kp = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(kpBytes.toString()))
        );


        const nkpBytes = await fs.readFile("/root/.config/huione/id.json");
        const nkp = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(nkpBytes.toString()))
        );

        console.log("kp:",kp.publicKey.toString());
        console.log("nkp:",nkp.publicKey.toString());
        // let  p =  Hpl.token(AnchorProvider.env());
        let pr = await getProvider();
        let p = Hpl.token(pr);
        const mintKp = new Keypair();
        let mintPk = mintKp.publicKey;
        console.log("mintPk:",mintPk.toString());
        const createMintAccountIx = await p.account.mint.createInstruction(
        mintKp
        );

        const [mintMeta,_] = await PublicKey.findProgramAddress(
            [ new TextEncoder().encode("MintMeta"), mintPk.toBuffer()],
            p.programId
        );

        const createMintMetaAccountIx = await p.methods
        .createMintMetaAccount()
        .accounts({
          payer: kp.publicKey,
          mint: mintPk,
          mintMeta: mintMeta,
          tokenId:p.programId,
          systemId:SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction();

        const initMintIx = await p.methods
        .initializeMint(6, kp.publicKey, kp.publicKey)
        .accounts({
          mint: mintPk,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction();

        const initMintMetaIx = await p.methods
        .initMintMetaAccount("A","B","C")
        .accounts({
          mint: mintPk,
          mintMeta: mintMeta,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction();

        let sig = await sendAndConfirmTx(kp.publicKey,[createMintAccountIx, createMintMetaAccountIx, initMintIx, initMintMetaIx], [kp, mintKp]);
        console.log("sig:",sig);

        let buff = await p.account.mintMeta.getAccountInfo(mintMeta);

        if (buff?.data != undefined){
          let info =  p.account.mintMeta.coder.accounts.decode("mintMeta",buff?.data);
          let metaStr = new TextDecoder("utf-8").decode(info.meta);
          console.log("metaStr:",metaStr);
          let metaArray = metaStr.split('\n');
          console.log("symbol:",metaArray[0]);
          console.log("name:",metaArray[1]);
          console.log("icon:",metaArray[2]);
        }

        const updateSymbolIx = await p.methods.updateSymbol("NNNN")
        .accounts({
          mintMeta: mintMeta,
          authority: kp.publicKey,
        })
        .instruction();

        const updateNameIx = await p.methods.updateName("New Name")
        .accounts({
          mintMeta: mintMeta,
          authority: kp.publicKey,
        })
        .instruction();

        const updateIconIx = await p.methods.updateIcon("New Icon")
        .accounts({
          mintMeta: mintMeta,
          authority: kp.publicKey,
        })
        .instruction();

        sig = await sendAndConfirmTx(kp.publicKey,[updateSymbolIx, updateNameIx, updateIconIx], [kp]);
        console.log("updateIconIx sig:",sig);

        buff = await p.account.mintMeta.getAccountInfo(mintMeta);

        if (buff?.data != undefined){
          let info =  p.account.mintMeta.coder.accounts.decode("mintMeta",buff?.data);
          console.log("Authority:",info.Authority.toString());
          let metaStr = new TextDecoder("utf-8").decode(info.meta);
          console.log("metaStr:",metaStr);
          let metaArray = metaStr.split('\n');
          console.log("symbol:",metaArray[0]);
          console.log("name:",metaArray[1]);
          console.log("icon:",metaArray[2]);
        }

        // set meta update Authority
        const setAuthorityIx =  await p.methods.setAuthority(4,nkp.publicKey)
        .accounts(
          {
          mint: mintMeta,
          authority: kp.publicKey,
          }
        ).instruction();

        sig = await sendAndConfirmTx(kp.publicKey,[setAuthorityIx], [kp]);
        console.log("updateIconIx sig:",sig);

        buff = await p.account.mintMeta.getAccountInfo(mintMeta);

        if (buff?.data != undefined){
          let info =  p.account.mintMeta.coder.accounts.decode("mintMeta",buff?.data);
          // let o = new PublicKey(info.authority); 
          console.log("newAuthority:",info.Authority.toString());
          
          let metaStr = new TextDecoder("utf-8").decode(info.meta);
          console.log("metaStr:",metaStr);
          let metaArray = metaStr.split('\n');
          console.log("symbol:",metaArray[0]);
          console.log("name:",metaArray[1]);
          console.log("icon:",metaArray[2]);
          info
        }
    });

    it("Token Mint To", async () => {

      const mintOwnerBytes = await fs.readFile("/root/.config/huione/id.json");
      const mintOwner = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(mintOwnerBytes.toString()))
      );

      let pr = await getProvider();
      let p = Hpl.token(pr);
      // let mint = new PublicKey("48NSiCzEAqW9DKvNuJMNEZ3gLMafwZQo916dwF3T2g4Y");
      let mint = new PublicKey("3ZUVWufVQPCoMXGcdgCDBpRk7PkUevi7VMtGF9p1abfU");
      
      // let recipient_add = new PublicKey("4NnN6AuyK8am5XnPQKz9Lz7nZvUWq6PiypEuUuxoxWnK");
      let recipient_add = new PublicKey("9jqy21W1YhtydwwSoWfAum6BWY71wXfi2KTDJ6TzGFAi");
      
      let mount = new u128("340282366920938463463374607431768211455");
      const mintToIx = await p.methods.mintTo(mount)
        .accounts({
            mint,
            to:recipient_add,
            authority:mintOwner.publicKey
        })
        .instruction();
      
      let sig = await sendAndConfirmTx(mintOwner.publicKey,[mintToIx], [mintOwner]);
      console.log("sig:",sig);

      let mountOwerFlow = new u128("1");
      const mintToOwerFlowIx = await p.methods.mintTo(mountOwerFlow)
      .accounts({
          mint,
          to:recipient_add,
          authority:mintOwner.publicKey
      })
      .instruction();
    
    let sigOwerFlow = await sendAndConfirmTx(mintOwner.publicKey,[mintToOwerFlowIx], [mintOwner]);
    console.log("sig:",sigOwerFlow);

    });

  });
  
