const categoryColors = {
  food: '#d97706',
  housing: '#2563eb',
  utilities: '#0891b2',
  transport: '#7c3aed',
  entertainment: '#db2777',
  salary: '#16a34a',
  other: '#6b7280',
}

export function colorForCategory(category) {
  return categoryColors[category] || categoryColors.other
}
