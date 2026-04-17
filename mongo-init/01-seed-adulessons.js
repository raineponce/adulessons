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
      "mod2-lesson3",
      "mod2-lesson4"
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
      "mod6-lesson2",
      "mod6-lesson3",
      "mod6-lesson4"
    ]
  }
];

const lessons = [
  {
    "lessonId": "mod1-lesson1",
    "moduleId": "mod1",
    "title": "Budgeting 101",
    "order": 1,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "What Is a Budget?"
          },
          {
            "type": "text",
            "body": "A budget is a plan that helps you decide how to spend and save your money each month. By tracking what comes in (income) and what goes out (expenses), you can make sure you have enough for what matters most."
          },
          {
            "type": "image",
            "src": "/assets/images/coin-icon.png",
            "alt": "Coin icon"
          },
          {
            "type": "callout",
            "body": "A budget is a plan for your money — not a restriction!"
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "U9nv4kRPBz4"
          },
          {
            "type": "list",
            "items": [
              "Track your income",
              "List your expenses",
              "Find where you can save"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.consumerfinance.gov/",
            "linkText": "Consumer Financial Protection Bureau"
          }
        ]
      },
      {
        "pageNumber": 3,
        "blocks": [
          {
            "type": "heading",
            "body": "Quick Budget Tip"
          },
          {
            "type": "text",
            "body": "Try the 50/30/20 method: 50% for needs, 30% for wants, and 20% for savings or debt. It is a simple way to start balancing your money."
          },
          {
            "type": "callout",
            "body": "Small changes can make a big difference over time."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the main purpose of a budget?",
      "options": [
        "To restrict spending",
        "To plan how you use your money",
        "To increase your income",
        "To avoid paying taxes"
      ],
      "correctIndex": 1,
      "explanation": "A budget helps you plan and control how your money is spent — it's a tool, not a punishment."
    },
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
            "type": "heading",
            "body": "Managing Your Time"
          },
          {
            "type": "text",
            "body": "Time management helps you plan your day, finish priorities, and feel less stressed."
          },
          {
            "type": "image",
            "src": "/assets/images/productivity-icon.png",
            "alt": "Time management icon"
          },
          {
            "type": "callout",
            "body": "Plan first, then act."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "iONDebHX9qk"
          },
          {
            "type": "list",
            "items": [
              "List top 3 tasks",
              "Use a timer",
              "Review your day"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://todoist.com/productivity-methods",
            "linkText": "Productivity Methods"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the main benefit of effective time management?",
      "options": [
        "Working longer hours",
        "Doing more tasks in the same amount of time and reducing stress",
        "Never taking breaks",
        "Multitasking constantly"
      ],
      "correctIndex": 1,
      "explanation": "Effective time management helps you accomplish more in less time while reducing stress and improving work-life balance."
    },
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson2",
    "moduleId": "mod3",
    "title": "Goal Setting",
    "order": 2,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Set Clear Goals"
          },
          {
            "type": "text",
            "body": "Clear goals help you stay focused and track progress toward what matters most."
          },
          {
            "type": "image",
            "src": "/assets/images/productivity-icon.png",
            "alt": "Goal setting icon"
          },
          {
            "type": "callout",
            "body": "Make goals specific and realistic."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "lRtV-ugIT0k"
          },
          {
            "type": "list",
            "items": [
              "Write the goal",
              "Pick a deadline",
              "Track progress weekly"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.mindtools.com/a4wo118/smart-goals",
            "linkText": "SMART Goals Guide"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What makes a goal SMART?",
      "options": [
        "Just a vague idea of what you want",
        "Specific, Measurable, Achievable, Relevant, and Time-bound",
        "Something you might accomplish eventually",
        "Only financial goals"
      ],
      "correctIndex": 1,
      "explanation": "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound—this framework makes your goals clear and attainable."
    },
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson3",
    "moduleId": "mod3",
    "title": "Organization & Planning",
    "order": 3,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Stay Organized"
          },
          {
            "type": "text",
            "body": "Organization makes it easier to find what you need and keep your tasks on track."
          },
          {
            "type": "image",
            "src": "/assets/images/productivity-icon.png",
            "alt": "Organization icon"
          },
          {
            "type": "callout",
            "body": "A tidy system saves time."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "NEm6X0NrdY0"
          },
          {
            "type": "list",
            "items": [
              "Use one to-do list",
              "Keep a calendar",
              "Review plans each week"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.atlassian.com/blog/productivity",
            "linkText": "Planning Tips"
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is organization important for productivity?",
      "options": [
        "It's not important—you can find things later",
        "It helps you find what you need quickly and reduces wasted time",
        "Only if you're very busy",
        "It's just about making things look neat"
      ],
      "correctIndex": 1,
      "explanation": "Organization helps you locate resources, information, and tasks quickly, saving time and reducing mental clutter."
    },
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod3-lesson4",
    "moduleId": "mod3",
    "title": "Overcoming Procrastination",
    "order": 4,
    "pages": [
      {
        "pageNumber": 1,
        "blocks": [
          {
            "type": "heading",
            "body": "Beat Procrastination"
          },
          {
            "type": "text",
            "body": "Procrastination often fades when you begin with one small step instead of waiting for perfect motivation."
          },
          {
            "type": "image",
            "src": "/assets/images/productivity-icon.png",
            "alt": "Procrastination icon"
          },
          {
            "type": "callout",
            "body": "Start tiny, then keep going."
          }
        ]
      },
      {
        "pageNumber": 2,
        "blocks": [
          {
            "type": "video",
            "videoId": "arj7oStGLkU"
          },
          {
            "type": "list",
            "items": [
              "Use the 5-minute rule",
              "Break tasks into steps",
              "Remove distractions"
            ],
            "ordered": false
          },
          {
            "type": "link",
            "href": "https://www.apa.org/topics/procrastination",
            "linkText": "Understanding Procrastination"
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is an effective strategy to overcome procrastination?",
      "options": [
        "Waiting until you feel motivated",
        "Breaking tasks into smaller steps and starting immediately",
        "Only working on easy tasks first",
        "Thinking about how hard the task is"
      ],
      "correctIndex": 1,
      "explanation": "Breaking tasks into smaller, manageable steps and starting immediately—even with just 5 minutes of work—helps overcome procrastination."
    },
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

if (appDb.secretcodes.countDocuments() === 0) {
  appDb.secretcodes.insertMany(secretCodes);
  print('Initialized secret codes');
} else {
  print('Secret codes already exist, skipping init');
}
