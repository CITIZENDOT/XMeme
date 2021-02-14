#!/bin/bash

# git clone URL
# cd REPO_DIR

chmod +x install.sh
sudo ./install.sh

chmod +x server_run.sh
./server_run.sh &

chmod +x sleep.sh
./sleep.sh

# Execute GET request to /memes endpoint
curl --location --request GET 'http://localhost:8081/memes'
if [ $? -eq 0 ]; then
    echo "GET /memes Request Test Success"
else
    echo "GET /memes Request Test Failed"
fi

# Execute POST request to /memes endpoint
curl --location --request POST 'http://localhost:8081/memes' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "name": "xyz", "url": "abc.com", "caption": "This is a meme" }'
if [ $? -eq 0 ]; then
    echo "POST /memes Request Test Success"
else
    echo "POST /memes Request Test Failed"
fi

# Execute GET request to /memes endpoint
curl --location --request GET 'http://localhost:8081/memes'
if [ $? -eq 0 ]; then
    echo "POST /memes Request Test Success"
else
    echo "POST /memes Request Test Failed"
fi

# Swagger Check
curl --location --request GET 'http://localhost:8080/swagger-ui/'
if [ $? -eq 0 ]; then
    echo "Swagger UI Test Success"
else
    echo "Swagger UI Test Failed"
fi
