use huione_anchor_cli::Opts;
use anyhow::Result;
use clap::Parser;

fn main() -> Result<()> {
    huione_anchor_cli::entry(Opts::parse())
}
