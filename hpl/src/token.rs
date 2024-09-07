use huione_anchor_lang::huione_program::account_info::AccountInfo;

use huione_anchor_lang::huione_program::program_pack::Pack;
use huione_anchor_lang::huione_program::pubkey::Pubkey;
use huione_anchor_lang::{context::CpiContext, Accounts};
use huione_anchor_lang::{huione_program, Result};
use huione_program::msg;
use std::error::Error;
use std::io::{Write};
use std::ops::Deref;
use std::str::FromStr;

pub use hpl_token;
pub use hpl_token::ID;

pub fn transfer<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, Transfer<'info>>,
    amount: u128,
) -> Result<()> {
    let ix = hpl_token::instruction::transfer(
        &hpl_token::ID,
        ctx.accounts.from.key,
        ctx.accounts.to.key,
        ctx.accounts.authority.key,
        &[],
        amount,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.from.clone(),
            ctx.accounts.to.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn mint_to<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, MintTo<'info>>,
    amount: u128,
) -> Result<()> {
    let ix = hpl_token::instruction::mint_to(
        &hpl_token::ID,
        ctx.accounts.mint.key,
        ctx.accounts.to.key,
        ctx.accounts.authority.key,
        &[],
        amount,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.to.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn burn<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, Burn<'info>>,
    amount: u128,
) -> Result<()> {
    let ix = hpl_token::instruction::burn(
        &hpl_token::ID,
        ctx.accounts.from.key,
        ctx.accounts.mint.key,
        ctx.accounts.authority.key,
        &[],
        amount,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.from.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn approve<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, Approve<'info>>,
    amount: u128,
) -> Result<()> {
    let ix = hpl_token::instruction::approve(
        &hpl_token::ID,
        ctx.accounts.to.key,
        ctx.accounts.delegate.key,
        ctx.accounts.authority.key,
        &[],
        amount,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.to.clone(),
            ctx.accounts.delegate.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn revoke<'a, 'b, 'c, 'info>(ctx: CpiContext<'a, 'b, 'c, 'info, Revoke<'info>>) -> Result<()> {
    let ix = hpl_token::instruction::revoke(
        &hpl_token::ID,
        ctx.accounts.source.key,
        ctx.accounts.authority.key,
        &[],
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[ctx.accounts.source.clone(), ctx.accounts.authority.clone()],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn initialize_account<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, InitializeAccount<'info>>,
) -> Result<()> {
    let ix = hpl_token::instruction::initialize_account(
        &hpl_token::ID,
        ctx.accounts.account.key,
        ctx.accounts.mint.key,
        ctx.accounts.authority.key,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.account.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.authority.clone(),
            ctx.accounts.rent.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn close_account<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, CloseAccount<'info>>,
) -> Result<()> {
    let ix = hpl_token::instruction::close_account(
        &hpl_token::ID,
        ctx.accounts.account.key,
        ctx.accounts.destination.key,
        ctx.accounts.authority.key,
        &[], // TODO: support multisig
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.account.clone(),
            ctx.accounts.destination.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn freeze_account<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, FreezeAccount<'info>>,
) -> Result<()> {
    let ix = hpl_token::instruction::freeze_account(
        &hpl_token::ID,
        ctx.accounts.account.key,
        ctx.accounts.mint.key,
        ctx.accounts.authority.key,
        &[], // TODO: Support multisig signers.
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.account.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn thaw_account<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, ThawAccount<'info>>,
) -> Result<()> {
    let ix = hpl_token::instruction::thaw_account(
        &hpl_token::ID,
        ctx.accounts.account.key,
        ctx.accounts.mint.key,
        ctx.accounts.authority.key,
        &[], // TODO: Support multisig signers.
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.account.clone(),
            ctx.accounts.mint.clone(),
            ctx.accounts.authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn initialize_mint<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, InitializeMint<'info>>,
    decimals: u8,
    authority: &Pubkey,
    freeze_authority: Option<&Pubkey>,
) -> Result<()> {
    let ix = hpl_token::instruction::initialize_mint(
        &hpl_token::ID,
        ctx.accounts.mint.key,
        authority,
        freeze_authority,
        decimals,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[ctx.accounts.mint.clone(), ctx.accounts.rent.clone()],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn set_authority<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, SetAuthority<'info>>,
    authority_type: hpl_token::instruction::AuthorityType,
    new_authority: Option<Pubkey>,
) -> Result<()> {
    let mut hpl_new_authority: Option<&Pubkey> = None;
    if new_authority.is_some() {
        hpl_new_authority = new_authority.as_ref()
    }

    let ix = hpl_token::instruction::set_authority(
        &hpl_token::ID,
        ctx.accounts.account_or_mint.key,
        hpl_new_authority,
        authority_type,
        ctx.accounts.current_authority.key,
        &[], // TODO: Support multisig signers.
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.account_or_mint.clone(),
            ctx.accounts.current_authority.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn create_mint_meta_account<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, CreateMintMetaAccount<'info>>,
) -> Result<()> {
    let ix = hpl_token::instruction::create_mint_meta_account(
        &hpl_token::ID,
        ctx.accounts.payer.key,
        ctx.accounts.mint.key,
        ctx.accounts.mint_meta.key,
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[ctx.accounts.payer.clone(),ctx.accounts.mint.clone(), ctx.accounts.mint_meta.clone(),
        ctx.accounts.token_program.clone(),ctx.accounts.system_program.clone(), ctx.accounts.rent.clone(),
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}


pub fn initialize_mint_meta<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, InitializeMintMeta<'info>>,
    symbol:String,
    name:String,
    icon:String,
) -> Result<()> {
    let ix = hpl_token::instruction::initialize_mint_meta(
        &hpl_token::ID,
        ctx.accounts.mint.key,
        ctx.accounts.mint_meta.key,
        symbol,
        name,
        icon,
        // *name.deref(),
        // *icon.deref(),
        // *symbol.deref(),
        // *name.deref(),
        // *icon.deref()
        // hpl_token::state::TokenSymbol::default(),
        // hpl_token::state::TokenName::default(),
        // hpl_token::state::TokenIcon::default(),
        // hpl_token::state::TokenSymbol::try_from(symbol.as_str()).unwrap(),
        // hpl_token::state::TokenName::try_from(name.as_str()).unwrap(),
        // hpl_token::state::TokenIcon::try_from(icon.as_str()).unwrap(),
    )?;
    huione_program::program::invoke_signed(
        &ix,
        &[ctx.accounts.authority.clone(),ctx.accounts.mint.clone(),ctx.accounts.mint_meta.clone(), ctx.accounts.rent.clone()],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}


#[derive(Accounts)]
pub struct Transfer<'info> {
    pub from: AccountInfo<'info>,
    pub to: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MintTo<'info> {
    pub mint: AccountInfo<'info>,
    pub to: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Burn<'info> {
    pub mint: AccountInfo<'info>,
    pub from: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Approve<'info> {
    pub to: AccountInfo<'info>,
    pub delegate: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Revoke<'info> {
    pub source: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeAccount<'info> {
    pub account: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CloseAccount<'info> {
    pub account: AccountInfo<'info>,
    pub destination: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct FreezeAccount<'info> {
    pub account: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ThawAccount<'info> {
    pub account: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeMint<'info> {
    pub mint: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SetAuthority<'info> {
    pub current_authority: AccountInfo<'info>,
    pub account_or_mint: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateMintMetaAccount<'info> {
    pub payer: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub mint_meta: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
}
#[derive(Accounts)]
pub struct InitializeMintMeta<'info> {
    pub authority: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub mint_meta: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
}

#[derive(Clone)]
pub struct TokenAccount(hpl_token::state::Account);

impl TokenAccount {
    pub const LEN: usize = hpl_token::state::Account::LEN;
}

impl huione_anchor_lang::AccountDeserialize for TokenAccount {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> huione_anchor_lang::Result<Self> {
        hpl_token::state::Account::unpack(buf)
            .map(TokenAccount)
            .map_err(Into::into)
    }
}

impl huione_anchor_lang::AccountSerialize for TokenAccount {}

impl huione_anchor_lang::Owner for TokenAccount {
    fn owner() -> Pubkey {
        ID
    }
}

impl Deref for TokenAccount {
    type Target = hpl_token::state::Account;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone)]
pub struct Mint(hpl_token::state::Mint);

impl Mint {
    pub const LEN: usize = hpl_token::state::Mint::LEN;
}

impl huione_anchor_lang::AccountDeserialize for Mint {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> huione_anchor_lang::Result<Self> {
        hpl_token::state::Mint::unpack(buf)
            .map(Mint)
            .map_err(Into::into)
    }
}

impl huione_anchor_lang::AccountSerialize for Mint {}

impl huione_anchor_lang::Owner for Mint {
    fn owner() -> Pubkey {
        ID
    }
}

impl Deref for Mint {
    type Target = hpl_token::state::Mint;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone)]
pub struct MintMeta(hpl_token::state::MintMeta);

impl MintMeta {
    pub const LEN: usize = hpl_token::state::MintMeta::LEN;
}

impl huione_anchor_lang::AccountDeserialize for MintMeta {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> huione_anchor_lang::Result<Self> {
        hpl_token::state::MintMeta::unpack(buf)
            .map(MintMeta)
            .map_err(Into::into)
    }
}

impl huione_anchor_lang::AccountSerialize for MintMeta {}

impl huione_anchor_lang::Owner for MintMeta {
    fn owner() -> Pubkey {
        ID
    }
}


impl Deref for MintMeta {
    type Target = hpl_token::state::MintMeta;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}


#[derive(Clone)]
pub struct Token;

impl huione_anchor_lang::Id for Token {
    fn id() -> Pubkey {
        ID
    }
}

// Field parsers to save compute. All account validation is assumed to be done
// outside of these methods.
pub mod accessor {
    use super::*;

    pub fn amount(account: &AccountInfo) -> Result<u128> {
        let bytes = account.try_borrow_data()?;
        let mut amount_bytes = [0u8; 16];
        amount_bytes.copy_from_slice(&bytes[64..80]);
        Ok(u128::from_le_bytes(amount_bytes))
    }

    pub fn mint(account: &AccountInfo) -> Result<Pubkey> {
        let bytes = account.try_borrow_data()?;
        let mut mint_bytes = [0u8; 32];
        mint_bytes.copy_from_slice(&bytes[..32]);
        Ok(Pubkey::new_from_array(mint_bytes))
    }

    pub fn authority(account: &AccountInfo) -> Result<Pubkey> {
        let bytes = account.try_borrow_data()?;
        let mut owner_bytes = [0u8; 32];
        owner_bytes.copy_from_slice(&bytes[32..64]);
        Ok(Pubkey::new_from_array(owner_bytes))
    }
}
