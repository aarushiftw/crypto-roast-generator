import { QuestionData, TraitsConfig, Classification, RoastFlow, FuckMarryKillQuestion } from "@/lib/types/questionnaire";

export const traitsConfig: TraitsConfig = {
  traits: [
    {
      id: "experience",
      name: "Experience Level",
      description: "User's time and survival in crypto markets"
    },
    {
      id: "portfolio",
      name: "Portfolio Diversity",
      description: "Types and variety of crypto assets held"
    },
    {
      id: "activity",
      name: "Activity Level",
      description: "Frequency of transactions and multi-chain usage"
    },
    {
      id: "risk",
      name: "Risk Tolerance",
      description: "Willingness to take risks and history of losses"
    },
    {
      id: "technical",
      name: "Technical Sophistication",
      description: "Technical understanding and operational competency"
    },
    {
      id: "defi",
      name: "DeFi Engagement",
      description: "Level of participation in decentralized finance"
    }
  ],
  badges: [
    {
      id: "paper_hands",
      name: "Paper Hands",
      condition: "Sells quickly during market instability",
      threshold: 3,
      associatedQuestions: ["q7", "q13"]
    },
    {
      id: "diamond_hands",
      name: "Diamond Hands",
      condition: "Holds through extreme volatility",
      threshold: 4,
      associatedQuestions: ["q7", "q13"]
    },
    {
      id: "rug_magnet",
      name: "Rug Pull Magnet",
      condition: "Repeatedly gets caught in scams",
      threshold: 3,
      associatedQuestions: ["q8", "q14"]
    },
    {
      id: "gas_victim",
      name: "Gas Fee Victim",
      condition: "Spends excessive amounts on transaction fees",
      threshold: 4,
      associatedQuestions: ["q9"]
    },
    {
      id: "wallet_hoarder",
      name: "Wallet Hoarder",
      condition: "Maintains an excessive number of wallets",
      threshold: 4,
      associatedQuestions: ["q11"]
    }
  ]
};

export const questions: QuestionData[] = [
  {
    id: "q1",
    type: "multiple_choice",
    variations: [
      "How long have you been active in crypto?",
      "When did you first sell your soul to crypto?",
      "How long have you been watching your money evaporate in this space?"
    ],
    answers: [
      {
        text: "Just started this month",
        responses: [
          "Oh, a fresh victim. Welcome!",
          "So you're the one buying my bags...",
          "Timing the top again, I see."
        ],
        scores: {
          experience: 1,
          risk: 2
        }
      },
      {
        text: "Less than a year",
        responses: [
          "Missed all the good airdrops, I see.",
          "Let me guess, you bought the top?",
          "Just in time to catch the falling knives."
        ],
        scores: {
          experience: 2,
          risk: 2
        }
      },
      {
        text: "1-2 years",
        responses: [
          "Survived one mini-crash. Adorable.",
          "Let me guess, still down 60%?",
          "The \"I'm early\" phase. Cute."
        ],
        scores: {
          experience: 3,
          risk: 3
        }
      },
      {
        text: "3-5 years",
        responses: [
          "So you've seen some shit.",
          "Yet you're still here. Masochist.",
          "Your therapist must love you."
        ],
        scores: {
          experience: 4,
          risk: 3
        }
      },
      {
        text: "Since before 2017",
        responses: [
          "Either rich or lying. No in-between.",
          "And somehow still rekt?",
          "Ancient. And probably still down on most alts."
        ],
        scores: {
          experience: 5,
          risk: 3
        }
      }
    ]
  },
  {
    id: "q2",
    type: "multiple_choice",
    variations: [
      "How many crypto market cycles have you survived?",
      "How many times have you watched your portfolio drop 80%?",
      "How many bear markets have you endured without selling?"
    ],
    answers: [
      {
        text: "What's a market cycle?",
        responses: [
          "Oh honey...",
          "Sweet summer child.",
          "This is going to be painful for you."
        ],
        scores: {
          experience: 0,
          risk: 1
        }
      },
      {
        text: "Currently in my first one",
        responses: [
          "You think this is pain? Just wait.",
          "The first cut is the deepest. Until the next one.",
          "First time? *James Franco noose meme*"
        ],
        scores: {
          experience: 1,
          risk: 2
        }
      },
      {
        text: "Survived one full cycle",
        responses: [
          "One cycle and you came back? Masochist.",
          "Let me guess, you still bought the second top?",
          "Learning nothing from history, classic."
        ],
        scores: {
          experience: 3,
          risk: 3
        }
      },
      {
        text: "Two or more cycles",
        responses: [
          "The addiction is real.",
          "Your relationship status: 'It's complicated with crypto'",
          "You're either rich or lying to yourself about being good at this."
        ],
        scores: {
          experience: 5,
          risk: 4
        }
      },
      {
        text: "So many I've become emotionally numb",
        responses: [
          "Dead inside. Just like your alts.",
          "Can't feel pain if you're already dead inside.",
          "The final stage of crypto: emotional death."
        ],
        scores: {
          experience: 6,
          risk: 5
        }
      }
    ]
  },
  {
    id: "q3",
    type: "multiple_choice",
    variations: [
      "What types of crypto assets do you currently hold?",
      "What's weighing down your portfolio right now?",
      "What kind of bags are you holding?"
    ],
    answers: [
      {
        text: "Just Bitcoin and/or Ethereum",
        responses: [
          "Playing it safe. Boring, but respectable.",
          "No fun allowed in your wallet, huh?",
          "The 'I read one Michael Saylor tweet' portfolio."
        ],
        scores: {
          portfolio: 1,
          risk: 1,
          defi: 1
        }
      },
      {
        text: "Top 10 cryptocurrencies by market cap",
        responses: [
          "Ah, the 'I read CoinMarketCap once' strategy.",
          "Diversified mediocrity. Bold.",
          "Playing it safe while still ensuring some losses. Smart."
        ],
        scores: {
          portfolio: 2,
          risk: 2,
          defi: 2
        }
      },
      {
        text: "A mix of large caps and some altcoins",
        responses: [
          "One foot in sanity, one in the asylum.",
          "The 'I like to pretend I'm responsible' portfolio.",
          "Just enough alts to destroy your tax accountant's will to live."
        ],
        scores: {
          portfolio: 3,
          risk: 3,
          defi: 3
        }
      },
      {
        text: "Mostly altcoins and some NFTs",
        responses: [
          "Your portfolio is a cry for help.",
          "So you hate money. Got it.",
          "How's that working out for your net worth?"
        ],
        scores: {
          portfolio: 4,
          risk: 4,
          defi: 3
        }
      },
      {
        text: "A diverse portfolio including tokens, NFTs, and DeFi positions",
        responses: [
          "Your tax accountant must charge you extra.",
          "Using the 'throw shit at the wall' investment strategy.",
          "Either very sophisticated or completely unhinged. No in-between."
        ],
        scores: {
          portfolio: 5,
          risk: 4,
          defi: 5
        }
      }
    ]
  },
  {
    id: "q4",
    type: "multiple_choice",
    variations: [
      "What's your relationship with NFTs?",
      "How deep are you in the JPEG game?",
      "What's your NFT involvement level?"
    ],
    answers: [
      {
        text: "NFTs are scams, I don't touch them",
        responses: [
          "Missing out on both gains and losses. Smart or cowardly?",
          "Too scared to right-click save?",
          "The only sane answer here, honestly."
        ],
        scores: {
          portfolio: 1,
          risk: 1
        }
      },
      {
        text: "I own a few popular collections",
        responses: [
          "Let me guess, bought at the top?",
          "Ah, the 'I follow influencers' strategy.",
          "Those floor prices holding up well? Didn't think so."
        ],
        scores: {
          portfolio: 2,
          risk: 3
        }
      },
      {
        text: "I'm active in the NFT space with various collections",
        responses: [
          "Your Twitter profile is a cartoon animal, isn't it?",
          "How many Discord servers are you in? No, actually don't tell me.",
          "The 'I believe in the technology' cope is strong with this one."
        ],
        scores: {
          portfolio: 3,
          risk: 4,
          technical: 3
        }
      },
      {
        text: "I've flipped NFTs for profit multiple times",
        responses: [
          "Sure you have. And I'm Satoshi.",
          "Professional bag passer. Respect.",
          "Let me guess, still net negative but you don't count the losses?"
        ],
        scores: {
          portfolio: 4,
          risk: 5,
          technical: 4
        }
      },
      {
        text: "I mint everything and pray",
        responses: [
          "Gambling addiction disguised as 'investing', classic.",
          "Your wallet is a graveyard of worthless JPEGs.",
          "How much gas have you burned on failed mints? Actually, don't answer that."
        ],
        scores: {
          portfolio: 5,
          risk: 5,
          technical: 3
        }
      }
    ]
  },
  {
    id: "q5",
    type: "multiple_choice",
    variations: [
      "How often do you make crypto transactions?",
      "How frequently do you interact with the blockchain?",
      "How often do you burn ETH on gas fees?"
    ],
    answers: [
      {
        text: "Rarely, maybe once a month",
        responses: [
          "The one sane person in crypto.",
          "Actually using crypto as intended. Weird.",
          "Too broke from the last transaction's gas fees?"
        ],
        scores: {
          activity: 1,
          technical: 1
        }
      },
      {
        text: "Weekly",
        responses: [
          "Casual degen. The gateway drug.",
          "Consistent pain. I respect it.",
          "Your wallet gets more action than most people's dating lives."
        ],
        scores: {
          activity: 2,
          technical: 2
        }
      },
      {
        text: "Several times a week",
        responses: [
          "ETH miners send you birthday cards.",
          "Just enough to annoy your significant other.",
          "Do you dream in transaction hashes yet?"
        ],
        scores: {
          activity: 3,
          technical: 3
        }
      },
      {
        text: "Daily",
        responses: [
          "Your wallet needs a restraining order.",
          "Gas trackers are your most visited websites.",
          "Tell me you're single without telling me you're single."
        ],
        scores: {
          activity: 4,
          technical: 4
        }
      },
      {
        text: "Multiple times daily",
        responses: [
          "You've personally funded at least one validator node with gas fees.",
          "Your significant other thinks you're cheating. With blockchain.",
          "Either a whale or someone with severe FOMO. No in-between."
        ],
        scores: {
          activity: 5,
          technical: 4
        }
      }
    ]
  },
  {
    id: "q14",
    type: "multiple_choice",
    variations: [
      "Which of these exploited protocols were you unfortunate enough to use?",
      "Select all protocols you were in BEFORE they got hacked:",
      "Which of these hacks did you experience firsthand like the complete degen you are?"
    ],
    answers: [
      {
        text: "None, I've avoided all hacks (so far)",
        responses: [
          "Either lucky or lying.",
          "The 'never used DeFi' strategy pays off.",
          "Weird flex but okay."
        ],
        scores: {
          risk: 1,
          defi: 1
        }
      },
      {
        text: "Euler Finance flashloan attack",
        responses: [
          "Euler? You really thought you were sophisticated, huh?",
          "Ah, a fellow Euler victim. Let's cry together.",
          "Did you at least get the recovery airdrop or are you that rekt?"
        ],
        scores: {
          risk: 4,
          defi: 4
        }
      },
      {
        text: "Platypus Finance reentrancy",
        responses: [
          "Platypus Finance? Your due diligence is showing.",
          "Named after a weird animal. Should've been a red flag.",
          "Let me guess, for the high APYs? How'd that work out, genius?"
        ],
        scores: {
          risk: 4,
          defi: 3
        }
      },
      {
        text: "KyberSwap Elastic vulnerability",
        responses: [
          "Kyber victim? Classic case of 'but the TVL was so high!'",
          "Kyber? You must love pain on multiple chains.",
          "The Elastic in KyberSwap Elastic refers to how fast your funds disappeared."
        ],
        scores: {
          risk: 3,
          defi: 4
        }
      },
      {
        text: "Multiple protocol hacks",
        responses: [
          "You're not unlucky, you're careless.",
          "Tell me you don't read audit reports without telling me.",
          "Achievement unlocked: Serial Victim. What's your strategy, blindly aping into everything?"
        ],
        scores: {
          risk: 5,
          defi: 5
        }
      }
    ]
  }
];

export const fmkQuestions: FuckMarryKillQuestion[] = [
  {
    id: "fmk1",
    type: "fuck_marry_kill",
    variations: [
      "Fuck, Marry or Kill - DeFi Edition:",
      "Fuck, Marry or Kill:",
      "Fuck, Marry or Kill:"
    ],
    protocols: ["Aave V3", "Maker DAO", "Uniswap V3"],
    responsePatterns: {
      fuck: {
        "Aave V3": [
          "One night with Aave? Hope you like getting liquidated.",
          "Quick and dirty with Aave. Just like your collateral ratio."
        ],
        "Maker DAO": [
          "One night with MakerDAO? Enjoy those stability fees.",
          "Maker for a night? That governance vote will haunt you."
        ],
        "Uniswap V3": [
          "A quickie with Uniswap V3? Enjoy the impermanent loss.",
          "Uniswap V3 is too complicated for a one-night stand. You'll get confused and hurt."
        ]
      },
      marry: {
        "Aave V3": [
          "Married to Aave? Enjoy lifelong anxiety about collateral ratios.",
          "Aave for life? Your kids will be named Collateral and Liquidation."
        ],
        "Maker DAO": [
          "Married to MakerDAO? Hope you like boring governance calls.",
          "MakerDAO marriage? Your pillow talk will be about stability fees."
        ],
        "Uniswap V3": [
          "Till impermanent loss do you part.",
          "Hope you enjoy explaining concentrated liquidity positions to your in-laws."
        ]
      },
      kill: {
        "Aave V3": [
          "Killing Aave? Found the Compound maximalist.",
          "There goes your lending strategies. Back to CeFi, I guess."
        ],
        "Maker DAO": [
          "Killing MakerDAO? What did DAI ever do to you?",
          "Pour one out for the OG DeFi protocol. You monster."
        ],
        "Uniswap V3": [
          "Killing Uniswap? Found the Sushiswap degen.",
          "No more impermanent loss for you. Smart choice."
        ]
      }
    },
    traitImplications: {
      fuck: {
        "Aave V3": { risk: 3, defi: 4 },
        "Maker DAO": { risk: 2, defi: 4 },
        "Uniswap V3": { risk: 4, defi: 3 }
      },
      marry: {
        "Aave V3": { risk: 2, defi: 5 },
        "Maker DAO": { risk: 1, defi: 5 },
        "Uniswap V3": { risk: 3, defi: 4 }
      },
      kill: {
        "Aave V3": { risk: 4, defi: 2 },
        "Maker DAO": { risk: 5, defi: 2 },
        "Uniswap V3": { risk: 2, defi: 3 }
      }
    }
  },
  {
    id: "fmk2",
    type: "fuck_marry_kill",
    variations: [
      "Fuck, Marry or Kill - Liquid Staking Edition:",
      "Fuck, Marry or Kill:",
      "Fuck, Marry or Kill:"
    ],
    protocols: ["LIDO", "Rocket Pool", "EigenLayer"],
    responsePatterns: {
      fuck: {
        "LIDO": [
          "A quickie with LIDO? Enjoy that centralization.",
          "One night with LIDO? Bet you like it dominant and controlling."
        ],
        "Rocket Pool": [
          "One night with Rocket Pool? Decentralized in the streets, wild in the sheets.",
          "Rocket Pool for a night? At least it's honest about its intentions."
        ],
        "EigenLayer": [
          "A fling with EigenLayer? Restaking your heart, I see.",
          "EigenLayer for a night? Complicated, risky, and probably worth it."
        ]
      },
      marry: {
        "LIDO": [
          "Married to LIDO? Hope you like Ethereum maxis controlling your relationship.",
          "LIDO for life? Safe, boring, and slightly concerning. Like most marriages."
        ],
        "Rocket Pool": [
          "Rocket Pool marriage? Decentralized relationship goals.",
          "Married to Rocket Pool? Your trust issues are showing."
        ],
        "EigenLayer": [
          "EigenLayer marriage? Complicated but potentially rewarding. Like actual marriage.",
          "Marrying EigenLayer? You definitely overthink relationships."
        ]
      },
      kill: {
        "LIDO": [
          "Killing LIDO? Ethereum just got more decentralized.",
          "LIDO assassination? Found the decentralization maxi."
        ],
        "Rocket Pool": [
          "Killing Rocket Pool? What did decentralization ever do to you?",
          "Murdering Rocket Pool? You probably work for a centralized exchange."
        ],
        "EigenLayer": [
          "Killing EigenLayer? Too complicated for you to understand, huh?",
          "EigenLayer murder? Found the person who hates innovation."
        ]
      }
    },
    traitImplications: {
      fuck: {
        "LIDO": { risk: 1, defi: 3 },
        "Rocket Pool": { risk: 2, defi: 4 },
        "EigenLayer": { risk: 4, defi: 4 }
      },
      marry: {
        "LIDO": { risk: 1, defi: 4 },
        "Rocket Pool": { risk: 2, defi: 5 },
        "EigenLayer": { risk: 4, defi: 5 }
      },
      kill: {
        "LIDO": { risk: 4, defi: 2 },
        "Rocket Pool": { risk: 5, defi: 1 },
        "EigenLayer": { risk: 3, defi: 3 }
      }
    }
  }
];

export const classifications: Classification[] = [
  {
    id: "crypto_newbie",
    name: "Crypto Newbie",
    thresholds: {
      experience: {min: 0, max: 5},
      portfolio: {min: 0, max: 5},
      activity: {min: 0, max: 4},
      risk: {min: 0, max: 6},
      technical: {min: 0, max: 5},
      defi: {min: 0, max: 4}
    },
    roastTemplates: [
      "Your crypto profile is {adjective1}-{adjective2}-{noun} embarrassing.",
      "Your wallet screams {adjective1} {noun} energy.",
      "Your crypto journey is a masterclass in {adjective1} {noun}."
    ],
    specificRoasts: [
      "You think gas fees are optional",
      "You've spent more on failed transactions than actual investments",
      "If your wallet was a person, it would still be asking what a blockchain is",
      "Your idea of DYOR is watching BitBoy videos",
      "You store your seed phrase in your Notes app",
      "You buy tokens because their logos look 'professional'"
    ],
    adjectives: ["bought-bitcoin-at-69k", "panic-sold", "fomo-driven", "influencer-following", "tech-bro-wannabe"],
    nouns: ["regret", "confusion", "FOMO", "ignorance", "bandwagon-jumping"]
  },
  {
    id: "casual_hodler",
    name: "Casual Hodler",
    thresholds: {
      experience: {min: 6, max: 10},
      portfolio: {min: 3, max: 8},
      activity: {min: 1, max: 6},
      risk: {min: 2, max: 8},
      technical: {min: 2, max: 7},
      defi: {min: 1, max: 6}
    },
    roastTemplates: [
      "Your crypto profile is {adjective1}-while-{adjective2} pathetic.",
      "Your portfolio has strong {adjective1} {noun} energy.",
      "Your crypto strategy is essentially {adjective1} with extra {noun}."
    ],
    specificRoasts: [
      "You check the price 50 times a day but only trade once a month",
      "You've convinced yourself HODLing is a strategy and not laziness",
      "You tell everyone you're 'in it for the tech' but can't explain how consensus works",
      "Your idea of diversity is owning both Bitcoin AND Ethereum",
      "You've never used a DApp but have strong opinions about gas fees"
    ],
    adjectives: ["never-selling", "always-waiting", "dip-fearing", "average-cost", "reddit-educated"],
    nouns: ["hesitation", "mediocrity", "indecision", "procrastination", "overconfidence"]
  },
  {
    id: "defi_degen",
    name: "DeFi Degen",
    thresholds: {
      experience: {min: 8, max: 20},
      portfolio: {min: 10, max: 20},
      activity: {min: 8, max: 20},
      risk: {min: 15, max: 25},
      technical: {min: 10, max: 20},
      defi: {min: 15, max: 25}
    },
    roastTemplates: [
      "Your crypto profile is {adjective1}-{adjective2}-{noun} tragic.",
      "Your wallet history reads like a {adjective1} {noun} support group confession.",
      "Your strategy is basically {adjective1} with a side of {noun}."
    ],
    specificRoasts: [
      "You check token prices during funerals",
      "Your wallet address should come with a financial Darwin Award",
      "If your portfolio was audited, the firm would refund your fee out of pity",
      "You've spent more on failed transactions than most people's entire portfolios",
      "Your 'system' for picking tokens consistently underperforms ETH",
      "You set up alerts for airdrops you'll immediately dump but somehow still miss"
    ],
    adjectives: ["down-bad", "liquidation-prone", "yield-farming", "leverage-addicted", "airdrop-hunting"],
    nouns: ["degeneracy", "liquidation", "impermanent-loss", "over-collateralization", "rug-pulls"]
  },
  {
    id: "chain_veteran",
    name: "Chain Veteran",
    thresholds: {
      experience: {min: 15, max: 25},
      portfolio: {min: 10, max: 20},
      activity: {min: 5, max: 15},
      risk: {min: 5, max: 15},
      technical: {min: 15, max: 25},
      defi: {min: 10, max: 20}
    },
    roastTemplates: [
      "Your crypto profile is {adjective1}-but-still-{adjective2} concerning.",
      "Your wallet tells the story of {adjective1} {noun} and poor timing.",
      "Your crypto history is essentially a museum of {adjective1} {noun}."
    ],
    specificRoasts: [
      "You've survived so many crashes you're emotionally dead inside",
      "You reminisce about gas fees being 'only 5 gwei'",
      "Your portfolio is a graveyard of once-promising projects",
      "You've written more passionate posts about blockchain scaling than your love life",
      "You still have wallets with dust from 2017 ICOs you can't bear to clean up"
    ],
    adjectives: ["battle-scarred", "bear-market-hardened", "pre-hype", "ETH-prescient", "cycle-weary"],
    nouns: ["disillusionment", "skepticism", "resilience", "stubbornness", "trauma"]
  },
  {
    id: "crypto_whale",
    name: "Crypto Whale",
    thresholds: {
      experience: {min: 18, max: 25},
      portfolio: {min: 15, max: 25},
      activity: {min: 15, max: 25},
      risk: {min: 5, max: 15},
      technical: {min: 18, max: 25},
      defi: {min: 18, max: 25}
    },
    roastTemplates: [
      "Your crypto profile is {adjective1}-yet-somehow-{adjective2} disappointing.",
      "Your wallet movements cause more market volatility than {adjective1} {noun}.",
      "Your approach to crypto is like {adjective1} {noun} but with more collateral damage."
    ],
    specificRoasts: [
      "You think 'gas optimization' means not moving less than 6 figures at a time",
      "Your tax accountant has threatened to quit multiple times",
      "You've personally caused at least one long-tail liquidation cascade",
      "You maintain multiple identities just to hide your on-chain footprint",
      "You've accidentally influenced token prices just by testing a new wallet"
    ],
    adjectives: ["market-moving", "liquidity-providing", "validator-running", "governance-controlling", "early-investing"],
    nouns: ["manipulation", "dominance", "influence", "paranoia", "arrogance"]
  }
];

export const roastFlow: RoastFlow = {
  openings: [
      "Analyzing your deplorable onchain choices...",
      "Inspecting your tragic roast history...",
      "Examining your questionable onchain decisions...",
      "Looking at your onchain activity (god help me)...",
      "RIP the wasteland you call a wallet...",
      "Calculating your poor life choices in real time..."
    ],
  reactions: [
      "Oh, this is bad.",
      "Wait, what?",
      "Oh god no.",
      "I wasn't prepared for this level of degeneracy.",
      "This is worse than I expected.",
      "I need a drink after seeing this.",
      "Your portfolio should come with a trigger warning.",
      "Do your loved ones know about these decisions?",
      "This is financial self-harm.",
      "You call this investing?",
      "Your roast verdict reads like a cry for help."
    ],
  midRoastReactions: [
      "It gets worse, doesn't it?",
      "I can't believe I'm seeing this.",
      "Your transaction history should be studied by psychiatrists.",
      "I'm simultaneously impressed and horrified.",
      "This is why onchain transparency is a curse.",
      "Each transaction is more concerning than the last.",
      "This would be funny if it wasn't so sad.",
      "I've seen liquidated leverage traders with healthier portfolios.",
      "This is beyond degen, this is financial masochism."
    ],
  closings:  [
      "I'd wish you luck, but you'd probably convert it to some garbage token with \"safe\" in the name.",
      "Come back after you've survived at least one 80% drawdown without crying.",
      "Your seed phrase should be classified as a biohazard.",
      "Your wallet may just be a case study in what not to do.",
      "May your future losses be less catastrophic than your past ones.",
      "I'd recommend therapy, but you'd probably spend that money on another NFT.",
      "There's still time to delete your wallet and pretend this never happened.",
      "Don't worry, someday your grandchildren will study your transactions as a cautionary tale.",
      "The good news is rock bottom has a solid foundation. The bad news is you're still digging."
    ],
  traitDescriptors: {
    'risk-taking': [
      "considers a 2x leverage 'conservative'",
      "thinks diversification means owning multiple dog coins",
      "defines risk management as 'having multiple wallets to spread the pain'",
      "believes stop-losses are for cowards",
      "calls liquidation 'an adrenaline rush'",
      "considers 'all-in' a reasonable position size"
    ],
    'portfolio-management': [
      "couldn't beat a dartboard in returns",
      "calls 'buying high, selling low' a strategy",
      "thinks portfolio rebalancing means adding more to whatever's down 90%",
      "diversifies by having multiple wallets of the same shitcoin",
      "measures performance in 'how many zeros I've lost'",
      "considers unrealized losses 'just temporary'"
    ],
    'technical-skills': [
      "sent tokens to the wrong address more times than they've had hot meals",
      "considers copying and pasting addresses a technical achievement",
      "thinks smart contract auditing means 'it looked legit'",
      "believes hardware wallets are 'too complicated'",
      "calls themselves Web3 native but can't explain MEV",
      "thinks 'gas optimization' means waiting until 3AM to transact"
    ]
  }
};
