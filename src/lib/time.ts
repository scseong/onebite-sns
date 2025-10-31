export function formatTimeAgo(time: Date | string | number) {
  const startDate = new Date(time);
  const endDate = new Date();
  const msDiff = endDate.getTime() - startDate.getTime();

  const SECONDS = 1000;
  const MINUTES = SECONDS * 60;
  const HOURS = MINUTES * 60;
  const DAYS = HOURS * 24;
  const WEEKS = DAYS * 7;

  const secondDiff = Math.floor(msDiff / SECONDS);
  if (secondDiff < 60) return "방금 전";

  const minuteDiff = Math.floor(msDiff / MINUTES);
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  const hourDiff = Math.floor(msDiff / HOURS);
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(msDiff / DAYS);
  if (dayDiff < 7) return `${dayDiff}일 전`;

  const weekDiff = Math.floor(msDiff / WEEKS);
  if (dayDiff < 30) return `${weekDiff}주 전`;

  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();

  if (year !== endDate.getFullYear()) return `${year}년 ${month}월 ${day}일`;
}
