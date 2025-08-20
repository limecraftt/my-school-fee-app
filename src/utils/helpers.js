// Helper functions for the school fee management app

export const generateReceiptNumber = () => {
  return 'RCP' + Date.now().toString().slice(-6);
};

export const formatCurrency = (amount) => {
  return `KSh ${amount.toLocaleString()}`;
};

export const getStudentStats = (students) => {
  const paid = students.filter(s => s.status === 'paid').length;
  const unpaid = students.filter(s => s.status === 'unpaid').length;
  const partial = students.filter(s => s.status === 'partially-paid').length;
  return { paid, unpaid, partial };
};

export const getTotalStats = (students) => {
  const totalStudents = students.length;
  const totalCollected = students.reduce((sum, student) => sum + student.paid, 0);
  const totalOutstanding = students.reduce((sum, student) => sum + student.due, 0);
  
  return { totalStudents, totalCollected, totalOutstanding };
};

export const generateRollNumber = (gradeId, existingStudents) => {
  const gradeStudents = existingStudents.filter(student => student.grade === gradeId);
  return `G${gradeId}-${String(gradeStudents.length + 1).padStart(3, '0')}`;
};

export const filterStudents = (students, searchTerm, statusFilter) => {
  let filtered = students;

  if (searchTerm) {
    filtered = filtered.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (statusFilter !== 'All Students') {
    const statusMap = {
      'Paid': 'paid',
      'Unpaid': 'unpaid',
      'Partially Paid': 'partially-paid'
    };
    filtered = filtered.filter(student => student.status === statusMap[statusFilter]);
  }

  return filtered;
};

export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};