import axios from "axios";

const JWT = import.meta.env.VITE_JWT;

export const pinFileToIPFS = async ({ fileName, file }) => {
    try {
        const formData = new FormData();

        formData.append("file", file);

        const pinataMetadata = JSON.stringify({
            name: fileName,
        });
        formData.append("pinataMetadata", pinataMetadata);
        
        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);

        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${JWT}`,
            },
            body: formData,
        });
        const resData = await res.json();
        console.log("pinFileToIPFS: ", resData)
        return resData
    } catch (error) {
        console.log(error);
    }
}

export const pinJSONToIPFS = async ({ json }) => {
    try {
        const data = JSON.stringify({
            pinataContent: json,
            pinataMetadata: {
                name: "metadata.json"
            }
        })
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
            },
            body: data,
        });
        const resData = await res.json();
        console.log("pinJSONToIPFS: ", resData);
        return resData
    } catch (error) {
        console.log(error);
    }
};

export const fetchFile = async ({cid}) => {
    const gateway = import.meta.env.VITE_GATEWAY;
    const url = `${gateway}${cid}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.log(error)
    }
}