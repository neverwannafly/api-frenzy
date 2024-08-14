FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 6969

RUN apk add --no-cache ca-certificates openssl

# Command to run your application
CMD ["node", "index.js"]
