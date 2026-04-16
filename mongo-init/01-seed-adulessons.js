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
    "pages": [],
    "quiz": {
      "question": "Placeholder question for Saving Strategies",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctIndex": 0,
      "explanation": "Placeholder explanation."
    },
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod1-lesson3",
    "moduleId": "mod1",
    "title": "Understanding Credit",
    "order": 3,
    "pages": [],
    "quiz": {
      "question": "Placeholder question for Understanding Credit",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctIndex": 0,
      "explanation": "Placeholder explanation."
    },
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod1-lesson4",
    "moduleId": "mod1",
    "title": "Banking Basics",
    "order": 4,
    "pages": [],
    "quiz": {
      "question": "Placeholder question for Banking Basics",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctIndex": 0,
      "explanation": "Placeholder explanation."
    },
    "pointsAwarded": 10
  },
  {
    "lessonId": "mod2-lesson1",
    "moduleId": "mod2",
    "title": "Effective Communication",
    "order": 1,
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
    "pages": [],
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
