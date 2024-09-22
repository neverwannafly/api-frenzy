# Base image: Alpine
FROM alpine:latest

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV USER=vscode
ENV PASSWORD=password

# Install necessary dependencies
RUN apk update && apk add --no-cache \
    bash \
    sudo \
    vim \
    git \
    nodejs \
    npm \
    python3 \
    py3-pip \
    curl \
    openssh \
    gcc \
    g++ \
    libstdc++ \
    make \
    linux-headers \
    zsh \
    shadow \
    krb5-dev

# Install code-server using npm
RUN npm install -g code-server --unsafe-perm

# Create a user for VS Code server
RUN adduser -D $USER && \
    echo "$USER:$PASSWORD" | chpasswd && \
    echo "$USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set up the working directory
WORKDIR /home/$USER

RUN mkdir workspace
RUN chown -R vscode:vscode /home/$USER/workspace

# Expose the port for code-server
EXPOSE 8443

# Copy the startup script
COPY startup.sh /usr/local/bin/startup.sh
RUN chmod +x /usr/local/bin/startup.sh

# Start code-server when the container is launched
CMD ["/usr/local/bin/startup.sh"]
