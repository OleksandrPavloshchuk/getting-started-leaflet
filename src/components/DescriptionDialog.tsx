import {useMemo, useState} from "react";
import {Modal} from "@mantine/core";
import DOMPurify from 'dompurify';
import type {Location} from "../data/locations.ts";

type Props = {
    location: Location
}

export const DescriptionDialog: React.FC<Props> = ({location}) => {
    const [opened, setOpened] = useState(false);

    const safeHtml = useMemo(() => {
        return DOMPurify.sanitize(location.description, {
            ALLOWED_TAGS: [
                'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'br', 'span', 'h1', 'h2', 'h3', 'h4', 'img'
            ],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'style']
        });
    }, [location.description]);

    return (
        <>
      <span
          style={{cursor: 'pointer', textDecoration: 'underline'}}
          onClick={(e) => {
              e.preventDefault();
              setOpened(true);
          }}
      >
          Show description
      </span>
            <Modal
                zIndex={9999}
                title={location.name}
                opened={opened}
                onClose={() => setOpened(false)}
                withinPortal={true}
                styles={{
                    root: {
                        borderRadius: 6
                    },
                    title: {
                        fontWeight: 'bold'
                    },
                    header: {
                        backgroundColor: 'lightgrey'
                    },
                    content: {
                        top: '20%',
                        left: '-20%',
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute',
                        backgroundColor: 'white'
                    }
                }}
            >
                <div
                    style={{maxHeight: 480, maxWidth: 640, overflow: 'auto'}}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{__html: safeHtml}}
                />
            </Modal>
        </>
    );
}