import React from 'react'
import {createRoot} from 'react-dom/client'
import {MantineProvider} from '@mantine/core';
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider defaultColorScheme="light">
            <App/>
        </MantineProvider>
    </React.StrictMode>,
)
