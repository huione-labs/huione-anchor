use huione_anchor_lang::huione_program::account_info::AccountInfo;
use huione_anchor_lang::huione_program::pubkey::Pubkey;
use huione_anchor_lang::Result;
use huione_anchor_lang::{context::CpiContext, Accounts};

pub use hpl_associated_token_account::{get_associated_token_address, ID};

pub fn create<'info>(ctx: CpiContext<'_, '_, '_, 'info, Create<'info>>) -> Result<()> {
    let ix = hpl_associated_token_account::create_associated_token_account(
        ctx.accounts.payer.key,
        ctx.accounts.authority.key,
        ctx.accounts.mint.key,
    );
    huione_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.payer,
            ctx.accounts.associated_token,
            ctx.accounts.authority,
            ctx.accounts.mint,
            ctx.accounts.system_program,
            ctx.accounts.token_program,
            ctx.accounts.rent,
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

#[derive(Accounts)]
pub struct Create<'info> {
    pub payer: AccountInfo<'info>,
    pub associated_token: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
}

#[derive(Clone)]
pub struct AssociatedToken;

impl huione_anchor_lang::Id for AssociatedToken {
    fn id() -> Pubkey {
        ID
    }
}
