export const pinataConfigs = {
  apiKey: "9f40c09fcfec6d3f71bb",
  apiSecret: "19bab787e45efb84cca34e58dbf11a93c63b0aca8d98df3569d732bcbe85dc98",
  jwtToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzM2VjNTA0Ni00ZjNkLTRjZTctYWFiNC02YzViYWZkNzQxNmIiLCJlbWFpbCI6Im5pdWRpZXlpMTk5NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOWY0MGMwOWZjZmVjNmQzZjcxYmIiLCJzY29wZWRLZXlTZWNyZXQiOiIxOWJhYjc4N2U0NWVmYjg0Y2NhMzRlNThkYmYxMWE5M2M2M2IwYWNhOGQ5OGRmMzU2OWQ3MzJiY2JlODVkYzk4IiwiZXhwIjoxNzUzMDI5Nzc0fQ.woXVpk7iOIHOZ_Fgyz4lMXJsd4vPU8NIFmMhLKvMjqk",
  gateway: "https://teal-traditional-raccoon-367.mypinata.cloud/ipfs/",
};

class PinataUtils {
  private _ins: PinataUtils | null = null;

  constructor() {
    if (!this._ins) {
      this._ins = this;
    }
  }

  async pinFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataConfigs.jwtToken}`,
      },
      body: formData,
    });
    return `${pinataConfigs.gateway}${(await res.json()).IpfsHash}`;
  }

  async pinJson(metadata: Record<string, string>) {
    const data = JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: {
        name: "metadata.json",
      },
    });
    const nftMetaDataRes = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pinataConfigs.jwtToken}`,
        },
        body: data,
      }
    );
    const nftMetadataLink = (await nftMetaDataRes.json()).IpfsHash;
    return `${pinataConfigs.gateway}${nftMetadataLink}`;
  }
}

export const pinataUtils = new PinataUtils();
