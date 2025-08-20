export const VIEWS = {
  DASHBOARD: 'dashboard',
  GRADES: 'grades',
  STUDENTS: 'students'
};

export const TERMS = ['Term 1', 'Term 2', 'Term 3'];

export const initialGrades = [
  { id: 1, name: 'Grade 1', level: 'Junior Secondary', students: [] },
  { id: 2, name: 'Grade 2', level: 'Junior Secondary', students: [] },
  { id: 3, name: 'Grade 3', level: 'Junior Secondary', students: [] },
  { id: 4, name: 'Grade 4', level: 'Junior Secondary', students: [] },
  { id: 5, name: 'Grade 5', level: 'Junior Secondary', students: [] },
  { id: 6, name: 'Grade 6', level: 'Junior Secondary', students: [] },
  { id: 7, name: 'Grade 7', level: 'Senior Secondary', students: [] },
  { id: 8, name: 'Grade 8', level: 'Senior Secondary', students: [] },
  { id: 9, name: 'Grade 9', level: 'Senior Secondary', students: [] },
];

export const sampleStudents = [
  {
    id: 'G1-001',
    name: 'John Doe',
    grade: 1,
    rollNumber: 'G1-001',
    fee: 5000,
    paid: 5000,
    due: 0,
    status: 'paid',
    lastPayment: '2025-01-15',
    payments: [
      { id: 'PAY001', amount: 5000, date: '2025-01-15', term: 'Term 1', receiptNumber: 'RCP001' }
    ]
  },
  {
    id: 'G1-002',
    name: 'Jane Smith',
    grade: 1,
    rollNumber: 'G1-002',
    fee: 5000,
    paid: 5000,
    due: 0,
    status: 'paid',
    lastPayment: '2025-08-18',
    payments: [
      { id: 'PAY002', amount: 5000, date: '2025-08-18', term: 'Term 1', receiptNumber: 'RCP002' }
    ]
  },
  {
    id: 'G1-003',
    name: 'Mike Johnson',
    grade: 1,
    rollNumber: 'G1-003',
    fee: 5000,
    paid: 0,
    due: 5000,
    status: 'unpaid',
    lastPayment: null,
    payments: []
  },
  {
    id: 'G2-001',
    name: 'Sarah Wilson',
    grade: 2,
    rollNumber: 'G2-001',
    fee: 5500,
    paid: 2750,
    due: 2750,
    status: 'partially-paid',
    lastPayment: '2025-07-10',
    payments: [
      { id: 'PAY003', amount: 2750, date: '2025-07-10', term: 'Term 1', receiptNumber: 'RCP003' }
    ]
  }
];