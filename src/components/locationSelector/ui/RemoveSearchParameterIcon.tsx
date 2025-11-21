import {ActionIcon, CloseIcon} from "@mantine/core";

type Props = {
    onClick: () => void
};

export const RemoveSearchParameterIcon: React.FC<Props> = ({onClick}) => {
    return <ActionIcon
        onClick={onClick}
        variant="light"
        size="xs"
        title="Remove this parameter from filter">
        <CloseIcon/>
    </ActionIcon>
}