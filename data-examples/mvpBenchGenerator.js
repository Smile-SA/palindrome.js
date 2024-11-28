import { heavyRemoteSchema } from "./remote_heavyRemoteData"
import { remoteSchema } from "./remote_remoteData"

const remoteData = {
    title: 'Remote Data',
    data: remoteSchema(),
    h: '100%',
    w: '50%',
    x:0,
    y:0,
    useCaseOptions: {
        isRemoteData: true
    }
}

const heavyRemoteData = {
    title: 'Heavy Remote Data',
    data: heavyRemoteSchema(),
    h: '100%',
    w: '50%',
    x:2,
    y:0,
    useCaseOptions: {
        isRemoteData: true
    }
}

export const benchGenerator = (n) => {
    const result = {
        grid: []
    };
    
    for(let i = 0; i < n; i++) {
        const remoteData_ = JSON.parse(JSON.stringify(remoteData));
        const heavyRemoteData_ = JSON.parse(JSON.stringify(heavyRemoteData));
        remoteData_.y = i * 4;
        heavyRemoteData_.y = i * 4;
        remoteData_.x = 0;
        heavyRemoteData_.x = 2;
        result.grid.push(remoteData_);
        result.grid.push(heavyRemoteData_);
    }
    return result;
}

