'use client';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
} from '@mui/material';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

import React from 'react';

type TProps = {
    items: string[];
    name: string;
    isMultiple?: boolean;
};

function chooseColor(i: number) {
    const colors = [
        'primary',
        'secondary',
        'error',
        'inherit',
        'info',
        'success',
        'warning',
    ];
    return colors[i % colors.length] as
        | 'error'
        | 'secondary'
        | 'inherit'
        | 'primary'
        | 'info'
        | 'success'
        | 'warning';
}

export default function Select({ items, name, isMultiple = false }: TProps) {
    const [item, setItem] = React.useState<string[] | string>(
        isMultiple ? [] : ''
    );

    const handleChange = (event: SelectChangeEvent<typeof item>) => {
        const {
            target: { value },
        } = event;

        setItem(typeof value === 'string' ? value.split(',') : value);
    };
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel
                    id="demo-multiple-label"
                    sx={{ textTransform: 'capitalize' }}
                >
                    {name}
                </InputLabel>
                <MuiSelect
                    labelId="demo-multiple-label"
                    id="demo-multiple-name"
                    multiple={isMultiple}
                    value={item}
                    onChange={handleChange}
                    input={<OutlinedInput label={name} />}
                >
                    {items.map((item, i) => (
                        <MenuItem key={item} value={item}>
                            <Button variant="contained" color={chooseColor(i)}>
                                {item}
                            </Button>
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
            <br />
            <h3>{isMultiple ? 'Multiple' : 'Single'}: </h3>
            <ul>
                {isMultiple
                    ? (item as string[]).map((i) => <li key={i}>{i}</li>)
                    : item && <li>{item}</li>}
            </ul>
        </div>
    );
}
