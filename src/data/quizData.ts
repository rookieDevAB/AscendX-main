// Quiz data organized by book ID and chapter
export const quizData = {
  'en1': { // Mathematics - Class 6
    1: [ // Chapter 1: Introduction to Numbers
      {
        id: 'en1-1-1',
        question: 'Which of these is a natural number?',
        options: ['0', '1', '-1', '1/2'],
        correctAnswer: '1',
        explanation: 'Natural numbers are positive integers starting from 1.'
      },
      {
        id: 'en1-1-2',
        question: 'Which of the following is the smallest whole number?',
        options: ['0', '1', '-1', '-10'],
        correctAnswer: '0',
        explanation: 'Whole numbers include 0 and all natural numbers. The smallest whole number is 0.'
      },
      {
        id: 'en1-1-3',
        question: 'What is the predecessor of the smallest two-digit number?',
        options: ['9', '10', '99', '11'],
        correctAnswer: '9',
        explanation: 'The smallest two-digit number is 10, and its predecessor is 9.'
      }
    ],
    2: [ // Chapter 2: Fractions
      {
        id: 'en1-2-1',
        question: 'Which fraction is equivalent to 2/3?',
        options: ['4/6', '3/4', '4/5', '3/2'],
        correctAnswer: '4/6',
        explanation: 'To find an equivalent fraction, multiply both numerator and denominator by the same number. 2/3 × (2/2) = 4/6'
      },
      {
        id: 'en1-2-2',
        question: 'What type of fraction is 7/3?',
        options: ['Proper fraction', 'Improper fraction', 'Mixed fraction', 'Unit fraction'],
        correctAnswer: 'Improper fraction',
        explanation: 'An improper fraction has a numerator greater than its denominator.'
      },
      {
        id: 'en1-2-3',
        question: 'What is 3/4 + 1/4?',
        options: ['4/4', '4/8', '1', '3/8'],
        correctAnswer: '1',
        explanation: '3/4 + 1/4 = 4/4 = 1. When adding fractions with the same denominator, add the numerators.'
      }
    ]
  },
  'en5': { // Mathematics - Class 10
    1: [ // Chapter 1: Real Numbers
      {
        id: 'en5-1-1',
        question: 'The HCF of 52 and 130 is:',
        options: ['2', '13', '26', '130'],
        correctAnswer: '26',
        explanation: 'Using Euclid\'s algorithm or prime factorization, the HCF of 52 and 130 is 26.'
      },
      {
        id: 'en5-1-2',
        question: 'Every irrational number is:',
        options: ['A natural number', 'An integer', 'A real number', 'A rational number'],
        correctAnswer: 'A real number',
        explanation: 'The set of real numbers includes both rational and irrational numbers.'
      },
      {
        id: 'en5-1-3',
        question: 'The decimal expansion of a rational number is always:',
        options: ['Terminating', 'Non-terminating', 'Either terminating or non-terminating and recurring', 'Irrational'],
        correctAnswer: 'Either terminating or non-terminating and recurring',
        explanation: 'A rational number has either a terminating decimal expansion or a non-terminating recurring decimal expansion.'
      }
    ],
    2: [ // Chapter 2: Polynomials
      {
        id: 'en5-2-1',
        question: 'The number of zeros of a polynomial of degree 4 is:',
        options: ['At most 4', 'At least 4', 'Exactly 4', 'Depends on the coefficients'],
        correctAnswer: 'At most 4',
        explanation: 'A polynomial of degree n has at most n zeros.'
      },
      {
        id: 'en5-2-2',
        question: 'If α and β are the zeros of the polynomial p(x) = x² - 5x + 6, then α + β is:',
        options: ['5', '-5', '6', '-6'],
        correctAnswer: '5',
        explanation: 'For a quadratic polynomial p(x) = ax² + bx + c with zeros α and β, α + β = -b/a. Here a = 1, b = -5, so α + β = -(-5)/1 = 5.'
      },
      {
        id: 'en5-2-3',
        question: 'Which of the following is a polynomial?',
        options: ['y = 1/x', 'y = x²', 'y = 1/x²', 'y = √x'],
        correctAnswer: 'y = x²',
        explanation: 'A polynomial contains variables with whole-number exponents only. y = x² fits this definition, while the others have negative exponents or fractional exponents.'
      }
    ]
  },
  'en10': { // Science - Class 10
    1: [ // Chapter 1: Chemical Reactions and Equations
      {
        id: 'en10-1-1',
        question: 'When a magnesium ribbon burns in air, the product formed is:',
        options: ['Magnesium oxide', 'Magnesium carbonate', 'Magnesium nitride', 'Magnesium sulfide'],
        correctAnswer: 'Magnesium oxide',
        explanation: 'When magnesium burns in air, it combines with oxygen to form magnesium oxide (MgO).'
      },
      {
        id: 'en10-1-2',
        question: 'The balanced chemical equation for the reaction between hydrogen and chlorine is:',
        options: ['H + Cl → HCl', 'H₂ + Cl₂ → HCl', 'H₂ + Cl₂ → 2HCl', '2H + 2Cl → 2HCl'],
        correctAnswer: 'H₂ + Cl₂ → 2HCl',
        explanation: 'Hydrogen gas (H₂) reacts with chlorine gas (Cl₂) to form 2 molecules of hydrogen chloride (HCl).'
      },
      {
        id: 'en10-1-3',
        question: 'The reaction 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃ is an example of:',
        options: ['Combination reaction', 'Decomposition reaction', 'Single displacement reaction', 'Double displacement reaction'],
        correctAnswer: 'Decomposition reaction',
        explanation: 'A decomposition reaction is when a single compound breaks down into multiple simpler substances.'
      }
    ],
    2: [ // Chapter 2: Acids, Bases, and Salts
      {
        id: 'en10-2-1',
        question: 'The pH of a neutral solution is:',
        options: ['0', '7', '14', 'Depends on the solution'],
        correctAnswer: '7',
        explanation: 'On the pH scale, a neutral solution has a pH value of 7.'
      },
      {
        id: 'en10-2-2',
        question: 'Which of the following turns red litmus paper blue?',
        options: ['Lemon juice', 'Vinegar', 'Baking soda solution', 'Dilute sulfuric acid'],
        correctAnswer: 'Baking soda solution',
        explanation: 'Bases turn red litmus paper blue. Baking soda (sodium bicarbonate) is basic.'
      },
      {
        id: 'en10-2-3',
        question: 'The reaction between an acid and a base to form salt and water is called:',
        options: ['Hydrolysis', 'Neutralization', 'Esterification', 'Saponification'],
        correctAnswer: 'Neutralization',
        explanation: 'Neutralization is the reaction between an acid and a base to form salt and water.'
      }
    ]
  },
  'hi7': { // Hindi: विज्ञान - कक्षा 7
    1: [
      {
        id: 'hi7-1-1',
        question: 'प्रकाश का वेग कितना होता है?',
        options: ['300,000 किमी/सेकंड', '3,000 किमी/सेकंड', '30,000 किमी/सेकंड', '3,000,000 किमी/सेकंड'],
        correctAnswer: '300,000 किमी/सेकंड',
        explanation: 'प्रकाश का वेग लगभग 300,000 किमी प्रति सेकंड होता है।'
      },
      {
        id: 'hi7-1-2',
        question: 'निम्न में से कौन सा उष्मा का सुचालक है?',
        options: ['लकड़ी', 'प्लास्टिक', 'धातु', 'रबर'],
        correctAnswer: 'धातु',
        explanation: 'धातुएँ उष्मा की सुचालक होती हैं, जबकि लकड़ी, प्लास्टिक और रबर कुचालक हैं।'
      }
    ]
  }
}; 