export const getDropdownItemStyle = (isSelected: () => boolean) => {
    const selected = isSelected();
    return {
        color: selected ? 'white' : undefined,
        backgroundColor: selected ? 'var(--mantine-color-blue-filled)' : undefined
    };
};