export function getStatusText(status:string) {
  switch (status) {
    case 'PENDING':
      return 'Pengecekan';
    case 'SUCCESS':
      return 'Berhasil';
    case 'EXPIRED':
      return 'Kadaluarsa';
    case 'FAILED':
      return 'Gagal';
    default:
      return '';
  }
}

export function getStatusColor(status:string) {
  switch (status) {
    case 'PENDING':
      return '#F06D3A';
    case 'SUCCESS':
      return '#59B383';
    case 'FAILED':
      return 'red';
    default:
      return '';
  }
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
