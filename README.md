<div align="center">
  <img height="170x" src="https://media.discordapp.net/attachments/813444514949103658/890278520553603092/export.png?width=746&height=746" />

  <h1>Anchor</h1>

  <p>
    <strong>HUIONE Sealevel Framework</strong>
  </p>

  <p>
    <a href="https://github.com/huione/anchor/actions"><img alt="Build Status" src="https://github.com/huione/anchor/actions/workflows/tests.yaml/badge.svg" /></a>
    <a href="https://huione.github.io/anchor/"><img alt="Tutorials" src="https://img.shields.io/badge/docs-tutorials-blueviolet" /></a>
    <a href="https://discord.gg/PDeRXyVURd"><img alt="Discord Chat" src="https://img.shields.io/discord/889577356681945098?color=blueviolet" /></a>
    <a href="https://opensource.org/licenses/Apache-2.0"><img alt="License" src="https://img.shields.io/github/license/huione/anchor?color=blueviolet" /></a>
  </p>
</div>

Anchor is a framework for HUIONE's [Sealevel](https://medium.com/huione-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) runtime providing several convenient developer tools for writing smart contracts.

- Rust eDSL for writing HUIONE programs
- [IDL](https://en.wikipedia.org/wiki/Interface_description_language) specification
- TypeScript package for generating clients from IDL
- CLI and workspace management for developing complete applications

If you're familiar with developing in Ethereum's [Solidity](https://docs.soliditylang.org/en/v0.7.4/), [Truffle](https://www.trufflesuite.com/), [web3.js](https://github.com/ethereum/web3.js), then the experience will be familiar. Although the DSL syntax and semantics are targeted at HUIONE, the high level flow of writing RPC request handlers, emitting an IDL, and generating clients from IDL is the same.

## Getting Started

For a quickstart guide and in depth tutorials, see the [anchor book](https://book.anchor-lang.com) and the older [documentation](https://huione.github.io/anchor/getting-started/introduction.html) that is being phased out.
To jump straight to examples, go [here](https://github.com/huione/anchor/tree/master/examples). For the latest Rust and TypeScript API documentation, see [docs.rs](https://docs.rs/anchor-lang) and the [typedoc](https://huione.github.io/anchor/ts/index.html).

<!-- ## Packages

| Package | Description | Version | Docs |
| :-- | :-- | :--| :-- |
| `anchor-lang` | Rust primitives for writing programs on HUIONE | [![Crates.io](https://img.shields.io/crates/v/anchor-lang?color=blue)](https://crates.io/crates/anchor-lang) | [![Docs.rs](https://docs.rs/anchor-lang/badge.svg)](https://docs.rs/anchor-lang) |
| `anchor-spl` | CPI clients for SPL programs on HUIONE | ![crates](https://img.shields.io/crates/v/anchor-spl?color=blue) | [![Docs.rs](https://docs.rs/anchor-spl/badge.svg)](https://docs.rs/anchor-spl) |
| `anchor-client` | Rust client for Anchor programs | ![crates](https://img.shields.io/crates/v/anchor-client?color=blue) | [![Docs.rs](https://docs.rs/anchor-client/badge.svg)](https://docs.rs/anchor-client) |
| `@xoneorg/anchor` | TypeScript client for Anchor programs | [![npm](https://img.shields.io/npm/v/@xoneorg/anchor.svg?color=blue)](https://www.npmjs.com/package/@xoneorg/anchor) | [![Docs](https://img.shields.io/badge/docs-typedoc-blue)](https://huione.github.io/anchor/ts/index.html) |
| `@xoneorg/anchor-cli` | CLI to support building and managing an Anchor workspace | [![npm](https://img.shields.io/npm/v/@xoneorg/anchor-cli.svg?color=blue)](https://www.npmjs.com/package/@xoneorg/anchor-cli) | [![Docs](https://img.shields.io/badge/docs-typedoc-blue)](https://huione.github.io/anchor/cli/commands.html) | -->

## Note

* **Anchor is in active development, so all APIs are subject to change.**
* **This code is unaudited. Use at your own risk.**

## Examples

Here's a counter program, where only the designated `authority`
can increment the count.

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, start: u64) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.authority = *ctx.accounts.authority.key;
        counter.count = start;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 48)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}
```

<!-- For more, see the [examples](https://github.com/huione/anchor/tree/master/examples)
and [tests](https://github.com/huione/anchor/tree/master/tests) directories. -->

## License

Anchor is licensed under [Apache 2.0](./LICENSE).

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in Anchor by you, as defined in the Apache-2.0 license, shall be
licensed as above, without any additional terms or conditions.

## Contribution

Thank you for your interest in contributing to Anchor!
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how.

### Thanks ❤️
