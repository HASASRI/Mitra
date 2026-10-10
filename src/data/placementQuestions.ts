export interface PlacementQuestion {
  id: string;
  category: 'Aptitude' | 'Logical' | 'Technical' | 'Core CS' | 'HR';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  companyTags: string[];
}

export const mockPlacementQuestions: PlacementQuestion[] = [
  {
    id: 'apt-1',
    category: 'Aptitude',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: ['65 seconds', '89 seconds', '100 seconds', '75 seconds'],
    correctIndex: 1,
    explanation: 'Speed of train = Distance / Time = 240 m / 24 s = 10 m/s. Total distance to pass platform = 240 m + 650 m = 890 m. Time = 890 / 10 = 89 seconds.',
    companyTags: ['TCS', 'Infosys', 'Cognizant', 'Wipro']
  },
  {
    id: 'apt-2',
    category: 'Aptitude',
    question: 'A and B can do a piece of work in 12 days, B and C in 15 days, and C and A in 20 days. How long will A take to do the work alone?',
    options: ['30 days', '24 days', '20 days', '36 days'],
    correctIndex: 0,
    explanation: '2(A + B + C)\'s 1 day work = (1/12 + 1/15 + 1/20) = (5 + 4 + 3)/60 = 12/60 = 1/5. So (A + B + C)\'s 1 day work = 1/10. A\'s 1 day work = (A + B + C) - (B + C) = 1/10 - 1/15 = 1/30. Thus, A alone takes 30 days.',
    companyTags: ['TCS', 'Accenture', 'Capgemini']
  },
  {
    id: 'log-1',
    category: 'Logical',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctIndex: 2,
    explanation: 'Mother\'s only son is Suresh himself. Therefore, the boy is the son of Suresh. Suresh is the father.',
    companyTags: ['Infosys', 'TCS', 'Mindtree']
  },
  {
    id: 'log-2',
    category: 'Logical',
    question: 'Find the next number in the series: 4, 18, 48, 100, 180, ?',
    options: ['294', '280', '264', '312'],
    correctIndex: 0,
    explanation: 'The pattern is n^3 - n^2 or n^2 * (n - 1) for n starting from 2: 2^2*(2-1)=4, 3^2*(3-1)=18, 4^2*(4-1)=48, 5^2*(5-1)=100, 6^2*(6-1)=180, 7^2*(7-1) = 49 * 6 = 294.',
    companyTags: ['Amazon', 'Cognizant']
  },
  {
    id: 'tech-1',
    category: 'Technical',
    question: 'What is the time complexity to search for an element in a balanced Binary Search Tree (AVL / Red-Black Tree) with n elements in the worst case?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    explanation: 'In a self-balancing BST (like AVL or Red-Black), the maximum height is guaranteed to be O(log n). Hence searching takes O(log n) worst case.',
    companyTags: ['Amazon', 'Google', 'Microsoft']
  },
  {
    id: 'tech-2',
    category: 'Technical',
    question: 'What will be the output of the following C++ code snippet?',
    codeSnippet: '#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    int b = ++a + a++;\n    cout << b;\n    return 0;\n}',
    options: ['12 (compiler dependent / undefined behavior in C++03, well-defined in C++17)', '11', '13', '10'],
    correctIndex: 0,
    explanation: 'Modifying a variable twice between sequence points was classically undefined behavior in C++. In C++17, sequence points were replaced by sequenced-before rules, but such expressions remain anti-patterns in production. Top technical interviews test your awareness of sequence points and side effects!',
    companyTags: ['Microsoft', 'Cisco', 'Qualcomm']
  },
  {
    id: 'cs-1',
    category: 'Core CS',
    question: 'Which of the following conditions must hold simultaneously for a Deadlock to occur in an Operating System?',
    options: [
      'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
      'Mutual Exclusion and Circular Wait only',
      'Hold and Wait and Preemption only',
      'Starvation, Aging, Thrashing, Paging'
    ],
    correctIndex: 0,
    explanation: 'Coffman conditions: Deadlock can arise if and only if all four conditions hold simultaneously: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.',
    companyTags: ['Amazon', 'TCS Digital', 'Infosys DSY']
  },
  {
    id: 'cs-2',
    category: 'Core CS',
    question: 'In relational databases (SQL), which Normal Form eliminates transitive functional dependencies?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
    correctIndex: 2,
    explanation: '3NF requires that the relation is in 2NF and every non-prime attribute is non-transitively dependent on every candidate key (no X -> Y where Y is non-prime and X is not a superkey).',
    companyTags: ['Goldman Sachs', 'Oracle', 'Razorpay']
  }
];

export const interviewQuestionsList = [
  {
    id: 'iq-1',
    role: 'Software Development Engineer (SDE-1)',
    category: 'Technical / DSA',
    question: 'Explain how a HashMap handles collisions in Java or C++, and what happens to the lookup time complexity when many keys hash to the same bucket?',
    idealKeywords: ['Separate Chaining', 'Open Addressing', 'Red-Black Tree', 'O(1) average', 'O(log n) Java 8 worst-case', 'Hash collision']
  },
  {
    id: 'iq-2',
    role: 'Full Stack Developer',
    category: 'System Design / Web',
    question: 'How does JWT (JSON Web Token) authentication work, and why should you avoid storing sensitive tokens in browser localStorage?',
    idealKeywords: ['Header.Payload.Signature', 'Stateless', 'XSS vulnerability', 'httpOnly secure cookie', 'CSRF protection', 'Access vs Refresh token']
  },
  {
    id: 'iq-3',
    role: 'Campus Placement / All Roles',
    category: 'HR / Behavioral',
    question: 'Tell me about a challenging technical bug or team disagreement you faced during a college project, and how did you resolve it?',
    idealKeywords: ['STAR Method', 'Situation', 'Task', 'Action taken', 'Measurable Result', 'Debugging tools', 'Empathy & Communication']
  },
  {
    id: 'iq-4',
    role: 'Core CS / Backend',
    category: 'Operating Systems & DBMS',
    question: 'Explain the difference between a Process and a Thread, and what causes the "Thrashing" phenomenon in virtual memory?',
    idealKeywords: ['Shared memory address space', 'Context switching overhead', 'Page fault frequency', 'Working set model', 'High swap I/O']
  }
];
