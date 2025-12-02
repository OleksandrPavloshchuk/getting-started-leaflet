import {notifications} from "@mantine/notifications";

export const getDropdownItemStyle = (isSelected: () => boolean) => {
    const selected = isSelected();
    return {
        color: selected ? 'white' : undefined,
        backgroundColor: selected ? 'var(--mantine-color-blue-filled)' : undefined
    };
};

export const getRadiusStr = (r: number) => r < 1000 ? `${r} m` : `${r / 1000} km`;

export const getLocationStr = (l: L.LatLng) => `(${l.lat.toFixed(3)}, ${l.lng.toFixed(3)})`;

export const normalizeName =(src: string, limit: number) => {
    let res = src.substring(0, limit);
    if (src.length>limit) {
        res = res + "...";
    }
    return res;
}

export const notifyError = (title: string, text: string) => notify(title, text, 'red');
export const notifyWarning = (title: string, text: string) => notify(title, text, 'yellow');
export const notifyOK = (title: string, text: string) => notify(title, text, 'green');

const notify = (title: string, text: string, color: string)=> {
    notifications.show({
        autoClose: 2000,
        title: title,
        message: text,
        color: color
    })
};