import { dcBasicConfigurationThreeLayers } from "./dc_BasicConfigurationThreeLayers"
import { dcEnergeticEfficiency } from "./dc_EnergeticEfficiency"
import { dcFullMap } from "./dc_FullMap"
import { debugTwoLayersFourPoints } from "./debug_TwoLayersFourPoints"
import { debugTwoLayersThreePoints } from "./debug_TwoLayersThreePoints"

export const staticMultiplePlaindromes = () => {
    return {
        grid: [
            {
                title: 'Full Map',
                data: dcFullMap(),
                w: '25%',
                h: '50%',
                x:0,
                y:0
            },
            {
                title: 'Energetic Efficency',
                data: dcEnergeticEfficiency(),
                w: '50%',
                h: '50%',
                x:1,
                y:0,
            },
            {
                title: 'Debug Two Layers Three Points',
                data: debugTwoLayersThreePoints(),
                w: '25%',
                x:3,
                y:0
            },
            {
                title: 'Basic Configuration Three Layers',
                data: dcBasicConfigurationThreeLayers(),
                w: '50%',
                h: '50%',
                x:0,
                y:2
            },
            {
                title: 'Debug Two Layers Four Points',
                data: debugTwoLayersFourPoints(),
                w: '50%',
                h: '50%',
                x:2,
                y:2
            }
        ]
    }
}