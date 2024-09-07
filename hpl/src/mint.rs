use huione_anchor_lang::huione_program::declare_id;

pub use srm::ID as SRM;
mod srm {
    use super::*;
    declare_id!("SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt");
}

pub use usdc::ID as USDC;
mod usdc {
    use super::*;
    declare_id!("3Zm8ffyPSB5CGPMJ9twr29iFqoYhGLmvUV3hQ7YJiwg7");
}
