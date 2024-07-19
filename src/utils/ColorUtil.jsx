export function getQuestionBgColorByIndex(index) {
  const colors = ["#0EA5E9", "#EC4546", "#F67419", "#22C461"];
  const n = colors.length;
  const newIndex = ((index % n) + n) % n;
  return colors[newIndex];
}

export function getQuestionBgBorderColorByIndex(index) {
  const colors = ["#075985", "#991B1B", "#9A3412", "#166534"];
  const n = colors.length;
  const newIndex = ((index % n) + n) % n;
  return colors[newIndex];
}
