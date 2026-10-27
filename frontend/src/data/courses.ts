export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  shortName: string;
  category: 'Computer Courses' | 'English Language' | 'Coaching Classes';
  duration: string;
  badge?: string;
  level: string;
  objective: string;
  description: string;
  highlights: string[];
  modules: CourseModule[];
  finalProject?: string;
  certification: string;
}

export const COURSES_DATA: Course[] = [
  // ==========================================
  // 1. CIT (6 MONTHS)
  // ==========================================
  {
    id: 'cit',
    title: 'CIT — Certificate in Information Technology',
    shortName: 'CIT Course',
    category: 'Computer Courses',
    duration: '6 Months',
    badge: 'Most Popular',
    level: 'Beginner to Intermediate',
    objective: 'To provide students with practical skills ranging from basic computer knowledge to MS Office, Graphic Designing, Web Development, Programming, AI Tools, and the Internet.',
    description: 'A comprehensive 6-month hands-on training program designed by Aspire Institute to empower students with modern IT, office productivity, digital design, coding fundamentals, and practical AI tools for career readiness.',
    highlights: [
      'Official Certificate recognized for job applications',
      '100% Practical lab sessions with individual computer access',
      'Coverage from computer basics to modern AI tools',
      'Real-world portfolio & final capstone project'
    ],
    modules: [
      {
        title: 'Module 1: Computer Fundamentals',
        topics: [
          'Introduction to Computer',
          'Types of Computers',
          'Hardware & Software',
          'Input & Output Devices',
          'CPU, RAM, ROM',
          'HDD & SSD',
          'Motherboard',
          'Operating System',
          'Windows Basics',
          'Files & Folders',
          'Software Installation',
          'Basic Troubleshooting'
        ]
      },
      {
        title: 'Module 2: Typing & Office Skills',
        topics: [
          'Keyboard Introduction',
          'English Typing',
          'Urdu Typing',
          'Typing Speed Practice',
          'Keyboard Shortcuts',
          'File Management',
          'Printing & Scanning',
          'PDF Creation & Management'
        ]
      },
      {
        title: 'Module 3: MS Word (Documentation Expert)',
        topics: [
          'Document Creation',
          'Text & Paragraph Formatting',
          'Page Layout',
          'Tables',
          'Images & Shapes',
          'Header & Footer',
          'Page Numbers',
          'Mail Merge',
          'CV/Resume Designing',
          'Official Letters & Applications',
          'Professional Documents',
          'PDF Export'
        ]
      },
      {
        title: 'Module 4: MS Excel (Data & Spreadsheets)',
        topics: [
          'Workbook & Worksheet',
          'Rows, Columns & Cells',
          'Data Entry & Formatting',
          'Basic Formulas',
          'SUM, AVERAGE, MIN, MAX',
          'IF Function',
          'COUNT & COUNTIF',
          'Sorting & Filtering',
          'Conditional Formatting',
          'Data Validation',
          'Tables',
          'Charts',
          'Pivot Tables',
          'Student Result Sheet',
          'Attendance Sheet',
          'Salary Sheet',
          'Sales & Expense Reports'
        ]
      },
      {
        title: 'Module 5: MS PowerPoint (Presentations)',
        topics: [
          'Presentation Creation',
          'Slide Design',
          'Themes & Templates',
          'Text, Images & Shapes',
          'Tables & Charts',
          'Transitions',
          'Animations',
          'Professional Presentation',
          'Presentation Skills'
        ]
      },
      {
        title: 'Module 6: Internet & Email',
        topics: [
          'Internet Basics',
          'Web Browsers',
          'Search Techniques',
          'Email',
          'Attachments',
          'CC & BCC',
          'Google Drive',
          'Google Docs',
          'Google Sheets',
          'Google Forms',
          'Cloud Storage',
          'Online Safety & Security'
        ]
      },
      {
        title: 'Module 7: Graphic Designing',
        topics: [
          'Introduction to Graphic Design',
          'Canva',
          'Photoshop Basics',
          'Layers',
          'Text & Images',
          'Background Removal',
          'Photo Editing',
          'Logo Design',
          'Business Card',
          'Poster & Flyer',
          'Social Media Posts',
          'YouTube Thumbnail',
          'Advertisement Design'
        ]
      },
      {
        title: 'Module 8: Web Development',
        topics: [
          'Introduction to Websites',
          'HTML',
          'HTML Structure',
          'Headings & Paragraphs',
          'Links & Images',
          'Lists & Tables',
          'Forms',
          'Introduction to CSS',
          'Colors & Fonts',
          'Backgrounds',
          'Borders',
          'Margin & Padding',
          'Basic Website Design',
          'Personal Portfolio Website'
        ]
      },
      {
        title: 'Module 9: Programming Fundamentals',
        topics: [
          'Introduction to Programming',
          'Python Basics',
          'Variables',
          'Data Types',
          'Input & Output',
          'Operators',
          'If/Else',
          'Loops',
          'Lists',
          'Functions',
          'Basic Error Handling',
          'Simple Programming Projects'
        ]
      },
      {
        title: 'Module 10: AI Tools & Digital Skills',
        topics: [
          'Introduction to Artificial Intelligence',
          'Generative AI',
          'AI Chatbots',
          'Prompt Writing Basics',
          'AI for Education',
          'AI for MS Word',
          'AI for Excel',
          'AI for Presentations',
          'AI-Assisted Coding',
          'AI Image Generation',
          'Productivity with AI',
          'Responsible Use of AI'
        ]
      },
      {
        title: 'Module 11: Basic IT & Networking',
        topics: [
          'Computer Maintenance',
          'Software Troubleshooting',
          'Windows Installation Basics',
          'Drivers',
          'Printer Installation',
          'Wi-Fi Basics',
          'LAN & WAN',
          'Network Devices',
          'Internet Connection Basics',
          'Data Backup',
          'Cyber Security Awareness'
        ]
      }
    ],
    finalProject: 'Upon completion of the course, every student will complete a practical final project (a Word document, an Excel sheet, a presentation, and a mini website or program).',
    certification: 'Upon successful completion, an official Course Completion Certificate will be issued by Aspire Institute.'
  },

  // ==========================================
  // 2. DIT (1 YEAR / 12 MONTHS)
  // ==========================================
  {
    id: 'dit',
    title: 'DIT — Diploma in Information Technology (1 Year Program)',
    shortName: 'DIT Diploma',
    category: 'Computer Courses',
    duration: '12 Months (1 Module per Month)',
    badge: 'Professional Diploma',
    level: 'Beginner to Advanced',
    objective: 'A comprehensive 1-year professional diploma covering full enterprise computer fundamentals, databases, graphic design, web development, Python programming, AI tools, and networking.',
    description: 'Designed for career seekers and students wanting a solid foundation in computer science, software engineering, databases, and IT management with practical month-wise evaluation.',
    highlights: [
      'Comprehensive 1-year recognized diploma',
      '12 in-depth monthly modules with practical hands-on labs',
      'Covers Databases, Graphic Design, Web Development & Python',
      'Generative AI tools & IT Networking integration'
    ],
    modules: [
      {
        title: 'Month 1: Computer Fundamentals',
        topics: [
          'Introduction to Computer',
          'Motherboard',
          'Types of Computers',
          'Operating System',
          'Hardware & Software',
          'Windows Basics',
          'Input & Output Devices',
          'Files & Folders',
          'CPU, RAM, ROM',
          'Software Installation',
          'HDD & SSD',
          'Basic Troubleshooting'
        ]
      },
      {
        title: 'Month 2: Typing & Office Skills',
        topics: [
          'Keyboard Introduction',
          'Keyboard Shortcuts',
          'English Typing',
          'File Management',
          'Urdu Typing',
          'Printing & Scanning',
          'Typing Speed Practice',
          'PDF Creation & Management'
        ]
      },
      {
        title: 'Month 3: MS Word',
        topics: [
          'Document Creation',
          'Page Numbers',
          'Text & Paragraph Formatting',
          'Mail Merge',
          'Page Layout',
          'CV/Resume Designing',
          'Tables',
          'Official Letters & Applications',
          'Images & Shapes',
          'Professional Documents',
          'Header & Footer',
          'PDF Export'
        ]
      },
      {
        title: 'Month 4: MS Excel',
        topics: [
          'Workbook & Worksheet',
          'Sorting & Filtering',
          'Rows, Columns & Cells',
          'Conditional Formatting',
          'Data Entry & Formatting',
          'Data Validation',
          'Basic Formulas',
          'Tables & Charts',
          'SUM, AVERAGE, MIN, MAX',
          'Pivot Tables',
          'IF Function',
          'Student Result / Attendance / Salary Sheets',
          'COUNT & COUNTIF',
          'Sales & Expense Reports'
        ]
      },
      {
        title: 'Month 5: MS PowerPoint',
        topics: [
          'Presentation Creation',
          'Tables & Charts',
          'Slide Design',
          'Transitions',
          'Themes & Templates',
          'Animations',
          'Text, Images & Shapes',
          'Professional Presentation Skills'
        ]
      },
      {
        title: 'Month 6: Internet & Email',
        topics: [
          'Internet Basics',
          'Google Drive, Docs, Sheets, Forms',
          'Web Browsers',
          'Cloud Storage',
          'Search Techniques',
          'Online Safety & Security',
          'Email, Attachments, CC & BCC'
        ]
      },
      {
        title: 'Month 7: Database System',
        topics: [
          'Database Introduction & DBMS',
          'SQL Introduction & CRUD Operations',
          'Database Models',
          'Database Security',
          'Tables, Records & Fields',
          'Practical: Create Database, Tables, Queries, Forms, Reports',
          'Primary Key & Foreign Key',
          'Project: Student Management Database',
          'Relationships'
        ]
      },
      {
        title: 'Month 8: Graphic Designing',
        topics: [
          'Introduction to Graphic Design',
          'Photo Editing',
          'Canva (Posts, Flyers, Posters, Certificates)',
          'Logo Design',
          'Photoshop Basics',
          'Business Card, Poster & Flyer',
          'Layers, Text & Images',
          'Social Media Posts & YouTube Thumbnail',
          'Background Removal',
          'Advertisement Design'
        ]
      },
      {
        title: 'Month 9: Web Development',
        topics: [
          'Introduction to Websites',
          'Colors, Fonts, Backgrounds, Borders',
          'HTML Structure, Headings, Paragraphs',
          'Margin & Padding',
          'Links, Images, Lists, Tables, Forms',
          'Basic Website Design',
          'Introduction to CSS',
          'Personal Portfolio Website'
        ]
      },
      {
        title: 'Month 10: Programming Fundamentals',
        topics: [
          'Introduction to Programming',
          'If/Else',
          'Python Basics',
          'Loops',
          'Variables & Data Types',
          'Lists & Functions',
          'Input & Output',
          'Basic Error Handling',
          'Operators',
          'Simple Programming Projects'
        ]
      },
      {
        title: 'Month 11: AI Tools & Digital Skills',
        topics: [
          'Introduction to Artificial Intelligence',
          'AI-Assisted Coding',
          'Generative AI & AI Chatbots',
          'AI Image Generation',
          'Prompt Writing Basics',
          'Productivity with AI',
          'AI for Education',
          'Responsible Use of AI',
          'AI for MS Word, Excel & Presentations'
        ]
      },
      {
        title: 'Month 12: Basic IT & Networking + Final Project',
        topics: [
          'Computer Maintenance & Software Troubleshooting',
          'Data Backup & Cyber Security Awareness',
          'Windows Installation Basics, Drivers, Printer Installation',
          'Final Project: Word Document, Excel Sheet, Presentation, Mini Website/Program',
          'Wi-Fi Basics, LAN & WAN, Network Devices',
          'Course Completion Certificate',
          'Internet Connection Basics'
        ]
      }
    ],
    finalProject: 'Course ke end mein har student ek practical Final Project complete kare ga (Word Document, Excel Sheet, Presentation, aur ek Mini Website ya Program).',
    certification: 'Successful completion par Aspire Institute ki taraf se official Course Completion Certificate diya jaye ga.'
  },

  // ==========================================
  // 3. WEB DEVELOPMENT (4 MONTHS)
  // ==========================================
  {
    id: 'web-development',
    title: 'Web Development (A Complete Technical Course — HTML, CSS & JavaScript)',
    shortName: 'Web Development',
    category: 'Computer Courses',
    duration: '4 Months',
    badge: 'High Demand',
    level: 'Beginner to Professional',
    objective: 'To train students in professional front-end web development — from structuring web pages with HTML and styling them with CSS, to adding interactivity with JavaScript — and building complete, real-world websites.',
    description: 'Designed for students, aspiring web developers, and freelancers. Master the core web trinity: HTML for markup, CSS for responsive design, and JavaScript for dynamic interactivity while creating 5 complete production websites.',
    highlights: [
      'Month 1: HTML — Structure, Forms, Media & Semantic HTML',
      'Month 2: CSS — Box Model, Flexbox & Responsive Design',
      'Month 3: JavaScript — Logic, DOM, Events & Validation',
      'Month 4: 5 Real-World Production Web Projects'
    ],
    modules: [
      {
        title: 'Month 1: HTML (Structure & Semantics)',
        topics: [
          'Introduction to Web Development',
          'Lists',
          'HTML Structure',
          'Tables',
          'Headings',
          'Forms',
          'Paragraphs',
          'Audio / Video',
          'Links',
          'Images',
          'Semantic HTML'
        ]
      },
      {
        title: 'Month 2: CSS (Styling & Responsive Design)',
        topics: [
          'Introduction to CSS',
          'Margin',
          'Selectors',
          'Padding',
          'Colors',
          'Box Model',
          'Fonts',
          'Flexbox',
          'Backgrounds',
          'Borders',
          'Responsive Design'
        ]
      },
      {
        title: 'Month 3: JavaScript (Interactivity & Logic)',
        topics: [
          'Variables',
          'Arrays',
          'Data Types',
          'Objects',
          'Operators',
          'DOM',
          'Conditions',
          'Events',
          'Loops',
          'Functions',
          'Forms Validation'
        ]
      },
      {
        title: 'Month 4: Real-World Web Projects',
        topics: [
          'Personal Portfolio Website',
          'School / College Website',
          'Business Website',
          'Restaurant Website',
          'High-Converting Landing Page'
        ]
      }
    ],
    finalProject: 'Upon completion of the course, every student will design and build multiple complete websites from scratch using HTML, CSS, and JavaScript.',
    certification: 'Upon successful completion, an official Course Completion Certificate will be issued by Aspire Institute.'
  },

  // ==========================================
  // 4. DATA SCIENCE (1 YEAR)
  // ==========================================
  {
    id: 'data-science',
    title: 'Data Science & Artificial Intelligence (1 Year Diploma)',
    shortName: 'Data Science',
    category: 'Computer Courses',
    duration: '1 Year (12 Months)',
    badge: 'Advanced Tech',
    level: 'Beginner to Advanced',
    objective: 'To equip students with industry-grade skills in Python data science, statistical modeling, machine learning, deep learning, NLP, and real-world predictive AI deployment.',
    description: 'A comprehensive 1-year flagship program designed for students and professionals looking to launch high-paying careers in Data Science, Machine Learning, and Big Data with dual-semester rigorous hands-on projects.',
    highlights: [
      'Python, Pandas, NumPy, Scikit-Learn & TensorFlow',
      'Statistical analysis, hypothesis testing & exploratory data analysis',
      'Supervised & Unsupervised Machine Learning algorithms',
      'Deep Learning, Natural Language Processing (NLP) & GenAI',
      'End-to-end model deployment using FastAPI & Streamlit',
      'Industry capstone projects with real datasets'
    ],
    modules: [
      {
        title: 'Month 1: Python for Data Science & Environment Setup',
        topics: [
          'Python Environment Setup (Anaconda, Jupyter Notebook, VS Code)',
          'Core Python Data Structures for Data Science',
          'Functions, Lambdas & List Comprehensions',
          'Object-Oriented Programming (OOP) in Python',
          'Virtual Environments & Package Management (pip, conda)'
        ]
      },
      {
        title: 'Month 2: Mathematics & Statistics for Data Science',
        topics: [
          'Descriptive Statistics (Mean, Median, Mode, Variance, Std Dev)',
          'Probability Concepts & Bayes Theorem',
          'Normal Distributions & Central Limit Theorem',
          'Inferential Statistics & Hypothesis Testing (t-test, ANOVA, Chi-Square)',
          'Correlation, Covariance & Regression Fundamentals'
        ]
      },
      {
        title: 'Month 3: Advanced NumPy & Pandas for Data Manipulation',
        topics: [
          'NumPy Arrays, Broadcasting & Vectorized Operations',
          'Pandas Series & DataFrames',
          'Handling Missing Values & Data Cleaning',
          'Filtering, Slicing & GroupBy Aggregations',
          'Merging, Joining & Reshaping Datasets'
        ]
      },
      {
        title: 'Month 4: Data Visualization & Storytelling',
        topics: [
          'Data Visualization Principles & Best Practices',
          'Matplotlib: Custom Line, Bar, Scatter & Histograms',
          'Seaborn: Heatmaps, Boxplots, Violin Plots & Pairplots',
          'Interactive Visualizations with Plotly',
          'Executive Dashboard Design & Storytelling with Data'
        ]
      },
      {
        title: 'Month 5: SQL & Relational Databases for Data Scientists',
        topics: [
          'Relational Database Architecture & Normalization',
          'Advanced SQL Queries, Filtering & Grouping',
          'Complex Joins (INNER, LEFT, RIGHT, FULL OUTER)',
          'Window Functions, CTEs & Subqueries',
          'Connecting Python to PostgreSQL & SQLite Databases'
        ]
      },
      {
        title: 'Month 6: Exploratory Data Analysis (EDA) & Feature Engineering',
        topics: [
          'Systematic EDA Framework for Real Datasets',
          'Outlier Detection & Treatment Techniques',
          'Categorical Encoding (One-Hot, Label, Ordinal)',
          'Feature Scaling (Standardization, Normalization)',
          'Feature Selection & Dimensionality Concepts'
        ]
      },
      {
        title: 'Month 7: Supervised Machine Learning',
        topics: [
          'Introduction to Machine Learning Lifecycle',
          'Simple & Multiple Linear Regression',
          'Logistic Regression & Binary Classification',
          'Decision Trees & Hyperparameter Tuning',
          'Ensemble Learning: Random Forest & Gradient Boosting (XGBoost)',
          'Model Evaluation: Confusion Matrix, ROC-AUC, F1-Score'
        ]
      },
      {
        title: 'Month 8: Unsupervised Machine Learning',
        topics: [
          'K-Means Clustering & Elbow Method',
          'Hierarchical Clustering & Dendrograms',
          'DBSCAN Density-Based Clustering',
          'Principal Component Analysis (PCA) for Dimensionality Reduction',
          'Market Basket Analysis & Association Rules'
        ]
      },
      {
        title: 'Month 9: Deep Learning & Neural Networks',
        topics: [
          'Biological vs Artificial Neural Networks',
          'Perceptrons & Multi-Layer Perceptrons (MLP)',
          'Activation Functions (ReLU, Sigmoid, Softmax)',
          'Backpropagation & Optimization (SGD, Adam)',
          'Building Neural Networks with TensorFlow & Keras'
        ]
      },
      {
        title: 'Month 10: Natural Language Processing (NLP) & GenAI',
        topics: [
          'Text Preprocessing: Tokenization, Stemming & Lemmatization',
          'Stopwords Removal, Bag-of-Words & TF-IDF',
          'Sentiment Analysis on Customer Reviews',
          'Word Embeddings (Word2Vec) & Sequence Models',
          'Introduction to HuggingFace Transformers & LLM APIs'
        ]
      },
      {
        title: 'Month 11: MLOps, APIs & Web Deployment',
        topics: [
          'Model Serialization with Pickle & Joblib',
          'Building RESTful APIs for ML Models using FastAPI',
          'Creating Interactive Web Apps with Streamlit',
          'Introduction to Docker & Containerization',
          'Deploying Data Science Web Apps to the Cloud'
        ]
      },
      {
        title: 'Month 12: Capstone Project & Industry Portfolio',
        topics: [
          'End-to-End Industry Problem Selection',
          'Data Pipeline, Training, Evaluation & API Creation',
          'Interactive Frontend Dashboard Development',
          'Technical Documentation, GitHub Repository & Presentation',
          'Mock Technical Interviews & Resume Building'
        ]
      }
    ],
    finalProject: 'Design, train, and deploy an end-to-end Machine Learning web application (e.g., Credit Card Fraud Detection, House Price Predictor, or Medical Diagnosis AI) with interactive user dashboard.',
    certification: 'Official 1-Year Diploma in Data Science & Artificial Intelligence issued by Aspire Institute.'
  },

  // ==========================================
  // 5. PYTHON PROGRAMMING (3 MONTHS)
  // ==========================================
  {
    id: 'python-programming',
    title: 'Python Programming Mastery (Core & Practical Applications)',
    shortName: 'Python Programming',
    category: 'Computer Courses',
    duration: '3 Months',
    badge: 'Core Coding',
    level: 'Beginner to Intermediate',
    objective: 'To provide students with strong foundational and intermediate programming skills in Python, covering logical thinking, OOP, automation, and real software building.',
    description: 'Master the world’s #1 programming language. Learn Python from absolute scratch to writing clean, modular code, automating repetitive tasks, scraping web data, and building database-backed desktop apps.',
    highlights: [
      'Step-by-step logic building and algorithmic thinking',
      'Object-Oriented Programming (OOP) concepts',
      'File handling, automation scripts & web scraping',
      'Database integration with SQLite',
      '3 practical portfolio projects'
    ],
    modules: [
      {
        title: 'Month 1: Python Fundamentals & Logic Building',
        topics: [
          'Introduction to Python & Setup (VS Code, Python CLI)',
          'Variables, Data Types, Type Casting & Comments',
          'Arithmetic, Comparison, Logical & Assignment Operators',
          'Conditional Logic (if, elif, else statements)',
          'Loops (for, while, nested loops, break, continue)',
          'Built-in Data Structures: Lists, Tuples, Sets, Dictionaries',
          'Functions, Return Values, Default Arguments & Scope',
          'String Manipulation & Formatting'
        ]
      },
      {
        title: 'Month 2: Object-Oriented Programming (OOP) & Advanced Concepts',
        topics: [
          'Classes, Objects, Attributes & Methods',
          'Constructors (__init__) & the self keyword',
          'Encapsulation, Data Hiding & Getters/Setters',
          'Inheritance (Single, Multiple & Multilevel)',
          'Polymorphism & Method Overriding',
          'File Handling (Read, Write, Append, CSV & JSON files)',
          'Exception Handling (try, except, finally, raise)',
          'Modules, Packages & External Libraries (pip)'
        ]
      },
      {
        title: 'Month 3: Practical Applications & Project Development',
        topics: [
          'Task Automation Scripts (Automating Excel, Files & Renaming)',
          'Web Scraping Basics with BeautifulSoup & Requests',
          'Connecting Python to SQLite Database (CRUD operations)',
          'Building Graphical User Interfaces (GUI) with Tkinter',
          'Best Coding Practices (PEP 8, Clean Code & Debugging)',
          'Final Project Development & Code Publishing on GitHub'
        ]
      }
    ],
    finalProject: 'Develop a complete Database-backed Management System (such as a Student Management Portal or Inventory Tracker) with GUI and SQLite database.',
    certification: 'Aspire Certificate in Python Programming.'
  },

  // ==========================================
  // 6. DATA ANALYTICS (4 MONTHS)
  // ==========================================
  {
    id: 'data-analytics',
    title: 'Data Analytics & Business Intelligence (Excel, SQL, Power BI, Python)',
    shortName: 'Data Analytics',
    category: 'Computer Courses',
    duration: '4 Months',
    badge: 'High Career Growth',
    level: 'All Levels',
    objective: 'To train students to turn raw business data into actionable insights, interactive visual dashboards, and strategic business decisions using industry-standard tools.',
    description: 'Become a job-ready Data Analyst. Master Advanced Excel, SQL database queries, Power BI interactive dashboard creation, and Python data analytics in 4 practical, hands-on months.',
    highlights: [
      'Advanced Excel: XLOOKUP, Nested Formulas & Dynamic Dashboards',
      'SQL for Business Queries & Complex Joins',
      'Power BI: Power Query ETL, DAX & Executive Dashboards',
      'Python data analysis with Pandas & Seaborn',
      'Portfolio of 4 real commercial case studies'
    ],
    modules: [
      {
        title: 'Month 1: Advanced Excel for Data Analytics',
        topics: [
          'Essential & Advanced Functions (XLOOKUP, INDEX/MATCH, SUMIFS, COUNTIFS)',
          'Data Cleaning, Text Functions (TRIM, CONCAT, TEXTSPLIT) & Deduplication',
          'Data Validation & Error Handling (IFERROR)',
          'Conditional Formatting for Visual Trends & Outliers',
          'Advanced Pivot Tables & Pivot Charts with Slicers and Timelines',
          'What-If Analysis, Data Tables & Goal Seek',
          'Building an Interactive Corporate Sales & KPI Dashboard'
        ]
      },
      {
        title: 'Month 2: SQL for Analytics & Data Extraction',
        topics: [
          'Relational Database Concepts & Schema Design',
          'Data Extraction (SELECT, WHERE, ORDER BY, LIMIT)',
          'Data Aggregation & Grouping (GROUP BY, HAVING, COUNT, SUM, AVG)',
          'Joining Tables (INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN)',
          'Subqueries & Common Table Expressions (CTEs)',
          'Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)',
          'Exporting Prepared Data for BI Reporting'
        ]
      },
      {
        title: 'Month 3: Power BI & Business Intelligence',
        topics: [
          'Introduction to Power BI Desktop & Architecture',
          'Power Query: ETL (Extract, Transform & Load) Workflow',
          'Data Modeling & Creating Relationships (Star Schema)',
          'DAX Fundamentals: Calculated Columns vs Measures',
          'Essential DAX Functions (CALCULATE, SUMX, RELATED, DATESYTD)',
          'Building Interactive Visuals (Bar, Line, Donut, Matrix, KPI Cards)',
          'Bookmarks, Drill-Throughs & Page Navigation',
          'Publishing & Sharing Power BI Reports'
        ]
      },
      {
        title: 'Month 4: Python for Analytics & Capstone Project',
        topics: [
          'Introduction to Python for Analysts (Jupyter Notebook)',
          'Data Wrangling with Pandas (Cleaning, Grouping, Pivoting)',
          'Exploratory Data Analysis (EDA) on Real Business Datasets',
          'Statistical Charts with Seaborn & Matplotlib',
          'Business Case Studies: Sales Trend Analysis & HR Analytics',
          'Final Capstone Project: End-to-End Power BI Executive Dashboard Portfolio'
        ]
      }
    ],
    finalProject: 'Design an executive end-to-end Business Intelligence Dashboard in Power BI with an SQL database backend answering critical sales, margin, and regional performance questions.',
    certification: 'Aspire Certificate in Professional Data Analytics & Business Intelligence.'
  },

  // ==========================================
  // 7. GRAPHIC DESIGNING (3 MONTHS)
  // ==========================================
  {
    id: 'graphic-designing',
    title: 'Graphic Designing Professional',
    shortName: 'Graphic Design',
    category: 'Computer Courses',
    duration: '3 Months',
    badge: 'Creative Career',
    level: 'All Levels',
    objective: 'Master visual communication, brand identity, social media graphics, print media, and commercial digital advertising.',
    description: 'Learn modern design principles, color theory, typography, and industry-standard tools including Adobe Photoshop, Illustrator, and Canva.',
    highlights: [
      'Real client briefs and brand identity projects',
      'Master Photoshop, Illustrator & Canva',
      'Portfolio building for freelance marketplaces',
      'Print & digital publishing expertise'
    ],
    modules: [
      {
        title: 'Module 1: Design Principles & Branding',
        topics: ['Color Psychology', 'Typography', 'Logo Design Concepts', 'Brand Guidelines & Style Guides']
      },
      {
        title: 'Module 2: Adobe Photoshop Mastery',
        topics: ['Photo Retouching & Manipulation', 'Layers & Masks', 'Product Mockups', 'E-commerce Posters']
      },
      {
        title: 'Module 3: Vector Graphics with Illustrator',
        topics: ['Vector Art & Pen Tool', 'Icon Sets', 'Flyers, Brochures & Roll-up Banners', 'Vector Exporting']
      },
      {
        title: 'Module 4: Social Media & Freelancing',
        topics: ['Instagram Carousels & Reels Graphics', 'YouTube Thumbnails', 'Behance Portfolio Setup', 'Fiverr / Upwork Freelance Starter']
      }
    ],
    finalProject: 'Create a complete corporate branding identity kit including logo, stationery, social media suite, and marketing brochures.',
    certification: 'Aspire Certificate in Graphic Design & Digital Media.'
  },

  // ==========================================
  // 8. SPOKEN ENGLISH (3 MONTHS)
  // ==========================================
  {
    id: 'spoken-english',
    title: 'Spoken English & Communication Skills',
    shortName: 'Spoken English',
    category: 'English Language',
    duration: '3 Months',
    badge: 'Confidence Booster',
    level: 'Basic to Fluent',
    objective: 'Eliminate hesitation, improve English pronunciation, develop natural fluency, and master public speaking and job interview skills.',
    description: 'An interactive, conversation-focused English program where students practice speaking every single day through group discussions, debates, and roleplays.',
    highlights: [
      'Daily conversational practice & dialogue sessions',
      'Accent improvement & phonetics training',
      'Interview & workplace communication confidence',
      'Audio-visual listening lab exercises'
    ],
    modules: [
      {
        title: 'Module 1: Hesitation Removal & Everyday English',
        topics: ['Self Introduction & Icebreakers', 'Daily Routine Conversations', 'Greeting & Courtesies', 'Vocabulary for Daily Life']
      },
      {
        title: 'Module 2: Practical Grammar for Fluency',
        topics: ['Tenses in Everyday Speech', 'Modal Verbs (Can, Could, Should)', 'Question Formation & Quick Responses', 'Idioms & Phrases']
      },
      {
        title: 'Module 3: Professional & Social Communication',
        topics: ['Job Interview Questions & Answers', 'Telephone & Email Etiquette', 'Group Discussions & Debates', 'Public Speaking & Presentation Skills']
      }
    ],
    finalProject: 'Live 5-minute English presentation and mock job interview conducted by faculty.',
    certification: 'Aspire Certificate in English Language & Communication.'
  },

  // ==========================================
  // 9. ENGLISH GRAMMAR (3 MONTHS)
  // ==========================================
  {
    id: 'english-grammar',
    title: 'English Grammar & Written Communication',
    shortName: 'English Grammar',
    category: 'English Language',
    duration: '3 Months',
    badge: 'Foundation',
    level: 'All Levels',
    objective: 'Master English sentence structure, parts of speech, active/passive voice, direct/indirect speech, and formal writing.',
    description: 'Clear the confusion around English grammar with easy rules, lots of writing practice, and guidance on error-free formal communication.',
    highlights: [
      'Comprehensive rules for all 12 tenses',
      'Direct/Indirect speech & Active/Passive voice',
      'Official letter, application & essay writing',
      'Ideal for school, college & competitive exams'
    ],
    modules: [
      {
        title: 'Module 1: Parts of Speech & Sentence Building',
        topics: ['Nouns, Pronouns, Verbs, Adjectives, Adverbs', 'Subject-Verb Agreement', 'Punctuation & Capitalization Rules']
      },
      {
        title: 'Module 2: Complete Tense Mastery',
        topics: ['Present, Past & Future Tenses (12 Forms)', 'Conditional Sentences', 'Active & Passive Voice Transformation', 'Direct & Indirect Speech']
      },
      {
        title: 'Module 3: Professional Writing Skills',
        topics: ['Formal & Informal Letters', 'Job Applications & CV Writing', 'Essay Writing & Paragraph Expansion', 'Proofreading & Common Mistakes']
      }
    ],
    finalProject: 'Comprehensive writing assessment including formal letters, essays, and grammatical error correction.',
    certification: 'Aspire Certificate in Applied English Grammar.'
  },

  // ==========================================
  // 10. COACHING CLASSES (CLASS 1 TO 10)
  // ==========================================
  {
    id: 'coaching-classes',
    title: 'Coaching Classes (Class 1 to 10)',
    shortName: 'Class 1 to 10 Coaching',
    category: 'Coaching Classes',
    duration: 'Full Academic Year / Monthly Sessions',
    badge: 'Academic Excellence',
    level: 'School Levels',
    objective: 'To provide high-quality concept-based tutoring, syllabus completion, exam preparation, and test series for school students.',
    description: 'Experienced teachers providing individual attention, regular weekly tests, daily homework follow-up, and special board exam preparation for Sindh and Federal boards.',
    highlights: [
      'Subject specialists for Mathematics, Science, English & Urdu',
      'Small batch sizes for focused personal attention',
      'Weekly assessments & monthly parent-teacher meetings',
      'Special 100-day crash course for 9th & 10th Board Exams'
    ],
    modules: [
      {
        title: 'Primary Section (Class 1 to 5)',
        topics: ['Foundation in Mathematics & Tables', 'Reading & Writing in English & Urdu', 'General Science & Social Studies', 'Handwriting & Activity-based Learning']
      },
      {
        title: 'Middle Section (Class 6 to 8)',
        topics: ['Pre-Algebra & Geometry Fundamentals', 'General Science Experiments & Concepts', 'Grammar, Composition & Comprehension', 'Computer Studies Basics']
      },
      {
        title: 'Secondary / Board Section (Class 9 & 10)',
        topics: ['Mathematics (Algebra, Trigonometry, Matrices, Theorems)', 'Physics, Chemistry & Biology Concept Lectures', 'English & Urdu Board Paper Pattern Techniques', 'Past 10-Year Papers Solution & Model Test Series']
      }
    ],
    finalProject: 'Complete syllabus mock examinations patterned after Karachi Secondary Board exams.',
    certification: 'Monthly Progress Report Card & Annual Achievement Certificate.'
  }
];
