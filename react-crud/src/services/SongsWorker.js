import { Sheet } from "../mapping/Sheet";
import _ from "lodash";
import axios from 'axios';

import catalog from "../data/catalog";

const base_url = '';



export const getSheets = () => {
    return new Promise(async (resolve, reject) => {
        await new Promise(r => setTimeout(r, 0))
            .then(() => {
                //resolve(catalog);
                resolve(catalog.map((sheet) => {
                    return new Sheet(sheet);
                }))
            })
            .catch((err) => {
                console.log(`Error at getting sheets`, err);
                reject(err);
            });

        // await axios(base_url + "/sheet")
        //     .then(({ status, data }) => {
        //         resolve(data.map((sheet) => {
        //             return new Sheet(sheet);
        //         }));
        //     })
        //     .catch((err) => {
        //         console.log(`Error at getting sheets`);
        //         reject(err);
        //     })
    })
}

export const getSheet = (sheet_id) => {
    return new Promise(async (resolve, reject) => {

        await axios(base_url + "/sheet/" + sheet_id)
            .then(({ status, data }) => {
                //resolve(new Sheet(data))
                resolve(new Sheet(catalog[0]));
            })
            .catch((err) => {
                //console.log(`Error at getting sheet ${sheet_id}`);
                //reject(err);
                resolve(new Sheet(catalog[0]));
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
        await new Promise(r => setTimeout(r, 0))
            .then(() => {
                //resolve(catalog);
                resolve(catalog.map((sheet) => {
                    return new Sheet(sheet);
                }))
            })
            .catch((err) => {
                console.log(`Error at getting sheets`, err);
                reject(err);
            });
        /*
        await axios.delete(base_url + "/sheet", sheet_ids)
            .then(({ status, data }) => {
                resolve(data);
            }).
            catch((err) => {
                console.log(`Error at deleting sheet ${sheet_id}`);
            })*/
    })
}

export const createSheet = (sheet_data) => {
    return new Promise(async (resolve, reject) => {
        console.log("Creating at songworker: ", new Sheet(sheet_data));
        await new Promise(r => setTimeout(r, 3000))
            .then(() => {
                //resolve(catalog);
                resolve(catalog.map((sheet) => {
                    return new Sheet(sheet);
                }))
            })
            .catch((err) => {
                console.log(`Error at getting sheets`, err);
                reject(err);
            });

        // await axios.post(base_url + "/sheet", new Sheet(sheet_data))
        //     .then(({ status, data }) => {
        //         resolve(data);
        //     }).
        //     catch((err) => {
        //         console.log(`Error at creating sheet: `, sheet_data);
        //         reject(err);
        //     })
    })
}

export const updateSheet = (sheet_data, sheet_id) => {
    return new Promise(async (resolve, reject) => {
        console.log("Updating at songworker: ", sheet_id, new Sheet(sheet_data));

        await new Promise(r => setTimeout(r, 3000))
            .then(() => {
                //resolve(catalog);
                resolve(catalog.map((sheet) => {
                    return new Sheet(sheet);
                }))
            })
            .catch((err) => {
                console.log(`Error at getting sheets`, err);
                reject(err);
            });

        // await axios.post(base_url + "/sheet", new Sheet(sheet_data))
        //     .then(({ status, data }) => {
        //         resolve(data);
        //     }).
        //     catch((err) => {
        //         console.log(`Error at updating sheet: `, sheet_data);
        //         console.log(err);
        //         reject(err);
        //     });
    })
}
