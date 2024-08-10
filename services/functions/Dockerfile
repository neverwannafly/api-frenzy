FROM node:18

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 6969

# Command to run your application
CMD ["node", "index.js"]
