import {useEffect, useState} from "react";
import {useMapEvent} from "react-leaflet";

export const MapHint = ({timeout = 5000}) => {
    const [hidden, setHidden] = useState(false);

    useMapEvent( "click", () => {
            setHidden(true);
        }
    );

    // Hide by timeout, if no click:
    useEffect(() => {
        const t = setTimeout(()=>setHidden(true), timeout);
        return () => clearTimeout(t);
    }, [timeout]);

    if (hidden) {
        return null;
    }

    const style: React.CSSProperties = {
        position: "absolute",
        right: 8,
        top: 8,
        zIndex: 1000,
        fontSize: 14,
        padding: "6px 10px",
        background: "rgba(0,0,0,0.35)",
        color: "white",
        borderRadius: 6,
        opacity: 0.8,
        // important: do not block clicks on map
        pointerEvents: "none",
        // for smouthness
        transition: "opacity 400ms ease",
    };

    return <div style={style}>Left-click the map to set search center</div>;
};