
import { faker } from "@faker-js/faker";
export default (count,useridIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {

        };
        data = [...data, fake];
    }
    return data;
};
