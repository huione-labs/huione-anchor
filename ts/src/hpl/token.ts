import { PublicKey } from "@xoneorg/web3.js";
import { Program } from "../program/index.js";
import Provider from "../provider.js";
import { HplTokenCoder } from "../coder/hpl-token/index.js";

const TOKEN_PROGRAM_ID = new PublicKey(
  "HuiToken11111111111111111111111111111111111"
);

export function program(provider?: Provider): Program<HplToken> {
  return new Program<HplToken>(IDL, TOKEN_PROGRAM_ID, provider, coder());
}

export function coder(): HplTokenCoder {
  return new HplTokenCoder(IDL);
}

/**
 * HplToken IDL.
 */
export type HplToken = {
  version: "0.1.0";
  name: "ppl_token";
  instructions: [
    {
      name: "initializeMint";
      accounts: [
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "decimals";
          type: "u8";
        },
        {
          name: "mintAuthority";
          type: "publicKey";
        },
        {
          name: "freezeAuthority";
          type: {
            coption: "publicKey";
          };
        }
      ];
    },
    {
      name: "initializeAccount";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initializeMultisig";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "m";
          type: "u8";
        }
      ];
    },
    {
      name: "transfer";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        }
      ];
    },
    {
      name: "approve";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "delegate";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        }
      ];
    },
    {
      name: "revoke";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "setAuthority";
      accounts: [
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "authorityType";
          type: "u8";
        },
        {
          name: "newAuthority";
          type: {
            coption: "publicKey";
          };
        }
      ];
    },
    {
      name: "mintTo";
      accounts: [
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        }
      ];
    },
    {
      name: "burn";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        }
      ];
    },
    {
      name: "closeAccount";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "freezeAccount";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "thawAccount";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "transferChecked";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "decimals";
          type: "u8";
        }
      ];
    },
    {
      name: "approveChecked";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "delegate";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "decimals";
          type: "u8";
        }
      ];
    },
    {
      name: "mintToChecked";
      accounts: [
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "decimals";
          type: "u8";
        }
      ];
    },
    {
      name: "burnChecked";
      accounts: [
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u128";
        },
        {
          name: "decimals";
          type: "u8";
        }
      ];
    },
    {
      name: "initializeAccount2";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "authority";
          type: "publicKey";
        }
      ];
    },
    {
      name: "syncNative";
      accounts: [
        {
          name: "account";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateSymbol";
      accounts: [
        {
          name: "mintMeta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "symbol";
          type: "string";
        }
      ];
    },
    {
      name: "updateName";
      accounts: [
        {
          name: "mintMeta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        }
      ];
    },
    {
      name: "updateIcon";
      accounts: [
        {
          name: "mintMeta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "icon";
          type: "string";
        }
      ];
    },
    {
      name: "createMintMetaAccount";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintMeta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenId";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemId";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initMintMetaAccount";
      accounts: [
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mintMeta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "icon";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "mint";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mintAuthority";
            type: {
              coption: "publicKey";
            };
          },
          {
            name: "supply";
            type: "u128";
          },
          {
            name: "decimals";
            type: "u8";
          },
          {
            name: "isInitialized";
            type: "bool";
          },
          {
            name: "freezeAuthority";
            type: {
              coption: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "token";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u128";
          },
          {
            name: "delegate";
            type: {
              coption: "publicKey";
            };
          },
          {
            name: "state";
            type: "u8";
          },
          {
            name: "isNative";
            type: {
              coption: "u128";
            };
          },
          {
            name: "delegatedAmount";
            type: "u128";
          },
          {
            name: "closeAuthority";
            type: {
              coption: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "mintMeta";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isInitialized";
            type: "bool";
          },
          {
            name: "authority";
            type: {
              coption: "publicKey";
            };
          },
          {
            name: "symbol";
            type: "string";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "icon";
            type: "string";
          }
        ];
      };
    }
  ];
};

export const IDL: HplToken = {
  version: "0.1.0",
  name: "ppl_token",
  instructions: [
    {
      name: "initializeMint",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "decimals",
          type: "u8",
        },
        {
          name: "mintAuthority",
          type: "publicKey",
        },
        {
          name: "freezeAuthority",
          type: {
            coption: "publicKey",
          },
        }
      ],
    },
    {
      name: "initializeAccount",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initializeMultisig",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "m",
          type: "u8",
        },
      ],
    },
    {
      name: "transfer",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
      ],
    },
    {
      name: "approve",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
      ],
    },
    {
      name: "revoke",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "setAuthority",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "authorityType",
          type: "u8",
        },
        {
          name: "newAuthority",
          type: {
            coption: "publicKey",
          },
        },
      ],
    },
    {
      name: "mintTo",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
      ],
    },
    {
      name: "burn",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
      ],
    },
    {
      name: "closeAccount",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "freezeAccount",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "thawAccount",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "transferChecked",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
    },
    {
      name: "approveChecked",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
    },
    {
      name: "mintToChecked",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
    },
    {
      name: "burnChecked",
      accounts: [
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u128",
        },
        {
          name: "decimals",
          type: "u8",
        },
      ],
    },
    {
      name: "initializeAccount2",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "authority",
          type: "publicKey",
        },
      ],
    },
    {
      name: "syncNative",
      accounts: [
        {
          name: "account",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateSymbol",
      accounts: [
        {
          name: "mintMeta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        }
      ],
      args: [
        {
          name: "symbol",
          type: "string",
        }
      ],
    },
    {
      name: "updateName",
      accounts: [
        {
          name: "mintMeta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        }
      ],
      args: [
        {
          name: "name",
          type: "string",
        }
      ],
    },
    {
      name: "updateIcon",
      accounts: [
        {
          name: "mintMeta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        }
      ],
      args: [
        {
          name: "icon",
          type: "string",
        }
      ],
    },
    {
      name: "createMintMetaAccount",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintMeta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        }
      ],
      args: [],
    },
    {
      name: "initMintMetaAccount",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mintMeta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        }
      ],
      args: [
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "icon",
          type: "string",
        }
      ],
    }
  ],
  accounts: [
    {
      name: "mint",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mintAuthority",
            type: {
              coption: "publicKey",
            },
          },
          {
            name: "supply",
            type: "u128",
          },
          {
            name: "decimals",
            type: "u8",
          },
          {
            name: "isInitialized",
            type: "bool",
          },
          {
            name: "freezeAuthority",
            type: {
              coption: "publicKey",
            },
          }
        ],
      },
    },
    {
      name: "token",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u128",
          },
          {
            name: "delegate",
            type: {
              coption: "publicKey",
            },
          },
          {
            name: "state",
            type: "u8",
          },
          {
            name: "isNative",
            type: {
              coption: "u128",
            },
          },
          {
            name: "delegatedAmount",
            type: "u128",
          },
          {
            name: "closeAuthority",
            type: {
              coption: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "mintMeta",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isInitialized",
            type: "bool",
          },
          {
            name: "authority",
            type: {
              coption: "publicKey",
            },
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "icon",
            type: "string",
          }
        ],
      },
    },
  ],
};
