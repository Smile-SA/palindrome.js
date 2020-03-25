export function baseData() {
    return {
        "systemMetrics":
            {
               "metrics" : 
                    {
                    "throughput" : {
                        "label" : "CPU",
                        "unit" : "cycle / seconds",
                        "min" : 100,
                        "med" : 500,
                        "max" : 1000,
                        "current" : 390
                    },
                    "availability" : {
                        "label" : "RAM",
                        "unit" : "GB",
                        "min" : 160,
                        "med" : 640,
                        "max" : 1280,
                        "current" : 480
                    },
                    "inboundLatency" : {
                        "label" : "RAM",
                        "unit" : "GB",
                        "min" : 120,
                        "med" : 640,
                        "max" : 1280,
                        "current" : 620
                    },
                    "outboundLatency" : {
                        "label" : "HDD",
                        "unit" : "GB",
                        "min" : 102,
                        "med" : 512,
                        "max" : 1024,
                        "current" : 450
                    },
                    "ioSpeed" : {
                        "label" : "BW",
                        "unit" : "MB / seconds",
                        "min" : 102,
                        "med" : 512,
                        "max" : 1024,
                        "current" : 450
                    }
                    },
    
               "layer" : 
                    {
                    "layerBehavior" : "someting",
                    "defaultColor" : "green",
                    "publicColorOption" : "random calls function to pick a color"
                    }
                
            },
        "qoeMetrics": 
            {
                "metrics" : 
                    {
                    "cpu" : {
                        "label" : "CPU",
                        "unit" : "cycle / seconds",
                        "min" : 100,
                        "med" : 500,
                        "max" : 1000,
                        "current" : 390
                    },
                    "ram" : {
                        "label" : "RAM",
                        "unit" : "GB",
                        "min" : 160,
                        "med" : 640,
                        "max" : 1280,
                        "current" : 480
                    },
                    "ram2" : {
                        "label" : "RAM",
                        "unit" : "GB",
                        "min" : 160,
                        "med" : 640,
                        "max" : 1280,
                        "current" : 480
                    },
                    "hdd" : {
                        "label" : "HDD",
                        "unit" : "GB",
                        "min" : 102,
                        "med" : 512,
                        "max" : 1024,
                        "current" : 450
                    },
                    "bandwidth" : {
                        "label" : "BW",
                        "unit" : "MB / seconds",
                        "min" : 102,
                        "med" : 512,
                        "max" : 1024,
                        "current" : 450
                    }
                    },
    
                "layer" : 
                    {
                    "layerBehavior" : "someting",
                    "defaultColor" : "green",
                    "publicColorOption" : "random calls function to pick a color"
                    }
                
            }
    }
    
    
}