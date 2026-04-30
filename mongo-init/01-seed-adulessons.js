// First-run Mongo init script. Runs only when /data/db is empty.
const appDb = db.getSiblingDB('adulessons');

const modules = [
  {
    "moduleId": "mod1",
    "title": "Finance 101",
    "description": "Learn the basics of budgeting, saving, and building financial habits.",
    "order": 1,
    "introPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Welcome to Module 1"
        },
        {
          "type": "text",
          "body": "In this module, you will learn how to take control of your finances. We'll cover budgeting, saving strategies, understanding credit, and the basics of banking, all skills that will help you build a stable financial future."
        },
        {
          "type": "image",
          "src": "/assets/images/finance-icon.png",
          "alt": "Finance icon"
        }
      ]
    },
    "summaryPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Module 1 Complete!"
        },
        {
          "type": "callout",
          "body": "You've learned the foundations of personal finance. Keep it up!"
        }
      ]
    },
    "lessonIds": [
      "mod1-lesson1",
      "mod1-lesson2",
      "mod1-lesson3",
      "mod1-lesson4"
    ]
  },
  {
    "moduleId": "mod2",
    "title": "Social Skills",
    "description": "Learn how to interact with others, build relationships, and communicate effectively.",
    "order": 2,
    "introPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Welcome to Module 2"
        },
        {
          "type": "text",
          "body": "In this module, you will develop essential social skills. We'll cover effective communication, building meaningful relationships, managing conflict, and navigating social situations—all skills that will help you thrive in your personal and professional life."
        },
        {
          "type": "image",
          "src": "/assets/images/social-icon.png",
          "alt": "Social skills icon"
        }
      ]
    },
    "summaryPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Module 2 Complete!"
        },
        {
          "type": "callout",
          "body": "You've learned the foundations of social skills. Keep practicing!"
        }
      ]
    },
    "lessonIds": [
      "mod2-lesson1",
      "mod2-lesson2",
      "mod2-lesson3"
    ]
  },
  {
    "moduleId": "mod3",
    "title": "Productivity",
    "description": "Learn how to manage your time, set goals, and stay organized to boost your productivity.",
    "order": 3,
    "introPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Welcome to Module 3"
        },
        {
          "type": "text",
          "body": "In this module, you will master the art of productivity. We'll cover time management, setting meaningful goals, staying organized, and overcoming procrastination—all strategies that will help you accomplish more and reduce stress."
        },
        {
          "type": "image",
          "src": "/assets/images/productivity-icon.png",
          "alt": "Productivity icon"
        }
      ]
    },
    "summaryPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Module 3 Complete!"
        },
        {
          "type": "callout",
          "body": "You're now equipped with productivity techniques to reach your goals!"
        }
      ]
    },
    "lessonIds": [
      "mod3-lesson1",
      "mod3-lesson2",
      "mod3-lesson3",
      "mod3-lesson4"
    ]
  },
  {
    "moduleId": "mod4",
    "title": "Cooking 101",
    "description": "Learn the fundamentals of cooking, including techniques, recipes, and kitchen safety.",
    "order": 4,
    "introPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Welcome to Module 4"
        },
        {
          "type": "text",
          "body": "In this module, you will learn the fundamentals of cooking. We'll cover kitchen basics, essential techniques, reading recipes, and creating nutritious meals—all skills that will help you cook with confidence and save money."
        },
        {
          "type": "image",
          "src": "/assets/images/cooking-icon.png",
          "alt": "Cooking icon"
        }
      ]
    },
    "summaryPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Module 4 Complete!"
        },
        {
          "type": "callout",
          "body": "You've learned the basics of cooking. Keep practicing and enjoying delicious meals!"
        }
      ]
    },
    "lessonIds": [
      "mod4-lesson1",
      "mod4-lesson2"
    ]
  },
  {
    "moduleId": "mod5",
    "title": "Household Basics",
    "description": "Learn the fundamentals of managing your home, including cleaning, organization, and maintenance.",
    "order": 5,
    "introPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Welcome to Module 5"
        },
        {
          "type": "text",
          "body": "In this module, you will master household management. We'll cover cleaning and maintenance, organization and decluttering, laundry care, and home repair basics—all skills that will help you maintain a clean, comfortable living space."
        },
        {
          "type": "image",
          "src": "/assets/images/household-icon.png",
          "alt": "Household icon"
        }
      ]
    },
    "summaryPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Module 5 Complete!"
        },
        {
          "type": "callout",
          "body": "You're now equipped to manage your household with confidence!"
        }
      ]
    },
    "lessonIds": [
      "mod5-lesson1",
      "mod5-lesson2",
      "mod5-lesson3",
      "mod5-lesson4"
    ]
  },
  {
    "moduleId": "mod6",
    "title": "Transportation",
    "description": "Learn about different transportation options, safety, and how to make informed decisions about getting around.",
    "order": 6,
    "introPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Welcome to Module 6"
        },
        {
          "type": "text",
          "body": "In this module, you will learn about transportation options and management. We'll cover different transportation methods, vehicle safety, maintenance, and how to make informed decisions about your transportation needs—all skills that will help you get where you need to go safely and affordably."
        },
        {
          "type": "image",
          "src": "/assets/images/transportation-icon.png",
          "alt": "Transportation icon"
        }
      ]
    },
    "summaryPage": {
      "blocks": [
        {
          "type": "heading",
          "body": "Module 6 Complete!"
        },
        {
          "type": "callout",
          "body": "You've learned the essentials of transportation. Safe travels!"
        }
      ]
    },
    "lessonIds": [
      "mod6-lesson1",
      "mod6-lesson2",
      "mod6-lesson3"
    ]
  }
];

const lessons = [
  {
    "lessonId": "mod1-lesson1",
    "moduleId": "mod1",
    "title": "Taxes",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/finance-taxes.png",
            "alt": "Tax lesson banner"
          },
          {
            "type": "text",
            "body": "Taxes ... the one thing nobody really teaches you, but everybody has to deal with. Between the weird form names, the April deadlines, and the fear of \"doing it wrong,\" it's easy to feel totally lost. But here's the truth: taxes are way more manageable than they seem, and once you know the basics, you'll be filing like a pro (or at least like a functional adult)."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "LYsqkGRpv_k"
          },
          {
            "type": "text",
            "body": "Let's dip our toes into the world of tax with this fun explainer video. This video covers:"
          },
          {
            "type": "list",
            "items": [
              "The Who, What, When, Where, Why, & How of Taxes",
              "Simple concept explanations",
              "Important vocab (audits, brackets, deductions, & more!)"
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Taxes (The Very Basics)"
          },
          {
            "type": "text",
            "body": "Welcome to the magical land of taxes, where you get mail you didn't ask for and forms with names like \"1099-misc.\" But don't panic! When you get down to it, taxes aren't as scary as they sound."
          },
          {
            "type": "heading",
            "body": "So what are taxes?"
          },
          {
            "type": "text",
            "body": "Taxes are basically the way we all chip in to keep things running: roads, schools, libraries, emergency services, all that good stuff. When you earn money, buy stuff, or own certain things, a small piece of that goes toward public services."
          },
          {
            "type": "heading",
            "body": "When do you file?"
          },
          {
            "type": "text",
            "body": "Most people file taxes once a year, usually between January and April. The big day to remember is Tax Day, typically around April 15 (unless the government changes it for some reason ... don't worry, a quick internet search can let you know)."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Who Should File?"
          },
          {
            "type": "text",
            "body": "Short answer: Almost everyone. Even if you made only a little money last year, it's usually worth filing because:"
          },
          {
            "type": "list",
            "items": [
              "You might get some of your money back (we love tax refunds)",
              "It helps you stay in good standing with the IRS",
              "It's great practice for being a Responsible Adult(TM)"
            ],
            "ordered": false
          },
          {
            "type": "heading",
            "body": "What Should You Expect?"
          },
          {
            "type": "text",
            "body": "When tax season comes around, you'll get documents from places that paid you (like your job, school, or bank)."
          },
          {
            "type": "text",
            "body": "These forms tell the IRS how much money you earned so they can compare it to what you report."
          },
          {
            "type": "text",
            "body": "Your job is just to plug those numbers into your tax filing service and let the software do the heavy lifting."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Tax Filing Services"
          },
          {
            "type": "text",
            "body": "Good news: you don't really have to do any math. Tax software exists and helps make tax filing a breeze :)"
          },
          {
            "type": "text",
            "body": "Popular Online Filing Services"
          },
          {
            "type": "list",
            "items": [
              "These can walk you through everything step-by-step:",
              "TurboTax - very user-friendly, but not always free",
              "H&R Block Online - solid option with clear explanations",
              "Cash App Taxes - often free for federal and state returns"
            ],
            "ordered": false
          },
          {
            "type": "text",
            "body": "Free Filing Options"
          },
          {
            "type": "text",
            "body": "If your budget just covers rent and ramen, take a look at these free options:"
          },
          {
            "type": "list",
            "items": [
              "IRS Free File",
              "Available to many taxpayers (usually based on income limits)",
              "Check it out: https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
              "FreeTaxUSA",
              "Free for federal returns",
              "State filing usually has a small fee",
              "Easy to navigate and beginner-friendly",
              "Check it out: https://www.freetaxusa.com/"
            ],
            "ordered": false
          },
          {
            "type": "callout",
            "body": "Taxes feel intimidating at first, but once you've filed once, everything starts clicking. Think of it like laundry: confusing when you're new, but eventually you can do it while half-asleep."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Let's say you only made a small amount of money this year. Should you still file your taxes?",
      "options": [
        "Yes, because you're legally required to file taxes.",
        "No, because nothing will happen if you do.",
        "Yes, because you might qualify for a refund.",
        "No, because it’s too much hassle."
      ],
      "correctIndex": 2,
      "explanation": "A budget helps you plan and control how your money is spent — it's a tool, not a punishment."
    },
    "keyTakeaways": [
      "Taxes are how we all contribute to public services, and filing them is something almost everyone needs to do, even if you didn't earn much.",
      "You don't have to do this alone or from scratch. Tax software like TurboTax, H&R Block, and free options like IRS Free File exist specifically to walk you through it.",
      "Filing your taxes (even when you're not sure you have to) can actually put money back in your pocket through refunds, so it's almost always worth it."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod1-lesson2",
    "moduleId": "mod1",
    "title": "Rent",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/finance-rent.png",
            "alt": "Rent lesson banner"
          },
          {
            "type": "text",
            "body": "Moving out and renting your first place is a major milestone, and honestly, one of the most \"wait, I'm really an adult\" moments out there. But between hunting for the right place, decoding a lease, and figuring out who pays for what, it can get overwhelming fast. The good news? A little know-how goes a long way in making the whole process way less stressful."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "4KheDqLROdA"
          },
          {
            "type": "list",
            "items": [
              "Do your research before committing! Red flags like cash-only payments, no written lease, or a landlord who won't show the unit are signs to walk away fast.",
              "Your lease is a legal contract, so read every single word before signing. Understanding your rights and responsibilities upfront saves you a ton of headaches later.",
              "Good communication and documentation are your best friends as a renter. Snap photos when you move in and out, report issues early, and keep records of everything."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Rent Rundown"
          },
          {
            "type": "text",
            "body": "Ah yes, moving out and renting a place. This is the part of adulthood where you think \"Wow, I'm really an adult.\" Let's make the renting process as painless as possible."
          },
          {
            "type": "heading",
            "body": "Researching Places to Live"
          },
          {
            "type": "text",
            "body": "Before anything, let's just make sure you're not wasting money on a red flag rental."
          },
          {
            "type": "heading",
            "body": "Reading Reviews"
          },
          {
            "type": "text",
            "body": "Check out Google reviews, Reddit, and local Facebook groups."
          },
          {
            "type": "text",
            "body": "If multiple people complain about pests, leaks, or management ignoring them… assume they're telling the truth."
          },
          {
            "type": "heading",
            "body": "Red Flags"
          },
          {
            "type": "text",
            "body": "You might need to run if:"
          },
          {
            "type": "list",
            "items": [
              "The landlord won't show the unit",
              "They ask for cash only",
              "There's no written lease",
              "The place smells musty or looks damaged",
              "They pressure you to sign quickly"
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "The Rental Process"
          },
          {
            "type": "text",
            "body": "Breaking this down can help you avoid a breakdown."
          },
          {
            "type": "heading",
            "body": "Applying"
          },
          {
            "type": "text",
            "body": "Most places require:"
          },
          {
            "type": "list",
            "items": [
              "Your ID",
              "Proof of income",
              "A credit check",
              "An application fee",
              "A co-signer (if you've got low credit)"
            ],
            "ordered": false
          },
          {
            "type": "heading",
            "body": "Understanding the Lease"
          },
          {
            "type": "text",
            "body": "The lease is the contract for how you live there. It covers:"
          },
          {
            "type": "list",
            "items": [
              "Rent amount & due date",
              "Lease length",
              "Rules (pets, guests, parking, etc.)",
              "Utilities",
              "Fees"
            ],
            "ordered": false
          },
          {
            "type": "text",
            "body": "Read. It. All. And don't be afraid to ask questions before signing. It's way better than fixing problems later."
          },
          {
            "type": "heading",
            "body": "Utilities"
          },
          {
            "type": "text",
            "body": "Some rentals include water or trash, but many don't."
          },
          {
            "type": "text",
            "body": "You might have to set up electricity, gas, and internet yourself."
          },
          {
            "type": "text",
            "body": "Ask which utilities you pay so you can budget accurately."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Renting Etiquette"
          },
          {
            "type": "heading",
            "body": "Renewing or Breaking a Lease"
          },
          {
            "type": "text",
            "body": "Renewing usually means signing a new lease (and possibly paying a little more). Breaking a lease early can cost money, so talk to your landlord as soon as you know you might need to move."
          },
          {
            "type": "heading",
            "body": "Other things to consider:"
          },
          {
            "type": "list",
            "items": [
              "Keep Things (Reasonably) Clean: You don't need to keep everything spotless, but just don't leave trash and food laying around (bugs go crazy for that).",
              "Take Pics Of Your Place: Always take photos when you move in AND move out. Solid evidence protects your deposit and can save you trouble.",
              "Communicate!!: Especially with your landlord! Report problems early and keep a solid record of your messages. Give neighbors a heads-up if you're planning any get-togethers at your place."
            ],
            "ordered": false
          },
          {
            "type": "callout",
            "body": "Renting is a huge step in adulting, and it can be messy and confusing. But once you understand the basics, you can save your sanity (and your savings!)"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Imagine you're searching for a new place to rent. Which of these raises a red flag?",
      "options": [
        "The landlord offers virtual and in-person tours.",
        "The walls have no obvious stains.",
        "The facilities have good reviews online.",
        "The landlord asks for cash only."
      ],
      "correctIndex": 3,
      "explanation": "Cash-only payments are a major red flag — legitimate landlords use traceable payment methods and provide receipts."
    },
    "keyTakeaways": [
      "Do your research before committing! Red flags like cash-only payments, no written lease, or a landlord who won't show the unit are signs to walk away fast.",
      "Your lease is a legal contract, so read every single word before signing. Understanding your rights and responsibilities upfront saves you a ton of headaches later.",
      "Good communication and documentation are your best friends as a renter. Snap photos when you move in and out, report issues early, and keep records of everything."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod1-lesson3",
    "moduleId": "mod1",
    "title": "Budgeting",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/finance-budgeting.png",
            "alt": "Budgeting lesson banner"
          },
          {
            "type": "text",
            "body": "Nobody hands you a money manual when you turn 18, and yet suddenly you're expected to budget, save, build credit, and plan for retirement all at once. No pressure, right? The truth is, managing your money doesn't have to be complicated. It's less about being perfect and more about being intentional, and starting with even the smallest habits can make a bigger difference than you'd think."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "4KheDqLROdA"
          },
          {
            "type": "list",
            "items": [
              "Budgeting isn't about restricting yourself; it's about knowing where your money goes so you can spend on what actually matters to you, without the stress.",
              "Saving doesn't have to start big. Even a small emergency fund can protect you from debt when life throws you a curveball, and it only grows from there.",
              "Credit and debit each have their place. When used responsibly, a credit card can build your financial future, but understanding the difference between the two is key to staying out of trouble."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Managing Money"
          },
          {
            "type": "text",
            "body": "Money doesn't grow on trees, and it definitely doesn't come with a user manual. If you're looking for a good starting point, you're in the right place!"
          },
          {
            "type": "heading",
            "body": "Balancing Your Budget"
          },
          {
            "type": "text",
            "body": "Budgeting isn't about restricting yourself; it's about knowing where your money is going so you feel in control instead of stressed."
          },
          {
            "type": "text",
            "body": "A simple way to start is breaking your expenses into needs and wants."
          },
          {
            "type": "heading",
            "body": "Needs - Things necessary to, y'know, live."
          },
          {
            "type": "list",
            "items": [
              "Rent",
              "Groceries",
              "Utilities",
              "Transportation",
              "Minimum loan payments",
              "Essential healthcare"
            ],
            "ordered": false
          },
          {
            "type": "heading",
            "body": "Wants - Things that are fun (in moderation)"
          },
          {
            "type": "list",
            "items": [
              "Eating takeout",
              "Streaming services",
              "Upgraded phone plans",
              "New clothes \"just because\"",
              "Entertainment"
            ],
            "ordered": false
          },
          {
            "type": "text",
            "body": "A lot of people use the 50/30/20 rule as a starting point:"
          },
          {
            "type": "list",
            "items": [
              "50% needs",
              "30% wants",
              "20% savings/debt payoff"
            ],
            "ordered": false
          },
          {
            "type": "text",
            "body": "It doesn't have to be perfect, your goal is simply to spend intentionally."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Savings Basics"
          },
          {
            "type": "heading",
            "body": "Emergency Savings"
          },
          {
            "type": "text",
            "body": "Life is unpredictable. Flat tires happen. So do surprise bills."
          },
          {
            "type": "text",
            "body": "Having a small emergency fund (even $300 - $500 at first) can keep you from going into debt when something unexpected pops up."
          },
          {
            "type": "text",
            "body": "Eventually, aim for 3-6 months of essential expenses, but don't stress, building it takes time."
          },
          {
            "type": "heading",
            "body": "Compound Interest (aka Money Growing on Its Own)"
          },
          {
            "type": "text",
            "body": "Compound interest is when the money you save earns interest… and then that interest earns interest."
          },
          {
            "type": "text",
            "body": "Even small amounts can grow surprisingly fast if you leave them alone. Think of it like planting a seed: tiny now, but it becomes a tree if you don't dig it up every few months."
          },
          {
            "type": "heading",
            "body": "High-Yield Savings Accounts (HYSAs)"
          },
          {
            "type": "text",
            "body": "Regular savings accounts grow very slowly."
          },
          {
            "type": "text",
            "body": "High-yield savings accounts (usually online banks) offer much better interest rates, often several times higher."
          },
          {
            "type": "text",
            "body": "They're great for:"
          },
          {
            "type": "list",
            "items": [
              "Emergency funds",
              "Short-term goals",
              "Money you want safe and accessible"
            ],
            "ordered": false
          },
          {
            "type": "text",
            "body": "And unlike investing, HYSAs don't risk losing your balance."
          },
          {
            "type": "heading",
            "body": "Roth IRAs & 401(k)s"
          },
          {
            "type": "text",
            "body": "These are long-term retirement savings accounts."
          },
          {
            "type": "text",
            "body": "You don't need to be an \"expert\" to open one, just set money aside and let time + compound interest work their magic!"
          },
          {
            "type": "link",
            "href": "https://www.fidelity.com/learning-center/smart-money/roth-ira-vs-401k",
            "linkText": "Roth IRA vs 401(k) breakdown"
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Credit vs. Debit"
          },
          {
            "type": "text",
            "body": "Debit is safer for day-to-day spending; credit is amazing for building financial strength if you use it responsibly."
          },
          {
            "type": "heading",
            "body": "Debit Cards"
          },
          {
            "type": "text",
            "body": "Debit cards pull money directly from your bank account."
          },
          {
            "type": "text",
            "body": "Pros: Harder to overspend, no interest, good for everyday purchases."
          },
          {
            "type": "text",
            "body": "Cons: Doesn't build credit, less protection for some purchases, and if someone steals your info, money can still leave your account."
          },
          {
            "type": "heading",
            "body": "Credit Cards"
          },
          {
            "type": "text",
            "body": "Credit cards let you borrow money temporarily and pay it off later."
          },
          {
            "type": "text",
            "body": "Pros: Builds your credit score, strong fraud protection, and rewards (like cash back or travel points)."
          },
          {
            "type": "text",
            "body": "Cons: Easy to overspend, charges interest if you don't pay the full balance, and missing payments could hurt your credit."
          },
          {
            "type": "callout",
            "body": "You don't need to have everything figured out at once. Healthy money habits grow slowly (just like savings, credit, and confidence). Every small step you take builds your financial future, and you're already on the right track just by learning this stuff."
          }
        ]
      }
    ],
    "quiz": {
      "question": "You're looking for a smart way to handle your money. What should you do?",
      "options": [
        "Let your money grow in a high-yield savings account.",
        "Keep track of purchases made with your credit card.",
        "Start saving for retirement early.",
        "Do everything listed above."
      ],
      "correctIndex": 3,
      "explanation": "Smart money management combines all of these habits — growing savings, tracking spending, and starting retirement early."
    },
    "keyTakeaways": [
      "Budgeting isn't about restricting yourself; it's about knowing where your money goes so you can spend on what actually matters to you, without the stress.",
      "Saving doesn't have to start big. Even a small emergency fund can protect you from debt when life throws you a curveball, and it only grows from there.",
      "Credit and debit each have their place. When used responsibly, a credit card can build your financial future, but understanding the difference between the two is key to staying out of trouble."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod1-lesson4",
    "moduleId": "mod1",
    "title": "Banking Basics",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Types of Bank Accounts"
          },
          {
            "type": "text",
            "body": "Checking accounts are used for daily spending. Savings accounts are used to store money and earn a little interest."
          },
          {
            "type": "image",
            "src": "/assets/images/finance-icon.png",
            "alt": "Bank account icon"
          },
          {
            "type": "callout",
            "body": "Choose the right account for your needs."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "R4A6l4Y9V7I"
          },
          {
            "type": "list",
            "items": [
              "Compare account fees",
              "Use online banking tools",
              "Review your transactions weekly"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.consumerfinance.gov/consumer-tools/bank-accounts/",
            "linkText": "Bank Account Basics"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is a common use of a checking account?",
      "options": [
        "Long-term investing only",
        "Everyday spending and bill payments",
        "Avoiding all bank fees forever",
        "Replacing a credit report"
      ],
      "correctIndex": 1,
      "explanation": "Checking accounts are designed for regular purchases and paying bills."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod2-lesson1",
    "moduleId": "mod2",
    "title": "Roommates",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/social-roommates.png",
            "alt": "Roommates lesson banner"
          },
          {
            "type": "text",
            "body": "Living with roommates can be one of the most exciting and challenging parts of adulthood. In this aduLessons module, we'll explore how to set expectations early, communicate clearly, divide responsibilities fairly, manage shared finances, and handle conflict in a mature way. By the end of this lesson, you'll feel more confident navigating shared living situation."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "oT9CcBgGGXY"
          },
          {
            "type": "list",
            "items": [
              "Living with roommates can be difficult. Conflicts can begin over shared responsibilities, such as cleaning, taking out the trash, or replacing household items like toilet paper. Has this ever been your experience?",
              "Arguments may start from small misunderstandings, such as accusations about eating someone else's food or using their belongings. Noise and respect for shared space are common issues.",
              "Overall, this video exaggerates but shows that communication and clear boundaries are important for maintaining a peaceful living environment."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Finding Roommates"
          },
          {
            "type": "text",
            "body": "Finding the right roommate is an important step when preparing to live with others. A good place to start is by asking friends, classmates, or coworkers if they know anyone who is also looking for housing."
          },
          {
            "type": "text",
            "body": "Many people also use online roommate-matching websites or social media groups to connect with potential roommates. When searching online, it is helpful to create a profile that describes your lifestyle, budget, and living preferences so you can find someone compatible."
          },
          {
            "type": "text",
            "body": "Before committing to live together, talk with potential roommates about expectations like cleanliness, schedules, and shared expenses. Taking time to communicate early can help prevent misunderstandings and lead to a more comfortable living situation."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Etiquette"
          },
          {
            "type": "text",
            "body": "Roommate etiquette refers to the basic behaviors that help people live respectfully in shared spaces. Good etiquette includes cleaning up after yourself, respecting shared areas, and contributing fairly to household responsibilities. For example, roommates should divide chores like taking out the trash, washing dishes, or cleaning common areas to prevent one person from doing all the work."
          },
          {
            "type": "text",
            "body": "It is also important to respect personal belongings and ask permission before borrowing anything. Being mindful of noise levels, especially during late hours, helps maintain a comfortable living environment for everyone."
          },
          {
            "type": "text",
            "body": "Practicing courtesy and responsibility helps build trust and prevents unnecessary conflicts between roommates."
          },
          {
            "type": "link",
            "href": "https://www.cookman.edu/studentexperience/for-new-students/roommate-etiquette.html",
            "linkText": "Roommate Etiquette (Cookman)"
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Communication"
          },
          {
            "type": "text",
            "body": "Communication is one of the most important factors in maintaining a positive roommate relationship. Roommates should discuss expectations early, including topics such as cleaning schedules, guests, shared expenses, and quiet hours. Addressing concerns directly and respectfully helps prevent misunderstandings from growing into larger conflicts."
          },
          {
            "type": "text",
            "body": "Experts recommend speaking privately about issues, using clear language, and expressing concerns with \"I\" statements rather than blaming the other person. Active listening is also essential, as it shows respect and helps both roommates understand each other's perspectives."
          },
          {
            "type": "text",
            "body": "Regular check-ins or conversations about household responsibilities can help maintain transparency and keep the living environment comfortable for everyone."
          },
          {
            "type": "callout",
            "body": "Living with roommates requires respect, clear expectations, and open communication. Practicing good etiquette and addressing issues early can help roommates create a comfortable and cooperative living environment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is one of the most important ways to prevent conflicts when living with roommates?",
      "options": [
        "Avoid talking about problems",
        "Communicate expectations clearly",
        "Ignore shared responsibilities",
        "Keep concerns to yourself"
      ],
      "correctIndex": 1,
      "explanation": "Clear communication about expectations prevents small misunderstandings from turning into larger conflicts."
    },
    "keyTakeaways": [
      "Respect shared spaces, personal belongings, and household responsibilities.",
      "Communicate expectations and concerns clearly and respectfully.",
      "Address small issues early to prevent larger roommate conflicts."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod2-lesson2",
    "moduleId": "mod2",
    "title": "Building Relationships",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Building Trust"
          },
          {
            "type": "text",
            "body": "Strong relationships grow when people are honest, dependable, and respectful over time."
          },
          {
            "type": "image",
            "src": "/assets/images/social-icon.png",
            "alt": "Relationship icon"
          },
          {
            "type": "callout",
            "body": "Small acts of reliability build trust."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "CFlGJ4n2N4I"
          },
          {
            "type": "list",
            "items": [
              "Keep your promises",
              "Be respectful",
              "Show appreciation"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.apa.org/topics/relationships",
            "linkText": "Healthy Relationships"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is a foundation for building strong relationships?",
      "options": [
        "Never showing your true self",
        "Trust, honesty, and mutual respect",
        "Only spending time online",
        "Competing with others"
      ],
      "correctIndex": 1,
      "explanation": "Strong relationships are built on trust, honesty, and mutual respect—qualities that develop through consistent positive interactions."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod2-lesson3",
    "moduleId": "mod2",
    "title": "Conflict Resolution",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Handling Conflict"
          },
          {
            "type": "text",
            "body": "Conflict happens in every relationship, and calm communication helps people solve issues together."
          },
          {
            "type": "image",
            "src": "/assets/images/social-icon.png",
            "alt": "Conflict resolution icon"
          },
          {
            "type": "callout",
            "body": "Focus on solutions, not blame."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "KY5TWVz5ZDU"
          },
          {
            "type": "list",
            "items": [
              "Stay calm",
              "Use 'I' statements",
              "Agree on next steps"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.mindtools.com/ax67k7o/conflict-resolution",
            "linkText": "Conflict Resolution Tips"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the best approach to resolving conflict?",
      "options": [
        "Avoiding the problem entirely",
        "Blaming the other person",
        "Listening, understanding perspectives, and finding solutions together",
        "Winning at all costs"
      ],
      "correctIndex": 2,
      "explanation": "Healthy conflict resolution involves listening to the other person, understanding their perspective, and working together to find a solution."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod2-lesson4",
    "moduleId": "mod2",
    "title": "Navigating Social Situations",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Social Confidence"
          },
          {
            "type": "text",
            "body": "You can feel more comfortable in social settings by preparing a little and being yourself."
          },
          {
            "type": "image",
            "src": "/assets/images/social-icon.png",
            "alt": "Social situations icon"
          },
          {
            "type": "callout",
            "body": "Practice makes social situations easier."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "fA1Qb8M5LQY"
          },
          {
            "type": "list",
            "items": [
              "Prepare conversation starters",
              "Ask open-ended questions",
              "Be kind to yourself"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.helpguide.org/articles/relationships-communication/effective-communication.htm",
            "linkText": "Social Communication Basics"
          }
        ]
      }
    ],
    "quiz": {
      "question": "How can you feel more confident in social situations?",
      "options": [
        "Avoiding people altogether",
        "Preparing, being authentic, and practicing social skills",
        "Pretending to be someone you're not",
        "Only attending mandatory events"
      ],
      "correctIndex": 1,
      "explanation": "Confidence in social situations comes from preparation, authenticity, and practice—the more you engage, the more comfortable you become."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson1",
    "moduleId": "mod3",
    "title": "Time Management",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/productivity-time-management.png",
            "alt": "Time management banner"
          },
          {
            "type": "text",
            "body": "Time management is the ability to plan and organize how you use your time. When your time is structured, tasks feel more manageable and days feel less chaotic. In this lesson, you'll learn practical tools to plan your schedule, prioritize tasks, and stay focused so you can use your time more effectively in school, work, and everyday life."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/infographics/mod3-lesson1.png",
            "alt": "Time management infographic"
          },
          {
            "type": "list",
            "items": [
              "Planning your time helps you stay organized.",
              "Prioritizing tasks prevents last-minute stress.",
              "Writing tasks down improves focus and follow-through.",
              "Small-time habits can lead to better productivity."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Understanding How You Use Time"
          },
          {
            "type": "text",
            "body": "Time management starts with awareness. Many people feel busy but don't always know where their time goes."
          },
          {
            "type": "text",
            "body": "A helpful first step is paying attention to how you spend your day, including work, classes, studying, and free time. Tracking your activities for a short period can reveal patterns and highlight areas where time could be used more intentionally."
          },
          {
            "type": "text",
            "body": "The goal is not to eliminate free time, but to understand your schedule so you can make informed choices and plan your day more effectively."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Planning and Prioritizing Tasks"
          },
          {
            "type": "text",
            "body": "Planning helps turn responsibilities into clear, manageable steps. Start by writing down everything you need to do, then decide which tasks are most important or time-sensitive."
          },
          {
            "type": "text",
            "body": "Breaking large tasks into smaller pieces makes them easier to start and complete. Using planners, calendars, or digital tools can help you stay organized and keep track of deadlines. When tasks are prioritized, it becomes easier to focus on what matters most instead of feeling overwhelmed by everything at once."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Staying Focused and Using Time Efficiently"
          },
          {
            "type": "text",
            "body": "Using time well also means protecting your focus. Distractions like notifications, multitasking, or cluttered spaces can make tasks take longer than necessary. Creating a simple routine, setting time limits for tasks, or working in short sessions can help improve efficiency."
          },
          {
            "type": "text",
            "body": "Taking short, planned pauses between tasks helps maintain attention and productivity. When your time is structured and distractions are limited, it becomes easier to complete tasks consistently and stay on track throughout the day."
          },
          {
            "type": "callout",
            "heading": "Respect Your Time",
            "body": "Time management is a practical skill that improves with practice. With planning, prioritization, and focus, you can take control of your schedule and use your time more effectively."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Alexis feels busy all day but still forgets assignments and deadlines. They often rush to finish tasks at the last minute and feel overwhelmed by everything they need to do. What is the best first step Alex can take to improve time management?",
      "options": [
        "Try to multitask more to get things done faster",
        "Ignore planning and work when tasks feel urgent",
        "Track daily activities and write tasks down",
        "Stop doing non-school activities completely"
      ],
      "correctIndex": 2,
      "explanation": "The first step to better time management is tracking your activities and writing tasks down. This creates awareness of how you spend your time and helps you plan more effectively."
    },
    "keyTakeaways": [
      "Understanding how you use time helps you plan better",
      "Prioritizing tasks makes responsibilities more manageable",
      "Reducing distractions improves focus and efficiency"
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson2",
    "moduleId": "mod3",
    "title": "Work/Life Balance",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/productivity-work-life-balance.png",
            "alt": "Work/life balance banner"
          },
          {
            "type": "text",
            "body": "Work/life balance is about making space for your responsibilities while also making time for the things that matter to you. School and work are important, but they should not take over your entire life. In this lesson, you'll learn how to set boundaries, step back when needed, and create balance so you can stay productive while still enjoying your personal time."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/infographics/mod3-lesson2.png",
            "alt": "Work/life balance infographic"
          },
          {
            "type": "list",
            "items": [
              "Balance helps prevent overcommitment",
              "Personal time is an important part of a healthy routine",
              "Setting boundaries improves focus and motivation",
              "Time away from work helps you stay engaged long-term"
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Understanding Work/Life Balance"
          },
          {
            "type": "text",
            "body": "Work/life balance does not mean avoiding school or work. It means understanding when to focus on responsibilities and when to step back. Many young adults juggle classes, jobs, and social commitments at the same time, which can make everything feel overwhelming."
          },
          {
            "type": "text",
            "body": "Balance starts with recognizing that both work and personal life matter. When you allow time for both, you are more likely to stay motivated and consistent. A balanced routine helps you show up fully for your responsibilities without feeling like they take away from who you are."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Setting Boundaries and Learning to Say No"
          },
          {
            "type": "text",
            "body": "One of the biggest challenges in maintaining balance is taking on too much. Saying yes to everything can leave little time for yourself. Setting boundaries means knowing your limits and respecting them."
          },
          {
            "type": "text",
            "body": "This might look like turning down extra commitments, setting a clear end time for work, or protecting certain times of the day for personal activities."
          },
          {
            "type": "text",
            "body": "Saying no does not mean you don't care; it means you are choosing what you can realistically handle. Boundaries help you stay focused and protect your time."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Making Time for Yourself Without Guilt"
          },
          {
            "type": "text",
            "body": "Personal time is not a reward; it is a necessary part of a balanced life. After spending time on school or work, it is important to allow yourself space to relax, socialize, or do things you enjoy. This time should not feel guilty or unproductive."
          },
          {
            "type": "text",
            "body": "Just as work and school are part of who you are, so are your interests, relationships, and downtime. When personal time is planned intentionally, it becomes easier to enjoy it fully and return to responsibilities feeling refreshed and motivated."
          },
          {
            "type": "callout",
            "heading": "Create Balance",
            "body": "Work/life balance is about respecting both your responsibilities and yourself. When balance is intentional, it becomes easier to stay productive while still enjoying your life."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Jorge works part-time, goes to school full-time, and often says yes to extra responsibilities. They rarely make time for themselves and feel guilty when they do. What action would best help Jorge improve work/life balance?",
      "options": [
        "Continue saying yes to avoid disappointing others",
        "Set boundaries and schedule personal time",
        "Focus only on work and school",
        "Use free time only for catching up on tasks"
      ],
      "correctIndex": 1,
      "explanation": "Setting boundaries and intentionally scheduling personal time helps prevent burnout, protects your energy, and supports long-term productivity."
    },
    "keyTakeaways": [
      "Work and school are important, but they should not take over your life.",
      "Setting boundaries helps protect your time and energy.",
      "Personal time is necessary and should not come with guilt."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson3",
    "moduleId": "mod3",
    "title": "Mental Health",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/productivity-mental-health.png",
            "alt": "Mental health banner"
          },
          {
            "type": "text",
            "body": "Mental health affects how we think, feel, and function every day. It plays a major role in motivation, focus, and overall well-being. Burnout and lack of sleep can slowly impact mental health, especially when responsibilities pile up. In this lesson, you'll learn what burnout is, how to recognize early signs, and why healthy sleep habits are essential for protecting your mental health."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/infographics/mod3-lesson3.png",
            "alt": "Mental health infographic"
          },
          {
            "type": "list",
            "items": [
              "Mental health influences mood, focus, and motivation",
              "Burnout develops over time when mental energy is drained",
              "Lack of sleep can increase stress and emotional exhaustion",
              "Consistent sleep schedules support mental clarity and balance"
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Understanding Mental Health & Burnout"
          },
          {
            "type": "text",
            "body": "Mental health is not just about emotions; it affects how you think, react, and handle daily responsibilities."
          },
          {
            "type": "text",
            "body": "Burnout is a state of mental and emotional exhaustion that can happen when stress continues for too long without enough rest. It often starts quietly, showing up as a lack of motivation, difficulty focusing, or feeling overwhelmed by tasks that once felt manageable."
          },
          {
            "type": "text",
            "body": "Recognizing burnout early is important. Knowing your limits and paying attention to changes in how you feel can help you slow down before burnout becomes more serious."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Preventing Burnout Through Awareness"
          },
          {
            "type": "text",
            "body": "Preventing burnout begins with self-awareness. Everyone has different limits, and understanding what you can realistically handle is key. When responsibilities start to feel heavier than usual, it may be a sign to pause and reassess."
          },
          {
            "type": "text",
            "body": "Slowing down does not mean giving up; it means adjusting before things become unmanageable. Taking time to check in with yourself and allowing space to reset helps protect mental health. It's also important to remember that many people struggle with similar pressures, and you are not alone in feeling this way."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Sleep Schedules and Mental Health"
          },
          {
            "type": "text",
            "body": "Sleep plays a major role in mental health. Poor or inconsistent sleep can affect mood, focus, and emotional control. It's not only about how many hours you sleep, but also about having a consistent sleep schedule. Going to bed and waking up at similar times helps your body and mind stay balanced."
          },
          {
            "type": "text",
            "body": "Simple habits, such as limiting screen time before bed and creating a calming nighttime routine, can improve sleep quality. Even with busy schedules, prioritizing sleep supports mental clarity and overall well-being."
          },
          {
            "type": "callout",
            "heading": "Listen to Your Body",
            "body": "Taking care of your mental health means knowing yourself and recognizing when to slow down. By understanding burnout and supporting healthy sleep habits, you can protect your well-being and stay balanced long-term."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Sofia has been feeling mentally exhausted, has trouble focusing, and feels unmotivated even when tasks are not difficult. They also stay up late most nights and sleep at different times each day. What is the most helpful step Sofia can take to support their mental health?",
      "options": [
        "Push through and work harder",
        "Ignore sleep and focus on productivity",
        "Recognize burnout signs and create a consistent sleep schedule",
        "Take on fewer responsibilities without rest"
      ],
      "correctIndex": 2,
      "explanation": "Recognizing burnout signs and creating a consistent sleep schedule are the most helpful steps because they address both mental exhaustion and the sleep habits affecting Sofia's well-being."
    },
    "keyTakeaways": [
      "Mental health affects how you think, feel, and function.",
      "Burnout can develop slowly and should be addressed early.",
      "Consistent sleep schedules support emotional and mental balance."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson4",
    "moduleId": "mod3",
    "title": "Physical Health",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/productivity-physical-health.png",
            "alt": "Physical health banner"
          },
          {
            "type": "text",
            "body": "Physical health supports energy, focus, and daily performance. When your body is cared for, it becomes easier to stay productive and consistent in everyday life. This lesson focuses on simple physical health habits that fit into busy schedules and support long-term productivity. Taking care of your body is not about perfection; it's about meeting its needs so you can show up fully in what you do."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/infographics/mod3-lesson4.png",
            "alt": "Physical health infographic"
          },
          {
            "type": "list",
            "items": [
              "Physical health affects energy and focus throughout the day",
              "Regular movement supports stamina and performance",
              "Long periods of sitting can impact the body if not balanced with movement",
              "Rest and recovery are important parts of physical health"
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Physical Health and Daily Energy"
          },
          {
            "type": "text",
            "body": "Physical health plays a major role in how you feel throughout the day. When your body is supported, tasks feel more manageable, and focus improves. Energy levels are influenced by movement, posture, and physical rest. Long days of sitting, studying, or working can lead to fatigue if the body is not given care."
          },
          {
            "type": "text",
            "body": "Simple habits, such as standing up regularly or moving between tasks, help maintain physical energy. Taking care of your body allows you to stay engaged and productive without feeling physically drained."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Movement and Body Care"
          },
          {
            "type": "text",
            "body": "Movement does not have to be intense or time-consuming to be effective. Small actions, like stretching, walking, or changing positions, help support circulation and reduce stiffness. Paying attention to posture during long work or study sessions can also prevent discomfort. Physical health is about consistency, not perfection."
          },
          {
            "type": "text",
            "body": "Finding simple ways to move your body throughout the day helps support strength and endurance over time. These habits make it easier to stay comfortable and focused during daily responsibilities."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Rest, Recovery and Listening To Your Body"
          },
          {
            "type": "text",
            "body": "Rest and recovery are essential parts of physical health. Pushing through exhaustion can reduce performance and energy over time. Listening to your body and recognizing when it needs rest helps prevent physical fatigue."
          },
          {
            "type": "text",
            "body": "Taking breaks, allowing time to recover, and respecting physical limits support long-term productivity. Caring for your body also supports your mind, as physical well-being and mental clarity are closely connected. Meeting your body's needs allows you to stay balanced and consistent."
          },
          {
            "type": "callout",
            "heading": "Support Your Body",
            "body": "Physical health supports productivity by giving your body the energy it needs to function well. When you take care of your body, you also support focus, balance, and overall well-being."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Taylor spends long hours studying and working at a desk. By the end of the day, they feel physically drained and uncomfortable, even though they did not do any heavy activity. Which habit would best support Taylor's physical health and productivity?",
      "options": [
        "Sitting for long periods without breaks",
        "Avoiding rest to finish tasks faster",
        "Moving regularly and taking breaks from sitting",
        "Staying in the same position to stay focused"
      ],
      "correctIndex": 2,
      "explanation": "Moving regularly and taking breaks from sitting are the best choices because physical health supports energy, comfort, and productivity during long periods of study or work."
    },
    "keyTakeaways": [
      "Physical health supports energy, focus, and daily performance.",
      "Small movement and body care habits make a difference over time.",
      "Rest and recovery are essential for long-term productivity."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod4-lesson1",
    "moduleId": "mod4",
    "title": "Groceries",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/cooking-groceries.png",
            "alt": "Groceries lesson banner"
          },
          {
            "type": "text",
            "body": "Getting groceries can feel incredibly stressful and leave you wandering around aimlessly if you don't have a plan. Knowing what ingredients you need ahead of time not only saves time but also helps you stay within budget and avoid unnecessary purchases. In this module, you'll learn how to shop efficiently by creating a simple grocery list, understanding basic ingredients, and preparing for the recipes you plan to make."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/infographics/mod4-lesson1.png",
            "alt": "Groceries infographic"
          },
          {
            "type": "list",
            "items": [
              "Plan before you shop. Check your kitchen first, plan meals for the week, and make a grocery list so you only buy what you actually need.",
              "Look for the best prices. Compare unit prices, check store sales or discounts, and consider store-brand products to save money.",
              "Use nutrition labels to choose healthier foods. Reading food labels helps you select items lower in added sugar, sodium, and unhealthy fats.",
              "Stick to your shopping list. Following your list helps avoid impulse purchases and keeps your grocery spending under control."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Where to Shop"
          },
          {
            "type": "text",
            "body": "Choosing where to shop for groceries can affect both your budget and the quality of food you buy."
          },
          {
            "type": "text",
            "body": "Many people shop at supermarkets because they offer a wide variety of products and competitive prices."
          },
          {
            "type": "text",
            "body": "Discount grocery stores and store brands can help reduce food costs while still providing nutritious options."
          },
          {
            "type": "text",
            "body": "Local farmers markets are another option and often provide fresh fruits and vegetables that are grown nearby."
          },
          {
            "type": "text",
            "body": "Some communities also have warehouse clubs or bulk stores where certain items can be purchased in larger quantities at lower prices per unit."
          },
          {
            "type": "text",
            "body": "Comparing prices, checking weekly store ads, and selecting the store that fits your budget and needs can help you grocery shop more efficiently."
          },
          {
            "type": "link",
            "href": "https://www.usda.gov/about-usda/news/blog/healthy-eating-budget",
            "linkText": "Healthy Eating on a Budget (USDA)"
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Quality Checking"
          },
          {
            "type": "text",
            "body": "Checking the quality of food while grocery shopping helps ensure you purchase fresh and safe items."
          },
          {
            "type": "text",
            "body": "When selecting fruits and vegetables, look for produce that is firm, brightly colored, and free of bruises or mold."
          },
          {
            "type": "text",
            "body": "Meat and dairy products should always be checked for expiration dates and kept cold in the store."
          },
          {
            "type": "text",
            "body": "Packaging should also be inspected to make sure it is not damaged, leaking, or open."
          },
          {
            "type": "text",
            "body": "In addition, reading nutrition labels can help you make healthier choices by comparing ingredients, sodium levels, and added sugars."
          },
          {
            "type": "text",
            "body": "Paying attention to these details can help you avoid spoiled products and select foods that support a balanced diet. Remember to trust your instincts and use your 5 senses to analyze before you buy!"
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Food Storage"
          },
          {
            "type": "text",
            "body": "Proper food storage is important for maintaining food quality and preventing foodborne illness."
          },
          {
            "type": "text",
            "body": "Perishable foods such as meat, dairy, and fresh produce should be refrigerated as soon as possible after shopping. Refrigerators should typically be kept at or below 40°F (4°C) to slow bacterial growth."
          },
          {
            "type": "text",
            "body": "Many foods also have recommended storage times, so checking labels and guidelines can help prevent waste."
          },
          {
            "type": "text",
            "body": "Dry foods like rice, pasta, and canned goods should be stored in a cool, dry place."
          },
          {
            "type": "text",
            "body": "Organizing food by expiration dates and using older items first can also reduce food waste and ensure food stays safe to eat. (Centers for Disease Control and Prevention)"
          },
          {
            "type": "callout",
            "body": "Learning how to shop for groceries wisely can help people save money and maintain a healthy diet. By choosing the right stores, checking food quality, and storing groceries properly, shoppers can make better decisions and reduce food waste."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which action helps prevent food from spoiling too quickly?",
      "options": [
        "Leaving groceries on the counter for several hours",
        "Refrigerating perishable foods soon after shopping",
        "Ignoring expiration dates",
        "Storing meat at room temperature"
      ],
      "correctIndex": 1,
      "explanation": "Refrigerating perishable foods soon after shopping slows bacterial growth and keeps food safe to eat longer."
    },
    "keyTakeaways": [
      "Choose grocery stores that offer affordable prices, special deals, and fresh food options.",
      "Check produce, packaging, and expiration dates to ensure food quality.",
      "Store groceries properly to keep food fresh and safe to eat."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod4-lesson2",
    "moduleId": "mod4",
    "title": "Essential Cooking Techniques",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Core Techniques"
          },
          {
            "type": "text",
            "body": "Basic techniques like sauteing, roasting, and boiling help you cook many meals with confidence."
          },
          {
            "type": "image",
            "src": "/assets/images/cooking-icon.png",
            "alt": "Cooking techniques icon"
          },
          {
            "type": "callout",
            "body": "Practice one technique at a time."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "sUQ8Y6qf6Q8"
          },
          {
            "type": "list",
            "items": [
              "Preheat before cooking",
              "Use medium heat when unsure",
              "Taste and adjust seasoning"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.bbcgoodfood.com/howto/guide/cooking-skills",
            "linkText": "Basic Cooking Skills"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What does 'sautéing' mean?",
      "options": [
        "Boiling food in lots of water",
        "Cooking food quickly in a small amount of fat over medium-high heat",
        "Freezing food",
        "Grilling over an open flame"
      ],
      "correctIndex": 1,
      "explanation": "Sautéing is a quick cooking method that uses a small amount of fat over medium-high heat to cook food while keeping it tender."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod4-lesson3",
    "moduleId": "mod4",
    "title": "Reading Recipes & Measurements",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Read Before You Cook"
          },
          {
            "type": "text",
            "body": "Reading the full recipe first helps you prep ingredients, tools, and timing before you start."
          },
          {
            "type": "image",
            "src": "/assets/images/cooking-icon.png",
            "alt": "Recipe reading icon"
          },
          {
            "type": "callout",
            "body": "Measure carefully for better results."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "v-Cx7V3R0tQ"
          },
          {
            "type": "list",
            "items": [
              "Read all steps first",
              "Gather ingredients",
              "Double-check measurements"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.allrecipes.com/article/how-to-read-a-recipe/",
            "linkText": "How to Read a Recipe"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is it important to read through a recipe before you start cooking?",
      "options": [
        "It's not necessary—just cook as you go",
        "To understand the steps, gather ingredients, and avoid mistakes",
        "To practice your reading skills",
        "Only for complicated recipes"
      ],
      "correctIndex": 1,
      "explanation": "Reading through the entire recipe first helps you gather all ingredients, understand the process, and cook more efficiently."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod4-lesson4",
    "moduleId": "mod4",
    "title": "Nutrition & Meal Planning",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Balanced Meals"
          },
          {
            "type": "text",
            "body": "Simple meal planning helps you save money and build balanced meals with better nutrition."
          },
          {
            "type": "image",
            "src": "/assets/images/cooking-icon.png",
            "alt": "Meal planning icon"
          },
          {
            "type": "callout",
            "body": "Plan a few meals before shopping."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "E7Q5Q2k4nqA"
          },
          {
            "type": "list",
            "items": [
              "Include protein",
              "Add vegetables",
              "Choose whole grains"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.myplate.gov/",
            "linkText": "MyPlate Meal Planning"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is a balanced meal?",
      "options": [
        "Only vegetables",
        "A combination of protein, vegetables, whole grains, and healthy fats",
        "As much food as possible",
        "Only carbohydrates"
      ],
      "correctIndex": 1,
      "explanation": "A balanced meal includes protein, vegetables, whole grains, and healthy fats to provide proper nutrition and sustained energy."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod5-lesson1",
    "moduleId": "mod5",
    "title": "Housing: On and Off Campus",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/household-finding-housing.png",
            "alt": "Finding housing lesson banner"
          },
          {
            "type": "text",
            "body": "Where you live during college has a real impact on your budget, your routine, and your overall experience. Whether you're staying in the dorms or signing your first lease, it helps to know what you're getting into before you commit. This lesson covers the key differences between on-campus and off-campus housing, walks you through the search process for both, and helps you build a realistic budget so there are no surprises once you move in."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/infographics/mod5-lesson1.png",
            "alt": "Housing infographic"
          },
          {
            "type": "heading",
            "body": "Things to Remember"
          },
          {
            "type": "list",
            "items": [
              "Start your search early. The best rooms and rental deals go fast — begin looking at least three to six months before your move-in date.",
              "Compare total costs, not just rent. On-campus pricing often bundles utilities, internet, and furniture. Off-campus rent may look cheaper until you factor in those extras separately.",
              "Read every lease before you sign. Understand the lease term, early termination penalties, security deposit details, and who handles maintenance.",
              "Think about your daily routine. If you have early classes or depend on campus resources, proximity matters. If you prefer more independence and quiet, off-campus might be a better fit.",
              "Choose roommates with intention. Have an honest conversation about noise, guests, chores, and shared expenses before committing to a living arrangement."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Finding Housing On Campus"
          },
          {
            "type": "text",
            "body": "Your university's website is the best place to start. Most schools have a dedicated housing portal where you can browse residence halls, submit applications, select meal plans, and even request a specific roommate."
          },
          {
            "type": "text",
            "body": "Start by searching for \"Housing\" or \"Residence Life\" on your school's site — it's usually under Student Life or Campus Living. Once you're in, compare your options: look at room types (single, double, suite), included amenities (laundry, AC, kitchenettes), and proximity to your classes. Many portals also offer virtual tours and floor plans."
          },
          {
            "type": "text",
            "body": "Housing is often assigned first-come, first-served or through a lottery, so mark the application open date and submit early. You'll typically pay a deposit to hold your spot, which is usually refundable if you cancel before the deadline. For roommates, most schools offer matching questionnaires based on sleep habits, study preferences, and social style — or you can request someone you already know."
          },
          {
            "type": "text",
            "body": "Once you're assigned, review your residence hall policies, set up your meal plan, and complete any required forms like immunization records and emergency contacts."
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Finding Housing Off Campus"
          },
          {
            "type": "text",
            "body": "Searching for off-campus housing can feel like a lot, but the right tools make it much more manageable."
          },
          {
            "type": "text",
            "body": "Zillow is one of the largest rental listing sites — you can filter by price, bedrooms, pet policy, and distance from campus, and it's especially useful for comparing prices across neighborhoods."
          },
          {
            "type": "text",
            "body": "Apartments.com specializes in apartment complexes and lets you view floor plans, amenity lists, and resident reviews, with the option to apply directly through the site."
          },
          {
            "type": "text",
            "body": "Your school may also have its own off-campus housing board or partner with platforms like College Pads that focus specifically on student-friendly rentals."
          },
          {
            "type": "text",
            "body": "Whichever platform you use, always visit the place in person before signing anything. Map your commute to campus, check the neighborhood during different times of day, and read the full lease carefully — paying close attention to the lease term, penalties for breaking it, who handles repairs, and what's included in the rent."
          },
          {
            "type": "text",
            "body": "Starting your search three to four months before your move-in date gives you the best selection and avoids the last-minute scramble."
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Budgeting for Housing"
          },
          {
            "type": "text",
            "body": "Rent is the biggest line item, but it's far from the only cost. A realistic housing budget accounts for everything that comes with having a place to live. Rent typically runs $500 to $1,400 per month depending on your city, proximity to campus, and whether you have roommates. Utilities (electricity, water, gas, trash) usually add $80 to $200 — some rentals include these, so always ask before signing."
          },
          {
            "type": "text",
            "body": "If you're off-campus without a meal plan, groceries will run $200 to $400 a month; meal prepping can help keep that number down. Transportation costs vary from $0 to $150 depending on whether you drive, take the bus, or use ride-shares — check if your school offers free transit passes."
          },
          {
            "type": "text",
            "body": "Internet is another $40 to $80, though splitting it with roommates or finding a building that includes it helps. A good framework to follow is the 50/30/20 rule: 50% of your income goes to needs (rent, food, transport), 30% to wants (entertainment, dining out), and 20% to savings or debt repayment."
          },
          {
            "type": "text",
            "body": "Even if your budget is tight, tracking where every dollar goes is the first step toward feeling in control of your finances."
          },
          {
            "type": "callout",
            "body": "Finding the right place to live is one of the most practical decisions you'll make in college. By using your school's housing portal, exploring trusted rental platforms, and building an honest budget that goes beyond just rent, you set yourself up for a living situation that supports your goals rather than adding stress to them."
          }
        ]
      }
    ],
    "quiz": {
      "question": "When budgeting for off-campus housing, which approach gives you the most accurate picture of your total monthly cost?",
      "options": [
        "Only calculate your monthly rent — the landlord typically covers everything else",
        "Add up rent, utilities, internet, groceries, transportation, and renter's insurance for a complete picture",
        "Double your rent amount — that's usually enough to cover all other expenses",
        "Ask your roommate to handle the budget since only one person needs to track it"
      ],
      "correctIndex": 1,
      "explanation": "A realistic housing budget includes every cost of living, not just rent — utilities, internet, groceries, transportation, and insurance all add up."
    },
    "keyTakeaways": [
      "Use your university's resources first — your school's housing portal centralizes applications, roommate matching, meal plans, and move-in details. Start there before exploring other options.",
      "Research off-campus options on trusted platforms — sites like Zillow and Apartments.com make apartment hunting easier. Always tour in person, check your commute, and read the full lease before signing.",
      "Budget for the full cost of living — rent is only part of the equation. Factor in utilities, internet, groceries, transportation, and renter's insurance, and use the 50/30/20 rule to stay on track."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod5-lesson2",
    "moduleId": "mod5",
    "title": "Organization & Decluttering",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Declutter Your Space"
          },
          {
            "type": "text",
            "body": "Decluttering reduces stress and helps you find things quickly when you need them."
          },
          {
            "type": "image",
            "src": "/assets/images/household-icon.png",
            "alt": "Decluttering icon"
          },
          {
            "type": "callout",
            "body": "Keep what you use and value."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "m6Q8z9q4JgY"
          },
          {
            "type": "list",
            "items": [
              "Start with one drawer",
              "Sort into keep/donate/trash",
              "Set a monthly reset"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.apartmenttherapy.com/decluttering-tips-36611140",
            "linkText": "Decluttering Tips"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is decluttering important?",
      "options": [
        "It's just for making things look nice",
        "It reduces stress, saves space, and makes finding things easier",
        "Only necessary if you have too many possessions",
        "It's a waste of time"
      ],
      "correctIndex": 1,
      "explanation": "Decluttering reduces mental clutter, saves physical space, makes it easier to find what you need, and creates a more peaceful home."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod5-lesson3",
    "moduleId": "mod5",
    "title": "Laundry Care",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Laundry Basics"
          },
          {
            "type": "text",
            "body": "Sorting clothes and reading care labels helps protect fabrics and improve wash results."
          },
          {
            "type": "image",
            "src": "/assets/images/household-icon.png",
            "alt": "Laundry icon"
          },
          {
            "type": "callout",
            "body": "Sort before you wash."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "f8b7G5H6kQ4"
          },
          {
            "type": "list",
            "items": [
              "Separate lights and darks",
              "Check labels",
              "Use the right water temperature"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.consumerreports.org/appliances/laundry/how-to-do-laundry/",
            "linkText": "Laundry How-To"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why should you separate clothes before washing?",
      "options": [
        "You don't need to—just wash everything together",
        "To prevent color bleeding, protect delicate items, and improve cleaning results",
        "Only if you have a lot of clothes",
        "To waste more water and detergent"
      ],
      "correctIndex": 1,
      "explanation": "Sorting clothes prevents color transfer, protects delicate fabrics, and ensures each load is washed appropriately for best results."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod5-lesson4",
    "moduleId": "mod5",
    "title": "Basic Home Repairs",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Simple Home Fixes"
          },
          {
            "type": "text",
            "body": "Learning basic repairs can help you solve small household problems quickly and safely."
          },
          {
            "type": "image",
            "src": "/assets/images/household-icon.png",
            "alt": "Home repairs icon"
          },
          {
            "type": "callout",
            "body": "Know your limits and stay safe."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "e5X9k3R2d8A"
          },
          {
            "type": "list",
            "items": [
              "Tighten loose screws",
              "Unclog simple drains",
              "Replace light bulbs safely"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.familyhandyman.com/list/home-repair-basics/",
            "linkText": "Home Repair Basics"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is a benefit of knowing basic home repairs?",
      "options": [
        "There are no benefits",
        "You can fix minor issues quickly and save money on repairs",
        "You never need to call a professional",
        "It's only for homeowners"
      ],
      "correctIndex": 1,
      "explanation": "Knowing basic home repairs allows you to fix small issues immediately, prevent them from becoming bigger problems, and save money."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod6-lesson1",
    "moduleId": "mod6",
    "title": "Cars",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "image",
            "src": "/assets/images/banners/transportation-cars.png",
            "alt": "Cars lesson banner"
          },
          {
            "type": "text",
            "body": "Welcome to the Cars lesson! In this lesson you will learn about car maintenance like checking your oil levels, tire pressure, and even changing your tires. This lesson will also go into car insurance and how to sign up for it."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "grxX9B9KzcM"
          },
          {
            "type": "list",
            "items": [
              "The car engine is under the hood of the car and makes the car run.",
              "The radiator is towards the front of the car. This allows the engine to cool down and not overheat.",
              "The battery is easy to find, look for anything that looks like a battery and see if it has cables running near it. The battery also has a red piece that indicates a positive charge.",
              "There is a wiper fluid access point that allows for you to fill the wiper fluid. Check the symbol on the cap to make sure you are filling the reservoir with the proper fluid."
            ],
            "ordered": false
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "How to Change a Tire"
          },
          {
            "type": "text",
            "body": "An important skill that one needs to know about is how to change a car tire. You may not ever need to change a tire, but having that ability will save you time."
          },
          {
            "type": "heading",
            "body": "What you need:"
          },
          {
            "type": "text",
            "body": "Depending on the make and model of your car, these items should be in the trunk of your car."
          },
          {
            "type": "list",
            "items": [
              "Car jack",
              "Lug Wrench",
              "Spare tire"
            ],
            "ordered": false
          },
          {
            "type": "heading",
            "body": "Steps"
          },
          {
            "type": "list",
            "items": [
              "First, you will place the car jack on the metal frame of the car next to the flat tire.",
              "Then, you grab the lug wrench and loosen — just loosen — the lug nuts from the tire. There are usually four to five lug nuts depending on the make and model of your car.",
              "Thirdly, you start to raise the jack, aligning it with the metal frame to lift it off the ground. Make sure that there is space between the flat tire and the ground.",
              "Once the tire is suspended from the ground, you begin to remove the lug nuts, removing the lug nut opposite of the first one you removed. If there are five lug nuts, do it in a star pattern.",
              "After you remove the lug nuts, you can slide the old tire off and replace it with a spare (or the new tire). Careful removing the tire, it can be heavy, request for help if you need it.",
              "Do the same thing, but backwards. Place the lug nuts on the tire, then screw them on, repeat the same pattern.",
              "Lower the jack carefully.",
              "Finish tightening the lug nuts and you are done."
            ],
            "ordered": true
          },
          {
            "type": "text",
            "body": "Congratulations, you have learned to change a tire!"
          }
        ]
      },
      {
        "pageNumber": 4,
        "blocks": [
          {
            "type": "heading",
            "body": "Checking fluid levels"
          },
          {
            "type": "text",
            "body": "Did you know that your car runs on multiple fluids? Did you also know that you have to maintain the levels of these fluids for your car to run properly? Well we're here to teach you! To check the fluid levels, you have to pop open the hood and take a look at what is under there."
          },
          {
            "type": "list",
            "items": [
              "To open the car hood, check for a switch to your left, either on the floor near the door or next to your steering wheel. Pull the switch and that should prop the hood up.",
              "Step to the front of your vehicle and put your hand under the hood and grab the latch. Pull that handle while lifting the hood.",
              "Once fully open, there is a stick that you pull on and place it into a small hole under the hood. You can now check the fluid levels."
            ],
            "ordered": true
          },
          {
            "type": "text",
            "body": "To check the oil levels:"
          },
          {
            "type": "list",
            "items": [
              "You pull out the dip stick (usually a yellow cap).",
              "Clean the stick with a napkin or rag, reinsert it and pull it out.",
              "Check the minimum and maximum levels with the designated lines, if there is less than the maximum amount of oil, add more oil."
            ],
            "ordered": true
          },
          {
            "type": "text",
            "body": "The other car fluids have transparent tanks that mark the maximum and minimum levels. The more important fluid levels that you need to be aware of are (there are fluid brands for different makes and models of your vehicle):"
          },
          {
            "type": "list",
            "items": [
              "Coolant: Coolant (also known as antifreeze) helps to keep things cool by absorbing engine heat and distributing it through the radiator. Maintaining the right coolant level minimizes overheating.",
              "Power Steering Fluid: Many power steering systems are hydraulic, using pressurized fluid to make turning the wheel effortless.",
              "Brake Fluid: Modern automobile brakes are hydraulic, which means that fluid connects the pedal to the brakes itself.",
              "Transmission Fluid: Transmission fluid, like engine oil, lubricates and cools the components of your transmission."
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.popularmechanics.com/cars/a64322023/how-to-check-car-fluids/",
            "linkText": "How to Check Car Fluids (Popular Mechanics)"
          }
        ]
      },
      {
        "pageNumber": 5,
        "blocks": [
          {
            "type": "heading",
            "body": "Dashboard Warning Lights"
          },
          {
            "type": "text",
            "body": "When the fluid levels in your vehicle are low, there are lights that will appear. They look like emojis, which tell you what the car needs."
          },
          {
            "type": "image",
            "src": "/assets/images/infographics/mod6-lesson1.png",
            "alt": "Dashboard warning lights infographic"
          },
          {
            "type": "text",
            "body": "Different types of lights and what they mean:"
          },
          {
            "type": "list",
            "items": [
              "Check Engine: A loose wire, an ill-fitting gas cap, or a damaged solenoid could all be causes for concern. Alternatively, it could indicate that something serious is going on with the engine's heart.",
              "Battery: The battery of your car could be out of battery and your car will not start. If your car starts and the light is still on, it could be another issue and you should consult a mechanic.",
              "Coolant Temperature: If this light appears, your vehicle could be overheating. Another reason why the light turns on is because the radiator is damaged or the coolant hose is damaged, get it replaced or fixed as soon as you can.",
              "Transmission Temperature: This implies that the internal components of your gearbox are reaching a critical point. This could be caused by heavy towing, low transmission fluid levels, or, more importantly, excessive wear on the transmission's internal workings.",
              "Tire Pressure Monitoring System: This usually means that the tire pressure, or air in your tire, is low or that you may have a flat tire. Either fill the tire air, patch the hole, or replace the tire entirely depending on the severity.",
              "Traction Control: This light turns on when your vehicle is driving in rainy or snowy conditions, this means that it is working correctly. If the light turns on on a sunny day, there could be an issue with the system.",
              "Airbag Warning: It's totally normal for this light to illuminate when your car first starts. If it remains illuminated while driving, there may be an issue with one of the vehicle's airbags. This will not get you trapped on the side of the road, but it may be harmful in the event of a collision.",
              "High Beam Indicator: This light should only be on when you are driving through very dark areas.",
              "Freezing Temperatures: This light shows that the temperatures are close to or below freezing, this does not mean that anything is broken but that you should be cautious with the icy conditions."
            ],
            "ordered": false
          },
          {
            "type": "callout",
            "body": "Now you know how to change a tire, check fluid levels, and what the lights mean when they appear on your dashboard. Stay prepared and drive safe."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Where should you place the car jack when changing a tire?",
      "options": [
        "On the roof of the car",
        "In the passenger seat",
        "The metal frame under the car",
        "In the trunk"
      ],
      "correctIndex": 2,
      "explanation": "The car jack must be placed on the metal frame under the car so it can safely lift the vehicle without damaging it."
    },
    "keyTakeaways": [
      "Use a car jack to lift the car and be able to change the tire.",
      "Pull out the yellow cap to check the oil level.",
      "Each dashboard warning light is important and you should know what each of them means."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod6-lesson2",
    "moduleId": "mod6",
    "title": "Vehicle Safety & Driving",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Drive Safely"
          },
          {
            "type": "text",
            "body": "Safe driving means staying alert, following rules, and avoiding distractions."
          },
          {
            "type": "image",
            "src": "/assets/images/transportation-icon.png",
            "alt": "Driving safety icon"
          },
          {
            "type": "callout",
            "body": "Seatbelts on, phone away."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "c9N2k7Q4xY8"
          },
          {
            "type": "list",
            "items": [
              "Wear your seatbelt",
              "Follow speed limits",
              "Keep a safe distance"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.nhtsa.gov/road-safety",
            "linkText": "Road Safety Basics"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the most important safety measure while driving?",
      "options": [
        "Driving as fast as possible",
        "Wearing a seatbelt, following traffic rules, and staying focused",
        "Only driving at night",
        "Ignoring distractions"
      ],
      "correctIndex": 1,
      "explanation": "Vehicle safety requires wearing a seatbelt, following traffic rules, staying focused, and avoiding distractions while driving."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod6-lesson3",
    "moduleId": "mod6",
    "title": "Vehicle Maintenance",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Maintain Your Vehicle"
          },
          {
            "type": "text",
            "body": "Regular maintenance keeps your vehicle safer, more reliable, and less expensive over time."
          },
          {
            "type": "image",
            "src": "/assets/images/transportation-icon.png",
            "alt": "Vehicle maintenance icon"
          },
          {
            "type": "callout",
            "body": "Small checks prevent big repairs."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "k2L8m5P1zQ7"
          },
          {
            "type": "list",
            "items": [
              "Check tire pressure",
              "Change oil on schedule",
              "Watch warning lights"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.aaa.com/autorepair/articles/car-maintenance-guide",
            "linkText": "Car Maintenance Guide"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is regular vehicle maintenance important?",
      "options": [
        "It's not necessary—cars never break down",
        "It prevents breakdowns, extends vehicle life, and ensures safety",
        "Only if your car is very old",
        "It's a waste of money"
      ],
      "correctIndex": 1,
      "explanation": "Regular maintenance prevents expensive breakdowns, extends your vehicle's lifespan, and ensures your safety on the road."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod6-lesson4",
    "moduleId": "mod6",
    "title": "Making Transportation Decisions",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Make Smart Decisions"
          },
          {
            "type": "text",
            "body": "Transportation decisions should include total cost, safety, and how often you will use each option."
          },
          {
            "type": "image",
            "src": "/assets/images/transportation-icon.png",
            "alt": "Transportation decisions icon"
          },
          {
            "type": "callout",
            "body": "Look at long-term costs, not just price today."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "q8W3n6B2hR1"
          },
          {
            "type": "list",
            "items": [
              "Compare monthly costs",
              "Think about reliability",
              "Choose what fits your routine"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.consumerreports.org/cars/",
            "linkText": "Transportation Buying Advice"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What should you evaluate when deciding whether to buy a car?",
      "options": [
        "Just the purchase price",
        "Purchase price, insurance, fuel, maintenance, and how often you'll use it",
        "Only what color you like",
        "Your friends' opinions"
      ],
      "correctIndex": 1,
      "explanation": "A comprehensive decision about buying a car includes evaluating total costs (purchase, insurance, fuel, maintenance) and frequency of use."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  }
];

const users = [
  {
    "username": "zoey123",
    "email": "zoey@test.com",
    "password": "$2b$12$02dQD5QXFFRb639WLczHv.G/MzozXbfZZuUA2JtX5z1ae5TN.vfjy",
    "avatar": "cat",
    "points": 50,
    "streak": {
      "current": 3,
      "lastActive": "2026-04-15T19:39:23.437Z"
    },
    "completedLessons": [
      "mod1-lesson1",
      "mod1-lesson2",
      "mod1-lesson3",
      "mod2-lesson1",
      "mod2-lesson2"
    ],
    "currentLesson": "mod2-lesson3",
    "allLessonsComplete": false
  },
  {
    "username": "testuser",
    "email": "test@test.com",
    "password": "$2b$12$YhK7rA3cnKDrqrVLym4NiudQB8qdlGaP.LwAh05R2y1KXghIfRr5a",
    "avatar": "robot",
    "points": 0,
    "streak": {
      "current": 0,
      "lastActive": null
    },
    "completedLessons": [],
    "currentLesson": null,
    "allLessonsComplete": false
  },
  {
    "username": "superlearner",
    "email": "super@test.com",
    "password": "$2b$12$Esu9HbfAe2IvvMLFJ.T2xOkngBZDcP6YXSRte6CccUDmYwbB3bXxy",
    "avatar": "star",
    "points": 220,
    "streak": {
      "current": 15,
      "lastActive": "2026-04-16T15:39:23.437Z"
    },
    "completedLessons": [
      "mod1-lesson1",
      "mod1-lesson2",
      "mod1-lesson3",
      "mod1-lesson4",
      "mod2-lesson1",
      "mod2-lesson2",
      "mod2-lesson3",
      "mod2-lesson4",
      "mod3-lesson1",
      "mod3-lesson2",
      "mod3-lesson3",
      "mod3-lesson4",
      "mod4-lesson1",
      "mod4-lesson2",
      "mod4-lesson3",
      "mod4-lesson4",
      "mod5-lesson1",
      "mod5-lesson2",
      "mod5-lesson3",
      "mod5-lesson4",
      "mod6-lesson1",
      "mod6-lesson2"
    ],
    "currentLesson": null,
    "allLessonsComplete": true
  }
];

const prizes = [
  {
    "name": "$10 Walmart Coupon",
    "description": "Redeemable coupon for Walmart purchases.",
    "type": "coupon",
    "cost": 25,
    "couponCode": "WALMART10",
    "available": true
  },
  {
    "name": "Budget Tracker Printable",
    "description": "A downloadable budget tracker PDF.",
    "type": "printable",
    "cost": 50,
    "fileUrl": "/assets/images/printables/budget-tracker-printable.pdf",
    "available": true
  },
  {
    "name": "20% off next purchase at AutoZone",
    "description": "AutoZone discount coupon for your next purchase.",
    "type": "coupon",
    "cost": 25,
    "couponCode": "AUTO20",
    "available": true
  },
  {
    "name": "Publix Coupon for fresh produce",
    "description": "Fresh produce coupon for Publix shoppers.",
    "type": "coupon",
    "cost": 25,
    "couponCode": "PUBLIXFRESH",
    "available": true
  },
  {
    "name": "Calendar Printable",
    "description": "A downloadable monthly calendar PDF.",
    "type": "printable",
    "cost": 50,
    "fileUrl": "/assets/images/printables/calendar-printable.pdf",
    "available": true
  },
  {
    "name": "To-Do Printable",
    "description": "A downloadable to-do list PDF.",
    "type": "printable",
    "cost": 50,
    "fileUrl": "/assets/images/printables/to-do-printable.pdf",
    "available": true
  }
];

const secretCodes = [
  {
    "code": "W15E",
    "rewardType": "points",
    "pointsValue": 15,
    "active": true
  },
  {
    "code": "R2AD",
    "rewardType": "points",
    "pointsValue": 20,
    "active": true
  },
  {
    "code": "M8XP",
    "rewardType": "points",
    "pointsValue": 25,
    "active": true
  },
  {
    "code": "L4RN",
    "rewardType": "points",
    "pointsValue": 30,
    "active": true
  },
  {
    "code": "B0LT",
    "rewardType": "points",
    "pointsValue": 10,
    "active": true
  }
];

if (appDb.modules.countDocuments() === 0 && appDb.lessons.countDocuments() === 0) {
  appDb.modules.insertMany(modules);
  appDb.lessons.insertMany(lessons);
  print('Initialized modules and lessons');
} else {
  print('Modules/lessons already exist, skipping init');
}

if (appDb.users.countDocuments() === 0) {
  appDb.users.insertMany(users);
  print('Initialized users');
} else {
  print('Users already exist, skipping init');
}

if (appDb.prizes.countDocuments() === 0) {
  appDb.prizes.insertMany(prizes);
  print('Initialized prizes');
} else {
  print('Prizes already exist, skipping init');
}

if (appDb.secretcodes.countDocuments() === 0) {
  appDb.secretcodes.insertMany(secretCodes);
  print('Initialized secret codes');
} else {
  print('Secret codes already exist, skipping init');
}
