export const calculateDataByMonth = (data, labels, dateField) => {
    return labels.map(month => {
      const count = data.filter(item => {
        const date = new Date(item[dateField]);
        const yearNow = new Date().getFullYear();
        return date.getMonth() === labels.indexOf(month) && date.getFullYear() === yearNow;
      }).length;
      return count;
    });
};