import { LayerName } from './layers';

type BackgroundType =
    '-1' | // None
    '0' | // Map
    '1' | // Satelite
    '2' | // Combined
    '3'; // 2.5D streets and buildings

type LayersMode =
    1 | // Add/remove layers UI
    2 | // Add/remove layers UI + legend
    3 | // Legend
    4; // None

type Govmap = {
    /**
     * https://api.govmap.gov.il/#create-map
     */
    createMap: (elementId: string, options: {
        onClick?: () => void;
        onError?: () => void;
        onPan?: () => void;
        onLoad?: () => void;
        background?: BackgroundType;
        center?: {
            x: number;
            y: number;
        };
        visibleLayers?: LayerName[];
        showXY?: boolean;
        level?: number;
        token: string;
        identifyOnClick?: boolean;
        layers?: LayerName[];
        bgButton?: boolean;
        zoomButtons?: boolean;
        isEmbeddedToggle?: boolean;
        layersMode?: LayersMode;
    }) => void;
};

// Actual implementation is brought in through CDN like so:
// <script src="https://www.govmap.gov.il/govmap/api/govmap.api.js"></script>
// It requires non-slim jQuery which is not included
declare const govmap: Govmap;

export default govmap;
