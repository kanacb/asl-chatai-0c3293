
import { faker } from "@faker-js/faker";
export default (count,useridIds,chataiidIds,configidIds,saveduseridIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
chataiid: chataiidIds[i % chataiidIds.length],
saveduserid: saveduseridIds[i % saveduseridIds.length],
configid: configidIds[i % configidIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
