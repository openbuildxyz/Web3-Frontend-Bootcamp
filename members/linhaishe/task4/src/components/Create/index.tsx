import React, { useState } from 'react';
import './index.scss';

const Create = ({ nft, setIsLoading }: any) => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState<any>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const metadata = JSON.stringify({
          name: 'Filename test',
        });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({
          cidVersion: 0,
        });
        formData.append('pinataOptions', options);

        const res = await fetch(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.PINATA_JWT}`,
              'Access-Control-Allow-Origin': '*',
            },
            body: formData,
          }
        );
        const resData = await res.json();
        setImage(`${process.env.GATE_WAY}/ipfs/${resData?.IpfsHash}`);
      } catch (error) {
        console.log('ipfs image upload error: ', error);
      }
    }
  };

  const mintNFT = async () => {
    try {
      if (!price || !name || !description) {
        alert('不能为空');
        return;
      }

      setIsLoading(true);

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // pinataContent: { image, price, name, description },
          pinataContent: {
            price,
            name,
            description,
            createTime: new Date().getTime(),
          },
          pinataMetadata: { name: 'crate token' },
        }),
      };

      const res = await fetch(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        options
      );
      const resData = await res.json();
      const uri = `${process.env.GATE_WAY}/ipfs/${resData?.IpfsHash}`;
      // mint nft
      const transaction = await nft.safeMint(uri);
      await transaction.wait();
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='create-form-wrap'>
      <div className='create-form-input-wrap'>
        {/* <input type='file' name='file' onChange={uploadToIPFS} /> */}
        {/* <img
          src='https://cdn-icons-png.flaticon.com/512/12068/12068350.png'
          className='create-nft-img'
        /> */}
        <input
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Name'
          value={name}
        />
        <input
          type='text'
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          value={description}
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type='number'
          placeholder='Price in erc20 token'
          value={price}
        />
        <div className='nft-action-btn' onClick={mintNFT}>
          Create NFT
        </div>
      </div>
    </div>
  );
};

export default Create;
