export function benchLoadTestData() {
    return {
        "debug_0": {
            "metrics": {
                "incomingRequests": {
                    "label": "incoming requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "outgoingRequests": {
                    "label": "outgoing requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "outgoingRequests2": {
                    "label": "outgoing requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_0-layer": {
                    "label": "debug_0_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_1": {
            "metrics": {
                "cpu": {
                    "label": "CPU",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "ram": {
                    "label": "RAM",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "ram2": {
                    "label": "RAM",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "hdd": {
                    "label": "HDD",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "bandwidth": {
                    "label": "BW",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_1-layer": {
                    "label": "debug_1_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_2": {
            "metrics": {
                "throughput": {
                    "label": "throughput",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "availability": {
                    "label": "availability",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "inboundLatency": {
                    "label": "inboundLatency",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "outboundLatency": {
                    "label": "outboundLatency",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "ioSpeed": {
                    "label": "ioSpeed",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_2-layer": {
                    "label": "debug_2_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_3": {
            "metrics": {
                "directRevenues": {
                    "label": "direct revenues",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 500,
                    "max": 1000,
                    "current": 200
                },
                "externalCosts": {
                    "label": "external costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 100
                },
                "internalCosts": {
                    "label": "internal costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 200
                },
                "indirectRevenues": {
                    "label": "indirect revenues",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 350
                }
            },
            "layer": {
                "debug_3-layer": {
                    "label": "debug_3_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_4": {
            "metrics": {
                "CO2": {
                    "label": "CO2",
                    "unit": "GRAMS",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 400
                },
                "WATTS": {
                    "label": "WATT",
                    "unit": "Watts",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 400
                },
                "COSTS": {
                    "label": "MONEY",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 400
                },
                "H20": {
                    "label": "H20",
                    "unit": "litters",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 400
                },
                "H20_2": {
                    "label": "H20_2",
                    "unit": "litters",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 400
                }
            },
            "layer": {
                "debug_4-layer": {
                    "label": "debug_4_layer",
                    "layerBehavior": "something",
                    "defaultColor": "green",
                    "publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_5": {
            "metrics": {
                "sleeping": {
                    "label": "Sleeping",
                    "unit": "%",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 800
                },
                "eating": {
                    "label": "Eating",
                    "unit": "%",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 800
                },
                "drink": {
                    "label": "Drink",
                    "unit": "%",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 800
                },
                "reproducing": {
                    "label": "Reproducing",
                    "unit": "%",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 800
                },
                "Dress": {
                    "label": "Dress",
                    "unit": "%",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 800
                }
            },
            "layer": {
                "debug_5-layer": {
                    "label": "debug_5_layer",
                    "layerBehavior": "something",
                    "defaultColor": "green",
                    "publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_6": {
            "metrics": {
                "metric1": {
                    "label": "metric1 revenues",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 500,
                    "max": 1000,
                    "current": 450
                },
                "metric2": {
                    "label": "metric1 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 100
                },
                "metric3": {
                    "label": "metric3 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 200
                },
                "metric4": {
                    "label": "metric4 revenues",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 350
                }
            },
            "layer": {
                "debug_6-layer": {
                    "label": "debug_6_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_7": {
            "metrics": {
                "Another1": {
                    "label": "Another1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "Another2": {
                    "label": "Another2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "Another3": {
                    "label": "Another3",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "Another4": {
                    "label": "Another4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "Another5": {
                    "label": "Another5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_7-layer": {
                    "label": "debug_7_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_8": {
            "metrics": {
                "Third1": {
                    "label": "Third1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "Third2": {
                    "label": "Third2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "Third5": {
                    "label": "Third5",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "Third3": {
                    "label": "Third3",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "Third4": {
                    "label": "Third4",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_8-layer": {
                    "label": "debug_8_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_9": {
            "metrics": {
                "Third1": {
                    "label": "Third1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "Third2": {
                    "label": "Third2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "Third5": {
                    "label": "Third5",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "Third3": {
                    "label": "Third3",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "Third4": {
                    "label": "Third4",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_9-layer": {
                    "label": "debug_9_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_10": {
            "metrics": {
                "forthExample1": {
                    "label": "forthExample1 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "forthExample2": {
                    "label": "forthExample2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "forthExample3": {
                    "label": "forthExample3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_10-layer": {
                    "label": "debug_10_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_11": {
            "metrics": {
                "fifthEXample1": {
                    "label": "fifthEXample1 revenues",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 500,
                    "max": 1000,
                    "current": 200
                },
                "fifthEXample2": {
                    "label": "fifthEXample2 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 100
                },
                "fifthEXample3": {
                    "label": "fifthEXample3 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 200
                },
                "fifthEXample4": {
                    "label": "fifthEXample4 revenues",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 350
                }
            },
            "layer": {
                "debug_11-layer": {
                    "label": "debug_11_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_12": {
            "metrics": {
                "sithExample1": {
                    "label": "sithExample1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "sithExample2": {
                    "label": "sithExample2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "sithExample3": {
                    "label": "sithExample3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "sithExample4": {
                    "label": "sithExample4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "sithExample5": {
                    "label": "sithExample5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_12-layer": {
                    "label": "debug_12_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_13": {
            "metrics": {
                "seventhExample1": {
                    "label": "seventhExample1 revenues",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 500,
                    "max": 1000,
                    "current": 450
                },
                "seventhExample2": {
                    "label": "seventhExample2 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 100
                },
                "seventhExample3": {
                    "label": "seventhExample3 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 200
                },
                "seventhExample4": {
                    "label": "seventhExample4 revenues",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 350
                }
            },
            "layer": {
                "debug_13-layer": {
                    "label": "debug_13_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_14": {
            "metrics": {
                "eighthExample1": {
                    "label": "eighthExample1 revenues",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 500,
                    "max": 1000,
                    "current": 450
                },
                "eighthExample2": {
                    "label": "eighthExample2 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 100
                },
                "eighthExample3": {
                    "label": "eighthExample3 costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 200
                },
                "eighthExample4": {
                    "label": "eighthExample4 revenues",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 350
                }
            },
            "layer": {
                "debug_14-layer": {
                    "label": "debug_14_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_15": {
            "metrics": {
                "tenthExample1": {
                    "label": "tenthExample1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "tenthExample2": {
                    "label": "tenthExample2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "tenthExample3": {
                    "label": "tenthExample3",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "tenthExample4": {
                    "label": "tenthExample4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "tenthExample5": {
                    "label": "tenthExample5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_15-layer": {
                    "label": "debug_15_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_16": {
            "metrics": {
                "eleven1": {
                    "label": "eleven2",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "eleven3": {
                    "label": "eleven3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "eleven5": {
                    "label": "eleven5",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "eleven6": {
                    "label": "eleven6",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "eleven7": {
                    "label": "eleven7",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_16-layer": {
                    "label": "debug_16_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_17": {
            "metrics": {
                "Twelve1": {
                    "label": "Twelve1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "Twelve2": {
                    "label": "Twelve2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "Twelve3": {
                    "label": "Twelve3",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "Twelve4": {
                    "label": "Twelve4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "Twelve5": {
                    "label": "Twelve5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_17-layer": {
                    "label": "debug_17_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_18": {
            "metrics": {
                "thirteen1": {
                    "label": "thirteen requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "thirteen2": {
                    "label": "thirteen2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "thirteen3": {
                    "label": "thirteen3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_18-layer": {
                    "label": "debug_18_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_19": {
            "metrics": {
                "fourteen": {
                    "label": "fourteen requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "fourteen2": {
                    "label": "fourteen2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "fourteen3": {
                    "label": "fourteen3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_19-layer": {
                    "label": "debug_19_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_20": {
            "metrics": {
                "fifteen1": {
                    "label": "fifteen1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "fifteen2": {
                    "label": "fifteen2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "fifteen3": {
                    "label": "fifteen3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "fifteen4": {
                    "label": "fifteen4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "fifteen5": {
                    "label": "fifteen5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_20-layer": {
                    "label": "debug_20_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_21": {
            "metrics": {
                "sixteen1": {
                    "label": "sixteen1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "sixteen2": {
                    "label": "sixteen2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "sixteen3": {
                    "label": "sixteen3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "sixteen4": {
                    "label": "sixteen4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "sixteen5": {
                    "label": "sixteen5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_21-layer": {
                    "label": "debug_21_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_22": {
            "metrics": {
                "seventeen1": {
                    "label": "seventeen1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "seventeen2": {
                    "label": "seventeen2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "seventeen3": {
                    "label": "seventeen3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "seventeen4": {
                    "label": "seventeen4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "seventeen5": {
                    "label": "seventeen5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_22-layer": {
                    "label": "debug_22_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_23": {
            "metrics": {
                "eighteen1": {
                    "label": "eighteen1 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "eighteen2": {
                    "label": "eighteen2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "eighteen3": {
                    "label": "eighteen3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_23-layer": {
                    "label": "debug_23_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_24": {
            "metrics": {
                "nineteen1": {
                    "label": "nineteen requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "nineteen2": {
                    "label": "nineteen2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "nineteen3": {
                    "label": "nineteen3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_24-layer": {
                    "label": "debug_24_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_25": {
            "metrics": {
                "twenty1": {
                    "label": "twenty requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "twenty2": {
                    "label": "twenty2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "twenty3": {
                    "label": "twenty3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_25-layer": {
                    "label": "debug_25_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_26": {
            "metrics": {
                "incomingtwentyone": {
                    "label": "incoming twentyone",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "outgoingtwentyone": {
                    "label": "outgoing twentyone",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "outgoingtwentyone2": {
                    "label": "outgoing twentyone",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_26-layer": {
                    "label": "debug_26_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_27": {
            "metrics": {
                "incomingtwentytwo": {
                    "label": "incoming twentytwo",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "outgoingtwentytwo": {
                    "label": "outgoing twentytwo",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "outgoingtwentytwo2": {
                    "label": "outgoing twentytwo",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_27-layer": {
                    "label": "debug_27_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_28": {
            "metrics": {
                "twentythreedirectRevenues": {
                    "label": "twentythree direct revenues",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 500,
                    "max": 1000,
                    "current": 200
                },
                "twentythreeexternalCosts": {
                    "label": "twentythree external costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 100
                },
                "internalCosts": {
                    "label": "twentythree internal costs",
                    "unit": "K€ / hour",
                    "min": 10,
                    "med": 640,
                    "max": 1080,
                    "current": 200
                },
                "twentythree indirectRevenues": {
                    "label": "twentythree indirect revenues",
                    "unit": "K€ / hour",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 350
                }
            },
            "layer": {
                "debug_28-layer": {
                    "label": "debug_28_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_29": {
            "metrics": {
                "twentyfour1": {
                    "label": "twentyfour requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 500
                },
                "twentyfour2": {
                    "label": "twentyfour2 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                },
                "twentyfour3": {
                    "label": "twentyfour3 requests",
                    "unit": "thousands / second",
                    "min": 0,
                    "med": 500,
                    "max": 1000,
                    "current": 250
                }
            },
            "layer": {
                "debug_29-layer": {
                    "label": "debug_29_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_30": {
            "metrics": {
                "twentyfive1": {
                    "label": "twentyfive1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "twentyfive2": {
                    "label": "twentyfive2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "twentyfive3": {
                    "label": "twentyfive3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "twentyfive4": {
                    "label": "twentyfive4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "twentyfive5": {
                    "label": "twentyfive5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_30-layer": {
                    "label": "debug_30_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_31": {
            "metrics": {
                "twentysix1": {
                    "label": "twentysix1",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 550
                },
                "twentysix2": {
                    "label": "twentysix2",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "twentysix3": {
                    "label": "twentysix3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "twentysix4": {
                    "label": "twentysix4",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                },
                "twentysix5": {
                    "label": "twentysix5",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 200
                }
            },
            "layer": {
                "debug_31-layer": {
                    "label": "debug_31_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_32": {
            "metrics": {
                "twentyseven1": {
                    "label": "twentyseven2",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "twentyseven3": {
                    "label": "twentyseven3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "twentyseven5": {
                    "label": "twentyseven5",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "twentyseven6": {
                    "label": "twentyseven6",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "twentyseven7": {
                    "label": "twentyseven7",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_32-layer": {
                    "label": "debug_32_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_33": {
            "metrics": {
                "twentyeight1": {
                    "label": "twentyeight2",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "twentyeight3": {
                    "label": "twentyeight3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "twentyeight5": {
                    "label": "twentyeight5",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "twentyeight6": {
                    "label": "twentyeight6",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "twentyeight7": {
                    "label": "twentyeight7",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_33-layer": {
                    "label": "debug_33_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        },
        "debug_34": {
            "metrics": {
                "twentynine1": {
                    "label": "twentynine2",
                    "unit": "cycles / second",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 700
                },
                "twentynine3": {
                    "label": "twentynine3",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 800
                },
                "twentynine5": {
                    "label": "twentynine5",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 900
                },
                "twentynine6": {
                    "label": "twentynine6",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 950
                },
                "twentynine7": {
                    "label": "twentynine7",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1000
                }
            },
            "layer": {
                "debug_34-layer": {
                    "label": "debug_34_layer",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        }
    }
}
  