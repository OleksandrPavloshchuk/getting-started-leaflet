import React, {useState} from "react";
import type {Location} from "../data/locations.ts";

type Props = {
    locations: Location[],
    onSelect: (loc: Location | null) => void
}

export const LocationsDropdown: React.FC<Props> = ({locations, onSelect}) => {
    const [text, setText] = useState('');
    const [filtered, setFiltered] = useState<Location[]>(locations);

    // Simple filter by name:
    const handleChange = (v: string) => {
        setText(v);
        // Rough match:
        const f = filtered.filter((l: Location) =>
            l.name.toLowerCase().includes(v.toLowerCase())
        );
        setFiltered(f);
        // Exact match, if found:
        const exact = filtered.find((l: Location) =>
            l.name.toLowerCase() === v.toLowerCase()
        );
        if (exact) {
            setFiltered([exact]);
        }
    };
    return (
        <div style={{width: 320}}>
            <input
                type="text"
                placeholder="Start typing location..."
                value={text}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                onChange={(e) => handleChange(e.target.value)}
            />
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '6px 0',
                maxHeight: 160,
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: 4
            }}>
                {filtered.map((l) =>
                    <li
                        key={l.id}
                        onClick={() => {
                            setText(l.name);
                            onSelect(l);
                            setFiltered([l]);
                        }}
                    >{l.name}</li>)
                }
                {filtered.length === 0 && <li>No matches</li>}
            </ul>
        </div>
    );
}