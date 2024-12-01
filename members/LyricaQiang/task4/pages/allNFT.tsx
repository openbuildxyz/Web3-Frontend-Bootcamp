import { useState } from 'react';

const AllNFT = ({list}) => {
    const [tokenId, setTokenId] = useState('')
 
    const columns = [
        {
            title: '上架者地址',
            key: 'seller',
        },
        {
            title: 'Token ID',
            key: 'tokenId',
        },
        {
            title: '价格',
            key: 'price',
        }
    ]

    return (
        <div className="all-nft padding">
            <div className="table-header">
                {
                    columns.map(item => {
                        return (<div className="header-td" key={item.key}>{ item.title}</div>)
                    })
                }
            </div>
            <div className="table-main">
                {
                       
                    list.length > 0 ? list.map(item => (
                        <div className="main-td" key={item.tokenId}>
                            <div className="td">{item.seller}</div>
                            <div className="td">{item.tokenId}</div>
                            <div className="td">{item.price}</div>
                        </div>
                    )) : ''
                }
            </div>
        </div>
    );
};

export default AllNFT;