import { Sheet } from "../mapping/Sheet";
import _ from "lodash";
import axios from 'axios';

import catalog from "../data/catalog";

const base_url = 'https://lzg6a5ir6i.execute-api.us-east-1.amazonaws.com/dev/api';

axios.defaults.headers.common['Authorization'] = getToken();

function getToken() {
    return localStorage.getItem('jwt');
}
export const getSheets = () => {
    return new Promise(async (resolve, reject) => {
        await axios.get(base_url + "/")
            .then(({ status, data }) => {
                resolve(data.map((sheet) => {
                    return new Sheet(sheet);
                }));
            })
            .catch((err) => {
                console.log(`Error at getting sheets`, err.response);
                reject(err.response.status);
            })
    })
}

export const getSheet = (sheet_id) => {
    return new Promise(async (resolve, reject) => {

        await axios(base_url + "?id=" + sheet_id)
            .then(({ status, data }) => {
                resolve(new Sheet(data))
                //resolve(new Sheet(catalog[0]));
            })
            .catch((err) => {
                console.log(`Error at getting sheet ${sheet_id}`);
                //reject(err);
                //resolve(new Sheet(catalog[0]));
                reject(err.response.status);
            })
    })
}

export const addSheet = (sheet_data) => {
    console.log("Adding sheet: ", sheet_data);
    return new Promise(async (resolve, reject) => {

    })
}

export const deleteSheet = (sheet_ids) => {
    console.log("Deleting sheets: ", sheet_ids);
    return new Promise(async (resolve, reject) => {
        // await new Promise(r => setTimeout(r, 0))
        //     .then(() => {
        //         //resolve(catalog);
        //         resolve(catalog.map((sheet) => {
        //             return new Sheet(sheet);
        //         }))
        //     })
        //     .catch((err) => {
        //         console.log(`Error at getting sheets`, err);
        //         reject(err);
        //     });

        await axios.delete(base_url + "/", { params: sheet_ids })
            .then(({ status, data }) => {
                resolve(data);
            }).
            catch((err) => {
                console.log(`Error at deleting sheet ${sheet_ids}`, err.response);
                reject(err.response.status);
            })
    })
}

export const createSheet = (sheet_data) => {
    return new Promise(async (resolve, reject) => {
        console.log("Creating at songworker: ", new Sheet(sheet_data));
        // await new Promise(r => setTimeout(r, 3000))
        //     .then(() => {
        //         //resolve(catalog);
        //         resolve(catalog.map((sheet) => {
        //             return new Sheet(sheet);
        //         }))
        //     })
        //     .catch((err) => {
        //         console.log(`Error at getting sheets`, err);
        //         reject(err);
        //     });

        await axios.post(base_url + "/", new Sheet(sheet_data))
            .then(({ status, data }) => {
                resolve(data);
            }).
            catch((err) => {
                console.log(`Error at creating sheet: `, sheet_data, err);
                reject(err.response.status);
            })
    })
}

export const updateSheet = (sheet_data, sheet_id) => {
    return new Promise(async (resolve, reject) => {
        console.log("Updating at songworker: ", sheet_id, new Sheet({ ...sheet_data, id: sheet_id }));

        // await new Promise(r => setTimeout(r, 3000))
        //     .then(() => {
        //         //resolve(catalog);
        //         resolve(catalog.map((sheet) => {
        //             return new Sheet(sheet);
        //         }))
        //     })
        //     .catch((err) => {
        //         console.log(`Error at getting sheets`, err);
        //         reject(err);
        //     });

        await axios.patch(base_url + "/", new Sheet({ ...sheet_data, id: sheet_id }))
            .then(({ status, data }) => {
                resolve(data);
            }).
            catch((err) => {
                console.log(`Error at updating sheet: `, sheet_data);
                console.log(err.response);
                reject(err.response.status);
            });
    })
}
