import React, { useState, useEffect, useRef } from 'react';
import {Items, Item} from './index.d';

const useLocalItems= ():[Items, React.Dispatch<React.SetStateAction<Items>>] => {
    const [items, setItems] = useState<Item[]>([]);
    const didMount = useRef<boolean>();
    useEffect(()=>{
        const items = localStorage.getItem('items');
        if(items){
            setItems(JSON.parse(items));
        }
    }, []);

    useEffect(()=>{
        if(didMount.current){
            localStorage.setItem('items', JSON.stringify(items));
        } else {
            didMount.current = true;
        }
    }, [items]);

    return [items, setItems];
}

export default useLocalItems;