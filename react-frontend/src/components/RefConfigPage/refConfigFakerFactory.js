import { faker } from "@faker-js/faker";
export default (
  count,
  useridIds,
  chataiidIds,
  configidIds,
  saveduseridIds,
  chatAiIdIds,
  bankIdIds,
  facilityidIds,
) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      chatAiId: chatAiIdIds[i % chatAiIdIds.length],
    };
    data = [...data, fake];
  }
  return data;
};
