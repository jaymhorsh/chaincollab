export const getDateRange = (filter: 'all' | 'month' | 'year') => {
  const now = new Date(); // Current date and time
  const to = now.getTime(); // Current timestamp

  let from: number;

  switch (filter) {
    case 'month':
      // Last 30 days
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).getTime();
      break;
    case 'year':
      // Last 365 days
      from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).getTime();
      break;
    case 'all':
    default:
      // No range (fetch all data)
      from = 0; // Use 0 to indicate no filtering
      break;
  }

  return { from, to };
};
