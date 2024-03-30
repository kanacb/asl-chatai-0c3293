
import { faker } from "@faker-js/faker";
export default (count,useridIds,chataiidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
chataiid: chataiidIds[i % chataiidIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
