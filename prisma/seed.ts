import { db as prisma } from '../src/lib/db'

const firms = [
  {
    name: "Apex Trader Funding",
    slug: "apex-trader-funding",
    description: "One of the most popular futures prop trading firms, known for fast payouts and frequent deep discount sales. Offers a simple one-step evaluation process.",
    websiteUrl: "https://apextraderfunding.com",
    affiliateUrl: "https://apextraderfunding.com/member/aff/go/proppilot",
    minAccountSize: 25000,
    maxAccountSize: 300000,
    challengeFee: 147.00,
    profitTarget: 6.0,
    dailyLossLimit: null, // Trailing drawdown
    maxDrawdown: 4.0,
    isActive: true,
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Topstep",
    slug: "topstep",
    description: "A pioneer in the futures prop firm space. Known for a structured, educational approach to funded trading with a two-step Combine process.",
    websiteUrl: "https://topstep.com",
    affiliateUrl: "https://topstep.com/?utm_source=proppilot",
    minAccountSize: 50000,
    maxAccountSize: 150000,
    challengeFee: 165.00,
    profitTarget: 6.0,
    dailyLossLimit: 2.0,
    maxDrawdown: 4.0,
    isActive: true,
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "FTMO",
    slug: "ftmo",
    description: "The gold standard of forex and CFD prop trading. Offers a highly professional dashboard and a rigorous two-step evaluation process.",
    websiteUrl: "https://ftmo.com",
    affiliateUrl: "https://ftmo.com/?affiliates=proppilot",
    minAccountSize: 10000,
    maxAccountSize: 200000,
    challengeFee: 155.00,
    profitTarget: 10.0,
    dailyLossLimit: 5.0,
    maxDrawdown: 10.0,
    isActive: true,
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "MyFundedFX",
    slug: "myfundedfx",
    description: "A highly regarded CFD and Forex prop firm with flexible evaluation options, including 1-step and 2-step challenges with raw spreads.",
    websiteUrl: "https://myfundedfx.com",
    affiliateUrl: "https://myfundedfx.com/?ref=proppilot",
    minAccountSize: 5000,
    maxAccountSize: 300000,
    challengeFee: 50.00,
    profitTarget: 8.0,
    dailyLossLimit: 5.0,
    maxDrawdown: 8.0,
    isActive: true,
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "TradeDay",
    slug: "tradeday",
    description: "A futures prop firm focused on education and trader development. Offers end-of-day drawdowns on their evaluation accounts.",
    websiteUrl: "https://tradeday.com",
    affiliateUrl: "https://tradeday.com/?ref=proppilot",
    minAccountSize: 10000,
    maxAccountSize: 250000,
    challengeFee: 99.00,
    profitTarget: 5.0,
    dailyLossLimit: null,
    maxDrawdown: 3.0,
    isActive: true,
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Bulenox",
    slug: "bulenox",
    description: "A competitive futures prop firm with Option 1 (Trailing Drawdown) and Option 2 (End of Day Drawdown) evaluation paths.",
    websiteUrl: "https://bulenox.com",
    affiliateUrl: "https://bulenox.com/?ref=proppilot",
    minAccountSize: 10000,
    maxAccountSize: 250000,
    challengeFee: 115.00,
    profitTarget: 6.0,
    dailyLossLimit: null,
    maxDrawdown: 4.0,
    isActive: true,
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "FundedNext",
    slug: "fundednext",
    description: "A popular Forex firm offering a unique model that pays a 15% profit split even during the evaluation phases.",
    websiteUrl: "https://fundednext.com",
    affiliateUrl: "https://fundednext.com/?ref=proppilot",
    minAccountSize: 6000,
    maxAccountSize: 200000,
    challengeFee: 59.00,
    profitTarget: 8.0,
    dailyLossLimit: 5.0,
    maxDrawdown: 10.0,
    isActive: true,
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "The 5ers",
    slug: "the5ers",
    description: "An established firm offering immediate funding options alongside standard evaluation bootcamps, specializing in Forex.",
    websiteUrl: "https://the5ers.com",
    affiliateUrl: "https://the5ers.com/?ref=proppilot",
    minAccountSize: 5000,
    maxAccountSize: 100000,
    challengeFee: 85.00,
    profitTarget: 6.0,
    dailyLossLimit: 3.0,
    maxDrawdown: 6.0,
    isActive: true,
    isFeatured: false,
    isVerified: true,
  }
]

async function main() {
  console.log('Seeding database with proprietary trading firms...')

  for (const firm of firms) {
    const upsertedFirm = await prisma.firm.upsert({
      where: { slug: firm.slug },
      update: firm,
      create: firm,
    })
    console.log(`Upserted firm: ${upsertedFirm.name}`)
    
    // Seed some offers for the first few firms
    if (firm.slug === 'apex-trader-funding') {
      await prisma.firmOffer.upsert({
        where: { id: 'seed-apex-offer-1' },
        update: { code: 'SAVE90', discountPercent: 90, description: '90% Off All Accounts', isActive: true, firmId: upsertedFirm.id },
        create: { id: 'seed-apex-offer-1', code: 'SAVE90', discountPercent: 90, description: '90% Off All Accounts', isActive: true, firmId: upsertedFirm.id },
      })
    } else if (firm.slug === 'topstep') {
      await prisma.firmOffer.upsert({
        where: { id: 'seed-topstep-offer-1' },
        update: { code: 'TOPSTEP20', discountPercent: 20, description: '20% Off 50K Combine', isActive: true, firmId: upsertedFirm.id },
        create: { id: 'seed-topstep-offer-1', code: 'TOPSTEP20', discountPercent: 20, description: '20% Off 50K Combine', isActive: true, firmId: upsertedFirm.id },
      })
    }
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
