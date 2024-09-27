# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /var/task

# Install essential global libraries/tools
RUN npm install -g \
  typescript \
  nodemon \
  eslint \
  prettier \
  pm2

# Install commonly used libraries globally
RUN npm install -g \
  express \
  axios \
  lodash \
  async \
  mongoose \
  sequelize \
  pg \
  mysql \
  redis \
  socket.io \
  passport \
  moment \
  joi \
  jest \
  mocha \
  chai \
  winston \
  uuid \
  aws-sdk \
  serverless-http \
  express-validator \
  bcrypt \
  jsonwebtoken \
  multer \
  sharp \
  formidable \
  cors \
  dotenv \
  xml2js \
  cheerio \
  async \
  node-fetch \
  bluebird \
  rimraf \
  morgan \
  compression \
  chess.js \
  @anthropic-ai/bedrock-sdk

ENV NODE_ENV=production
ENV PATH="/node_modules/.bin:$PATH"

COPY index.js ./

CMD ["node", "index.js"]
