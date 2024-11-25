import { heavyRemoteSchema } from "./heavy_remote_data"
import { remoteSchema } from "./remote_data"

export const benchmarkRemoteData = () => {
    return {
        grid: [
            {
                title: 'Remote Data',
                data: remoteSchema(),
                h: '100%',
                w: '50%',
                x:0,
                y:0,
                useCaseOptions: {
                    isRemoteData: true
                }
            },
            {
                title: 'Heavy Remote Data',
                data: heavyRemoteSchema(),
                h: '100%',
                w: '50%',
                x:2,
                y:0,
                useCaseOptions: {
                    isRemoteData: true
                }
            },
            {
                title: 'Remote Data',
                data: remoteSchema(),
                h: '100%',
                w: '50%',
                x:0,
                y:4,
                useCaseOptions: {
                    isRemoteData: true
                }
            },
            {
                title: 'Heavy Remote Data',
                data: heavyRemoteSchema(),
                h: '100%',
                w: '50%',
                x:2,
                y:4,
                useCaseOptions: {
                    isRemoteData: true
                }
            }
        ]
    }
}