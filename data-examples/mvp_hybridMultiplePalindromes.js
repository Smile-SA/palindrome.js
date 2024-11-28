import { dcBasicConfigurationThreeLayers } from "./dc_BasicConfigurationThreeLayers"
import { dcEnergeticEfficiency } from "./dc_EnergeticEfficiency"
import { dcFullMap } from "./dc_FullMap"
import { debugTwoLayersFourPoints } from "./debug_TwoLayersFourPoints"
import { debugTwoLayersThreePoints } from "./debug_TwoLayersThreePoints"
import { heavyRemoteSchema } from "./remote_heavyRemoteData"
import { remoteSchema } from "./remote_remoteData"

export const hybridMultiplePalindromes = () => {
    return {
        grid: [
            {
                title: 'Full Map',
                data: dcFullMap(),
                w: '25%',
                h: '50%',
                x:0,
                y:3
            },
            {
                title: 'Remote Data',
                data: remoteSchema(),
                w: '50%',
                h: '75%',
                x:1,
                y:0,
                useCaseOptions: {
                    isRemoteData: true
                }
            },
            {
                title: 'Energetic Efficiency',
                data: dcEnergeticEfficiency(),
                w: '25%',
                x:3,
                y:0
            },
            {
                title: 'Heavy Remote Data',
                data: heavyRemoteSchema(),
                w: '25%',
                h: '75%',
                x:0,
                y:0,
                useCaseOptions: {
                    isRemoteData: true
                }
            },
            {
                title: 'Basic Configuration Three Layers',
                data: dcBasicConfigurationThreeLayers(),
                w: '25%',
                h: '50%',
                x:1,
                y:3
            },
            {
                title: 'Debug Two Layers Four Points',
                data: debugTwoLayersFourPoints(),
                w: '25%',
                h: '50%',
                x:2,
                y:3
            },
            {
                title: 'Debug Two Layers Three Points',
                data: debugTwoLayersThreePoints(),
                w: '25%',
                h: '75%',
                x:3,
                y:2
            }
        ]
    }
}