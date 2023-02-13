node client_fuzz.js localhost 8000 100 GET


#This runs slow dos attack
docker run --network="host" 5d3491d7da9f

#This run fuzzing http2
docker run --network="host" 77a30d88f1b6


#This runs flooding requests

docker run --network="host" 25d44c67cea0