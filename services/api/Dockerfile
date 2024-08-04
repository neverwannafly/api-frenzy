FROM ruby:3.0.0-alpine

RUN apk add --update --no-cache \
    binutils-gold \
    build-base \
    curl \
    file \
    g++ \
    gcc \
    git \
    less \
    libstdc++ \
    libffi-dev \
    libc-dev \ 
    linux-headers \
    libxml2-dev \
    libxslt-dev \
    libgcrypt-dev \
    make \
    netcat-openbsd \
    nodejs \
    openssl \
    pkgconfig \
    postgresql-dev \
    python3 \
    tzdata \
    yarn

RUN mkdir -p /app

# set working direction
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v 2.2.3
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle check || bundle install

COPY . ./ 

EXPOSE 8080

RUN chmod +x ./entrypoints/rails-init.sh
RUN chmod +x ./entrypoints/sidekiq-init.sh

ENTRYPOINT ["entrypoints/rails-init.sh"]
