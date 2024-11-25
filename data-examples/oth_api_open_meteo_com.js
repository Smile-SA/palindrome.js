export function openMeteo() {
    return {
        metrics: [
            {
                id: 'paris-id',
                label: 'Paris',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 48.856614,
                    longitude: 2.3522219
                }
            },
            {
                id: 'nice-id',
                label: 'Nice',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 43.7101728,
                    longitude: 7.2619532
                }
            },
            {
                id: 'marseille-id',
                label: 'Marseille',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 43.296482,
                    longitude: 3.057256000000052
                }
            },
            {
                id: 'lille-id',
                label: 'Lille',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 50.62925,
                    longitude: 7.2619532
                }
            },
            {
                id: 'bordeaux-id',
                label: 'Bordeaux',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 44.837789,
                    longitude: -0.5791799999999512
                }
            },
            {
                id: 'tunis-id',
                label: 'Tunis',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 36.8064948,
                    longitude: 10.181531599999971
                }
            },
            {
                id: 'sousse-id',
                label: 'Sousse',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 35.825603,
                    longitude: 10.608394999999973
                }
            },
            {
                id: 'monastir-id',
                label: 'Monastir',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 35.783333,
                    longitude: 10.833333000000039
                }
            },
            {
                id: 'djerba-id',
                label: 'Djerba',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 33.807598,
                    longitude: 10.845147
                }
            },
            {
                id: 'elkef-id',
                label: 'El Kef',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 36.182222,
                    longitude: 8.714721999999938
                }
            },
            {
                id: 'newyork-id',
                label: 'New York',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 40.7127837,
                    longitude: -74.0059413
                }
            },
            {
                id: 'chicago-id',
                label: 'Chicago',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 41.8781136,
                    longitude: -87.6297982
                }
            },
            {
                id: 'losangeles-id',
                label: 'Los Angeles',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 34.0522342,
                    longitude: -118.2436849
                }
            },
            {
                id: 'philadelphia-id',
                label: 'Philadelphia',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 39.9525839,
                    longitude: -75.1652215
                }
            },
            {
                id: 'dallas-id',
                label: 'Dallas',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 32.7766642,
                    longitude: -96.7969879
                }
            },
            {
                id: 'shanghai-id',
                label: 'Shanghai',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 31.230416,
                    longitude: 121.473701
                }
            },
            {
                id: 'wuhan-id',
                label: 'Wuhan',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 30.593099,
                    longitude: 114.305393
                }
            },
            {
                id: 'hongkong-id',
                label: 'Hong Kong',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 22.396428,
                    longitude: 114.10949700000003
                }
            },
            {
                id: 'shenzhen-id',
                label: 'Shenzhen',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 22.543096,
                    longitude: 114.057865
                }
            },
            {
                id: 'beijing-id',
                label: 'Beijing',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: 39.904211,
                    longitude: 116.407395
                }
            },
            {
                id: 'sydney-id',
                label: 'Sydney',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: -33.8688,
                    longitude: 151.2093
                }
            },
            {
                id: 'melbourne-id',
                label: 'Melbourne',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: -37.814107,
                    longitude: 144.96328
                }
            },
            {
                id: 'brisbane-id',
                label: 'Brisbane',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: -27.4710107,
                    longitude: 153.02344889999995
                }
            },
            {
                id: 'adelaide-id',
                label: 'Adelaide',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: -34.92862119999999,
                    longitude: 138.5999594
                }
            },
            {
                id: 'darwin-id',
                label: 'Darwin',
                value: {
                    jmesPath: 'current_weather.temperature'
                },
                unit: {
                    jmesPath: 'current_weather_units.temperature'
                },
                ranges: ['daily.temperature_2m_min[0]', null, 'daily.temperature_2m_max[0]'],
                dataProviderId: 'api.open-meteo.com',
                dataProviderParams: {
                    latitude: -12.4628271,
                    longitude: 130.8417772000000
                }
            }
        ],
        layers: [
            {
                name: "France",
                metrics: [
                    'paris-id',
                    'nice-id',
                    'marseille-id',
                    'lille-id',
                    'bordeaux-id'
                ]
            },
            {
                name: "Tunisia",
                metrics: [
                    'tunis-id',
                    'sousse-id',
                    'monastir-id',
                    'djerba-id',
                    'elkef-id'
                ]
            },
            {
                name: "USA",
                metrics: [
                    'newyork-id',
                    'chicago-id',
                    'losangeles-id',
                    'philadelphia-id',
                    'dallas-id'
                ]
            },
            {
                name: "China",
                metrics: [
                    'shanghai-id',
                    'wuhan-id',
                    'hongkong-id',
                    'shenzhen-id',
                    'beijing-id'
                ]
            },
            {
                name: "Australia",
                metrics: [
                    'sydney-id',
                    'melbourne-id',
                    'brisbane-id',
                    'adelaide-id',
                    'darwin-id'
                ]
            }
        ],
        dataProviders: [
            {
                id: 'api.open-meteo.com',
                type: 'apiEndpoint',
                url: 'https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1',
            }

        ],
        options: {
            liveData: false,
            remoteDataFetchPace: 1_000 * 60
        }
    }
}
