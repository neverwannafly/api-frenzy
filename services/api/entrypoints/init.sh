#!/bin/sh

# Check if the number of arguments is correct
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <command>"
  echo "Commands: rails, sidekiq, migration"
  exit 1
fi

# Assign the argument to a variable
COMMAND="$1"

# Execute the corresponding command based on the parameter
case "$COMMAND" in
  rails)
    echo "Starting Rails server..."
    /bin/sh ./entrypoints/rails-init.sh
    ;;
  sidekiq)
    echo "Starting Sidekiq..."
    /bin/sh ./entrypoints/sidekiq-init.sh
    ;;
  migration)
    echo "Running database migrations..."
    /bin/sh ./entrypoints/migration-init.sh
    ;;
  *)
    echo "Unknown command: $COMMAND"
    echo "Valid commands are: rails, sidekiq, migration"
    exit 1
    ;;
esac

# Exit with success status
exit 0
