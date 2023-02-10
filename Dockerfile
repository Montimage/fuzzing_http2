# Use an official image as the base image
FROM node:19.4.0

# Set the working directory in the container
WORKDIR /app

# Copy the client files into the container
COPY /src .

# Set environment variables to allow the client to connect to the server running on localhost at port 8000
ENV port=8000
ENV ip=localhost
ENV reqNumber=100
ENV httpMethod=GET
ENV API_HOST=host.docker.internal
# Start the client
CMD node client_fuzz.js ${ip} ${port} ${reqNumber} ${httpMethod}
