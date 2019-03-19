const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

//The following is an example of an array of two stations.
//The observation array includes the ids of the observations belonging to the specified station
let stations = [{
    id: 1,
    description: "Reykjavik",
    lat: 64.1275,
    lon: 21.9028,
    observations: [2]
},
    {
        id: 422,
        description: "Akureyri",
        lat: 65.6856,
        lon: 18.1002,
        observations: [1]
    }
];

//The following is an example of an array of two observations.
//Note that an observation does not know which station it belongs to!
let observations = [{
    id: 1,
    date: 1551885104266,
    temp: -2.7,
    windSpeed: 2.0,
    windDir: "ese",
    prec: 0.0,
    hum: 82.0
},
    {
        id: 2,
        date: 1551885137409,
        temp: 0.6,
        windSpeed: 5.0,
        windDir: "n",
        prec: 0.0,
        hum: 50.0
    },
];

function checkIfObExists(ob) {
    for (let i = 0; i < stations.length; i++) {
        for (let j = 0; j < observations.length; j++) {
            if (stations[i].observations.includes(ob)) {
                return true;
            }
        }
    }
    return false;
}

/** ================== STATIONS ================== */
/**
 * Returns an array of all stations. For each station, only the description and the id is included in the
 * response
 */
app.get('/api/v1/stations', (req, res) => {
    let stations_exp = [];
    for (let i = 0; i < stations.length; i++) {
        stations_exp.push({
            "id": stations[i].id,
            "description": stations[i].description
        });
    }
    res.status(200).json(stations_exp);
});

/**
 * Returns all attributes of a specified station
 */
app.get('/api/v1/stations/:id', (req, res) => {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            res.status(200).json(stations[i]);
            return;
        }
    }
    res.status(404).json({
        'message': "Station with id " + req.params.id + " does not exist."
    });
});

/**
 * Creates a new station. The endpoint expects all attributes apart from the id in the request body. The
 * id shall be auto-generated. The request, if successful, shall return the new station (all attributes,
 * including id)
 */
app.post('/api/v1/stations', (req, res) => {
    if (req.body === null || req.body.description === undefined || req.body.lat === undefined || req.body.lon === undefined || req.body.observations === undefined) {
        res.status(400).json({
            "message": "Something is missing!"
        });
    } else {
        let lastid = 0;
        if (stations.length > 0) {
            lastid = stations[stations.length - 1].id;
        }
        if (Number(req.body.lat) >= -90 && Number(req.body.lat) <= 90 && Number(req.body.lon) >= -180 && Number(req.body.lon) <= 180) {
            if (checkIfObExists(Number(req.body.observations)) === false) {
                lastid++;
                let newStation = {
                    id: lastid,
                    description: req.body.description,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    observations: req.body.observations
                };
                stations.push(newStation);
                res.status(201).json(newStation);
            } else {
                res.status(400).json({
                    'message': 'Observation exists in another station'
                });
            }
        } else {
            res.status(400).json({
                'message': 'Latitudes not in range between -90 and 90 or longitudes not in range between -180 and 180'
            });
        }
    }
});

/**
 * Deletes single station and all observations that are linked to it
 */
app.delete('/api/v1/stations/:id', (req, res) => {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            let station = stations[i];
            for (let j = 0; j < observations.length; j++) {
                if (stations[i].observations.includes(observations[j].id)) {
                    observations.splice(j, 1);
                }
            }
            stations.splice(i, 1);
            res.status(201).json(station);
            return;
        }
    }
    res.status(404).json({
        'message': "Station with id " + req.params.id + " does not exist."
    });
});

/**
 * . Delete all stations
 Deletes all existing stations. The request also deletes all observations for all existing stations. The
 request, if successful, returns all deleted stations (all attributes), as well as their observations (as a
 part of the observations attribute).
 */
app.delete('/api/v1/stations', (req, res) => {
    let stationsArray = [];
    for (let i = 0; i < stations.length; i++) {
        let obs = [];
        for (let j = 0; j < observations.length; j++) {
            if (stations[i].observations.includes(observations[j].id)) {
                obs.push(observations[j]);
            }
        }
        stations[i].observations = obs;
        stationsArray.push(stations[i]);
    }
    stations = [];
    observations = [];
    res.status(201).json(stationsArray);
});

/**
 * Update a station
 (Completely) Updates an existing station. The updated data is expected in the request body (excluding the id). The request, if successful, returns all updated attributes of the station
 */
app.put('/api/v1/stations/:id', (req, res) => {
    if (req.body === null ||
        req.body.description === undefined ||
        req.body.lat === undefined ||
        req.body.lon === undefined ||
        req.body.observations === undefined) {
        res.status(400).json({
            "message": "Something is missing!"
        });
    } else {
        for (let i = 0; i < stations.length; i++) {
            if (stations[i].id === Number(req.params.id)) {
                if (Number(req.body.lat) >= -90 && Number(req.body.lat) <= 90 && Number(req.body.lon) >= -180 && Number(req.body.lon) <= 180) {
                    if (checkIfObExists(Number(req.body.observations)) === false) {
                        stations[i].description = req.body.description;
                        stations[i].lat = req.body.lat;
                        stations[i].lon = req.body.lon;
                        stations[i].observations = req.body.observations;
                        res.status(201).json(stations[i]);
                        return;
                    } else {
                        res.status(400).json({
                            'message': 'Observation exists in another station'
                        });
                        return;
                    }
                } else {
                    res.status(400).json({
                        'message': 'Latitudes not in range between -90 and 90 or longitudes not in range between -180 and 180'
                    });
                    return;
                }
            }
        }
        res.status(404).json({
            'message': "Station with id " + req.params.id + " does not exist."
        });
    }
});

/*
Read all observations for a station
Returns an array of all observations (with all attributes) for a specified station.
 */
app.get('/api/v1/stations/:id/observations', (req, res) => {
    let ret_observations = [];
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            if (stations[i].observations.length > 0) {
                for (let j = 0; j < stations[i].observations.length; j++) {
                    for (let k = 0; k < observations.length; k++) {
                        if (stations[i].observations[j] === observations[k].id) {
                            ret_observations.push(observations[k]);
                        }
                    }
                }
                res.status(200).json(ret_observations);
                return;
            } else {
                res.status(400).json({
                    "message": "This station has no observations"
                });
                return;
            }
        }
    }
    res.status(404).json({
        "message": "There exists not station with id: " + req.params.id
    });
});

/*
Read an individual observation
Returns all attributes of a specified observation (for a station).
 */
app.get('/api/v1/stations/:id/observations/:oid', (req, res) => {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            for (let j = 0; j < stations[i].observations.length; j++) {
                if (stations[i].observations[j] === Number(req.params.observationId)) {
                    for (let k = 0; k < observations.length; k++) {
                        if (stations[i].observations[j] === observations[k].id) {
                            res.status(200).json(observations[k]);
                            return;
                        }
                    }
                }
            }
            res.status(404).json({
                "message": "Observation with id: " + req.params.observationId + " does not exist"
            });
            return;
        }
    }
    res.status(404).json({
        "message": "Station with id: " + req.params.id + " does not exist."
    });
});

/*
Create a new observation
Creates a new observation for a specified station. The endpoint expects all attributes apart from the
id and the date in the request body. The id (unique, non-negative number) and the date (current date)
shall be auto-generated. The request, if successful, shall return the new observation (all attributes,
including id and date).
 */
app.post('/api/v1/stations/:id/observations', (req, res) => {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            if (req.body === null ||
                req.body.temp === undefined ||
                req.body.windSpeed === undefined ||
                req.body.windDir === undefined ||
                req.body.prec === undefined ||
                req.body.hum === undefined) {
                res.status(400).json({
                    "message": "Something is missing!"
                })
            } else {
                if (
                    typeof(req.body.temp) === "number" &&
                    typeof(req.body.windSpeed) === "number" &&
                    typeof(req.body.windDir) === "string" &&
                    typeof(req.body.prec) === "number" &&
                    typeof(req.body.hum) === "number"
                ) {
                    if (req.body.prec >= 0 && (req.body.hum >= 0 && req.body.hum <= 100)) {
                        let last_id = 0;
                        if (observations.length > 0) {
                            last_id = observations[observations.length - 1].id;
                        }
                        last_id++;
                        let ts = Math.round((new Date()).getTime() / 1000);
                        let new_obs = {
                            id: last_id,
                            date: ts,
                            temp: req.body.temp,
                            windSpeed: req.body.windSpeed,
                            windDir: req.body.windDir,
                            prec: req.body.prec,
                            hum: req.body.hum
                        };
                        stations[i].observations.push(last_id);
                        observations.push(new_obs);
                        res.status(201).json(new_obs);
                        return;
                    } else {
                        res.status(400).json({
                            'message': 'Perception not positive or hm not between 0 and 100'
                        });
                        return;
                    }
                } else {
                    res.status(400).json({
                        'message': 'Invalid parameters!'
                    });
                }
            }
        }
    }
    res.status(404).json({
        "message": "Station with id: " + req.params.id + " does not exist."
    })
});

/*
Delete an observation
Deletes an existing observation for a specified station. The request, if successful, returns all attributes of the deleted observation
 */
app.delete('/api/v1/stations/:id/observations/:observationId', (req, res) => {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            if (stations[i].observations.includes(Number(req.params.observationId))) {
                stations[i].observations.splice(stations[i].observations.indexOf(Number(req.params.observationId)), 1);
                for (let j = 0; j < observations.length; j++) {
                    if (observations[j].id === Number(req.params.observationId)) {
                        let obs = observations[j];
                        observations.splice(j, 1);
                        res.status(201).json(obs);
                        return;
                    }
                }
            } else {
                res.status(404).json({
                    'message': "Observation with id " + req.params.observationId + " does not exist in station with id " + req.params.id
                });
                return;
            }
        }
    }
    res.status(404).json({
        'message': "Station with id " + req.params.id + " does not exist"
    });
});

/*
Delete all observations for a station
Deletes all existing observations for a specified station. The request, if successful, returns all deleted
observations (all attributes).
 */
app.delete('/api/v1/stations/:id/observations', (req, res) => {
    let obs = [];
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === Number(req.params.id)) {
            for (let j = 0; j < observations.length; j++) {
                if (stations[i].observations.includes(observations[j].id)) {
                    obs.push(observations[j]);
                    observations.slice(j, 1);
                }
            }
            stations[i].observations = [];
            res.status(201).json(obs);
            return;
        }
    }
    res.status(404).json({
        'message': "Station with id " + req.params.id + " does not exist"
    });
});

/**
 * Handles incorrect url requests!
 */
app.use('*', (req, res) => {
    res.status(405).json({
        'message': 'This operation is not supported.'
    });
});

app.listen(port, () => console.log(`App listening on localhost:${port}/api/v1/`));