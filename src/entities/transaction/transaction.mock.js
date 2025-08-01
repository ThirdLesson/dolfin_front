import { ref } from 'vue';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function getRandomTime() {
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const min = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const sec = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hour}:${min}:${sec}`;
}

const names = [
  '외국인',
  '최예빈',
  '김철수',
  '더치페이',
  '이서준',
  '박영희',
  '홍길동',
  '동아리 정산',
  '유예원',
];
const types = ['출금', '입금', '충전'];
const amounts = [1800, 3200, 5000, 8500, 10000, 12000, 14700, 15000];
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const startDate = new Date('2025-01-01');
const endDate = new Date('2025-07-29');
const dateList = [];

let totalCount = 0;
while (totalCount < 120) {
  const date = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime()),
  );
  const formatted = formatDate(date);
  if (!dateList.find((d) => d.date === formatted)) {
    dateList.push({ date: formatted, count: 0 });
  }

  const available = 120 - totalCount;
  const maxCount = Math.min(5, available);
  const count = Math.min(Math.floor(Math.random() * 4) + 2, maxCount);

  const target = dateList.find((d) => d.date === formatted);
  target.count += count;
  totalCount += count;
}

let transactionsArr = [];
dateList.forEach(({ date, count }) => {
  for (let i = 0; i < count; i++) {
    const type = randomPick(types);
    const amount = randomPick(amounts);

    transactionsArr.push({
      date,
      time: getRandomTime(),
      name: type === '충전' ? '충전' : randomPick(names),
      type,
      amount,
    });
  }
});

transactionsArr.sort((a, b) => new Date(b.date) - new Date(a.date));

export const transactions = ref(transactionsArr);

export const mockRecentAccounts = [
  {
    accountNumber: '110251387021',
    bankType: '국민은행',
    name: '김민준',
  },
  {
    accountNumber: '302123456789',
    bankType: '농협은행',
    name: '박지민',
  },
  {
    accountNumber: '3332045123456',
    bankType: '카카오뱅크',
    name: '이정후',
  },
  {
    accountNumber: '110449912345',
    bankType: '신한은행',
    name: '최예빈',
  },
];

export const mockRecentTels = [
  {
    name: '김민준',
    phoneNumber: '010-1234-5678',
  },
  {
    name: '박지민',
    phoneNumber: '010-9876-5432',
  },
  {
    name: '이정후',
    phoneNumber: '010-1111-2222',
  },
  {
    name: '최예빈',
    phoneNumber: '010-3333-4444',
  },
];
