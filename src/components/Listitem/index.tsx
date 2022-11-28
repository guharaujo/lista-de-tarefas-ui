import * as G from './styles';
import { Item } from '../../types/Item';
import { useState } from 'react';
import { Input } from "antd"


type Props = {
    item: Item
}

export const ListItem = ({ item }: Props) => {
    const [isChecked, setIsChecked] = useState(item.done);
    
    
    return (
        <G.Container done={isChecked}>
            <Input 
            type="checkbox" 
            checked={isChecked} 
            onChange={e => setIsChecked(e.target.checked)}
            />
            <label>{item.name}</label>
            
        </G.Container>
    )
}