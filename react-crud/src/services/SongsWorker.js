import { Sheet } from "../mapping/Sheet";
import _ from "lodash";
import axios from 'axios';


const base_url = '';


export const getSheets = () => {
    return new Promise(async (resolve, reject) => {
        await axios(base_url + "/sheet")
            .then(({ status, data }) => {
                resolve(data.map((sheet) => {
                    return new Sheet(sheet);
                }));
            })
            .catch((err) => {
                console.log(`Error at getting sheets`);
                reject(err);
            })
    })
}

export const getSheet = (sheet_id) => {
    return new Promise(async (resolve, reject) => {
        await axios(base_url + "/sheet/" + sheet_id)
            .then(({ status, data }) => {
                resolve(new Sheet(data))
            })
            .catch((err) => {
                console.log(`Error at getting sheet ${sheet_id}`);
                reject(err);
            })
    })
}
