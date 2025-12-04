import React from 'react'
import {createRoot} from 'react-dom/client'
import {MantineProvider} from '@mantine/core';
import './index.css'
import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {Notifications} from "@mantine/notifications";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider defaultColorScheme="light">
            <Notifications position="top-right" />
            <RouterProvider router={router}/>
        </MantineProvider>
    </React.StrictMode>,
)
