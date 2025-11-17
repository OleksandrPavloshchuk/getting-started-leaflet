export const getDropdownItemStyle = (isSelected: () => boolean) => {
    const selected = isSelected();
    return {
        color: selected ? 'white' : undefined,
        backgroundColor: selected ? 'var(--mantine-color-blue-filled)' : undefined
    };
};

export const getRadiusStr = (r: number) => r < 1000 ? `${r} m` : `${r / 1000} km`;

export const getLocationStr = (l: L.LatLng) => `(${l.lat.toFixed(3)}, ${l.lng.toFixed(3)})`;