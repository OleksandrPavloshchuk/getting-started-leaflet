import {notifications} from "@mantine/notifications";
import type {ModalBaseStylesNames} from "@mantine/core";
import type {CSSProperties} from "react";

export const SEARCH_CENTER_COLOR = '#33cc99';

export const getDropdownItemStyle = (isSelected: () => boolean) => {
    const selected = isSelected();
    return {
        color: selected ? 'white' : undefined,
        backgroundColor: selected ? 'var(--mantine-color-blue-filled)' : undefined
    };
};

export const getDialogStyles = (left: string = '-20%') => {
    return {
        root: {
            borderRadius: 6
        }
        ,
        title: {
            fontSize: "small",
            fontWeight:
                500,
        }
        ,
        header: {
            paddingTop: '4px',
            paddingBottom:
                '4px',
            minHeight:
                'auto',
            backgroundColor:
                'lightgrey'

        }
        ,
        content: {
            top: '20%',
            left: left,
            transform:
                'translate(-50%, -50%)',
            position:
                'absolute',
            backgroundColor:
                'white'
        }
    } as Partial<Record<ModalBaseStylesNames, CSSProperties>>
};

export const getRadiusStr = (r: number) => r < 1000 ? `${r} m` : `${r / 1000} km`;

export const getLocationStr = (l: L.LatLng) => `(${l.lat.toFixed(3)}, ${l.lng.toFixed(3)})`;

export const normalizeName = (src: string, limit: number) => {
    let res = src.substring(0, limit);
    if (src.length > limit) {
        res = res + "...";
    }
    return res;
}

export const notifyError = (title: string, text: string) => notify(title, text, 'red');
export const notifyWarning = (title: string, text: string) => notify(title, text, 'yellow');
export const notifySuccess = (title: string, text: string) => notify(title, text, 'green');

const notify = (title: string, text: string, color: string) => {
    notifications.show({
        autoClose: 2000,
        title: title,
        message: text,
        color: color
    })
};