import {useMemo, useState} from "react";
import {Modal} from "@mantine/core";
import DOMPurify from 'dompurify';

import "../../../../public/leaflet-custom.css";
import {useLocationStore} from "../model/LocationStore.ts";

export const DescriptionDialog: React.FC = () => {

    const selectedLocation = useLocationStore((s) => s.selectedLocation);
    if (!selectedLocation) {
        return null;
    }

    const [opened, setOpened] = useState(false);

    const htmlInfo = selectedLocation.importantinfo
        ? selectedLocation.importantinfo
            .replaceAll("\n", "<br/>")
        : undefined;

    let safeHtml = useMemo(() => {
        return DOMPurify.sanitize(selectedLocation.description, {
            ALLOWED_TAGS: [
                'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'br', 'span', 'h1', 'h2', 'h3', 'h4', 'img', 'hr'
            ],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'style']
        }) + (selectedLocation.importantinfo ? "<hr/><em style='font-size: small'>" + htmlInfo + "</em>" : "")
    }, [selectedLocation.description, selectedLocation.importantinfo]);

    return (
        <>
      <span
          className="leaflet-popup-link"
          onClick={(e) => {
              e.preventDefault();
              setOpened(true);
          }}
      >
          Details
      </span>
            <Modal
                trapFocus={false}
                zIndex={9999}
                title={selectedLocation.name}
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
                    style={{maxHeight: 640, maxWidth: 640, overflow: 'auto'}}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{__html: safeHtml}}
                />
            </Modal>
        </>
    );
}