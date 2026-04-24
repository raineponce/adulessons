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
      "mod4-lesson2",
      "mod4-lesson3",
      "mod4-lesson4"
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
      "mod6-lesson2"
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
    "title": "Saving Strategies",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Why Save Money?"
          },
          {
            "type": "text",
            "body": "Saving money helps you prepare for emergencies and reach goals like travel, school, or a new laptop."
          },
          {
            "type": "image",
            "src": "/assets/images/coin-icon.png",
            "alt": "Savings icon"
          },
          {
            "type": "callout",
            "body": "Start by saving a small amount each week."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "fTTGALaRZoc"
          },
          {
            "type": "list",
            "items": [
              "Set a savings goal",
              "Use automatic transfers",
              "Keep savings in a separate account"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.fdic.gov/resources/consumers/money-smart/index.html",
            "linkText": "FDIC Money Smart"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is a simple way to save money consistently?",
      "options": [
        "Spend first, save what is left",
        "Set up automatic transfers to savings",
        "Keep all your money in cash",
        "Only save once a year"
      ],
      "correctIndex": 1,
      "explanation": "Automatic transfers make saving easy and consistent."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
    ],
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod1-lesson3",
    "moduleId": "mod1",
    "title": "Understanding Credit",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "What Is Credit?"
          },
          {
            "type": "text",
            "body": "Credit lets you borrow money now and pay it back later. Lenders use your history to decide if you are a safe borrower."
          },
          {
            "type": "image",
            "src": "/assets/images/finance-icon.png",
            "alt": "Credit icon"
          },
          {
            "type": "callout",
            "body": "Paying bills on time helps build good credit."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "2nB4nQfaj3Q"
          },
          {
            "type": "list",
            "items": [
              "Pay on time",
              "Keep balances low",
              "Check your credit report"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.annualcreditreport.com/",
            "linkText": "Annual Credit Report"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which habit helps improve your credit score?",
      "options": [
        "Missing payments often",
        "Keeping credit card balances very high",
        "Paying bills on time",
        "Closing every account quickly"
      ],
      "correctIndex": 2,
      "explanation": "On-time payments are one of the biggest factors in your credit score."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
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
    "title": "Effective Communication",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Communication Basics"
          },
          {
            "type": "text",
            "body": "Good communication means speaking clearly and listening carefully so both people feel understood."
          },
          {
            "type": "image",
            "src": "/assets/images/social-icon.png",
            "alt": "Communication icon"
          },
          {
            "type": "callout",
            "body": "Listen first, then respond."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "HAnw168huqA"
          },
          {
            "type": "list",
            "items": [
              "Make eye contact",
              "Ask clarifying questions",
              "Repeat key points"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.skillsyouneed.com/ips/communication-skills.html",
            "linkText": "Communication Skills"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the most important element of effective communication?",
      "options": [
        "Speaking loudly and clearly",
        "Listening actively and understanding the other person",
        "Using complex vocabulary",
        "Talking more than others"
      ],
      "correctIndex": 1,
      "explanation": "Active listening and understanding others is key to effective communication and building strong relationships."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
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
    "title": "Kitchen Basics & Safety",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Kitchen Safety Basics"
          },
          {
            "type": "text",
            "body": "Safe cooking starts with clean hands, a tidy workspace, and careful use of heat and knives."
          },
          {
            "type": "image",
            "src": "/assets/images/cooking-icon.png",
            "alt": "Kitchen safety icon"
          },
          {
            "type": "callout",
            "body": "Clean as you cook to stay safe."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "Qw4I7QyR8RU"
          },
          {
            "type": "list",
            "items": [
              "Wash hands before cooking",
              "Keep raw meat separate",
              "Turn pot handles inward"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.foodsafety.gov/",
            "linkText": "Food Safety Basics"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the most important safety practice in the kitchen?",
      "options": [
        "Cooking as fast as possible",
        "Keeping your workspace clean and handling knives and heat carefully",
        "Not washing your hands",
        "Ignoring expiration dates"
      ],
      "correctIndex": 1,
      "explanation": "Kitchen safety includes maintaining cleanliness, handling knives and heat properly, and being aware of food safety practices."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
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
    "title": "Cleaning & Maintenance",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Cleaning Routine"
          },
          {
            "type": "text",
            "body": "A simple routine keeps your home cleaner and makes chores feel more manageable."
          },
          {
            "type": "image",
            "src": "/assets/images/household-icon.png",
            "alt": "Cleaning icon"
          },
          {
            "type": "callout",
            "body": "Do a little each day."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "u6qP5Aq5r5A"
          },
          {
            "type": "list",
            "items": [
              "Wipe surfaces daily",
              "Vacuum weekly",
              "Clean spills right away"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.goodhousekeeping.com/home/cleaning/",
            "linkText": "Home Cleaning Tips"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the best approach to keeping a home clean?",
      "options": [
        "Only clean when guests are coming",
        "Develop regular cleaning routines and tackle spills immediately",
        "Clean once a year",
        "Wait until it's extremely dirty"
      ],
      "correctIndex": 1,
      "explanation": "Regular cleaning routines and addressing spills immediately help maintain a clean home and prevent deep cleaning emergencies."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
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
    "title": "Transportation Options",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Choosing Transportation"
          },
          {
            "type": "text",
            "body": "The best transportation option depends on your budget, schedule, and safety needs."
          },
          {
            "type": "image",
            "src": "/assets/images/transportation-icon.png",
            "alt": "Transportation options icon"
          },
          {
            "type": "callout",
            "body": "Compare options before deciding."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "b3R8n4K1LmQ"
          },
          {
            "type": "list",
            "items": [
              "Check travel time",
              "Estimate total cost",
              "Review reliability"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.transportation.gov/",
            "linkText": "Transportation Resources"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which factor should you consider when choosing a transportation method?",
      "options": [
        "Only the cost",
        "Cost, time, reliability, environmental impact, and accessibility",
        "What your friends use",
        "Speed only"
      ],
      "correctIndex": 1,
      "explanation": "Choosing the right transportation method involves considering multiple factors: cost, travel time, reliability, environmental impact, and accessibility."
    },
    "keyTakeaways": [
      "Placeholder takeaway 1 for this lesson.",
      "Placeholder takeaway 2 for this lesson.",
      "Placeholder takeaway 3 for this lesson."
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
