const ERROR_MESSAGES = {
  1: 'Error: General error occurred.',
  2: 'Error: Misuse of shell built-ins.',
  126: 'Error: Command invoked cannot execute.',
  127: 'Error: Command not found.',
  128: 'Error: Invalid exit argument.',
  130: 'Error: Script terminated by Control-C.',
  137: 'Error: Process killed due to insufficient resources.',
  139: 'Error: Segmentation fault occurred.',
  143: 'Error: Script terminated by signal (SIGTERM).',
  255: 'Error: Exit status out of range or unexpected error occurred.',
};

module.exports = { ERROR_MESSAGES };
