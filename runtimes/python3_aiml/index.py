import os
import sys
import time
import subprocess
import json
import resource

# Decode environment variables
user_code = os.getenv('USER_CODE', '')
user_params = json.loads(os.getenv('USER_PARAMS', '{}'))
timeout = int(os.getenv('TIMEOUT', '5000')) / 1000

# Path to a temporary file for user code execution
script_file = '/tmp/user_code.py'

# Write user code to a temporary file
with open(script_file, 'w') as f:
  f.write(user_code)

def limit_resources():
  # Limit memory usage (e.g., 100MB)
  resource.setrlimit(resource.RLIMIT_AS, (100 * 1024 * 1024, 100 * 1024 * 1024))
  # Limit CPU time (e.g., 10 seconds)
  resource.setrlimit(resource.RLIMIT_CPU, (10, 10))

# Execute the user code
start_time = time.time()
proc = subprocess.Popen(
  [sys.executable, script_file],
  stdin=subprocess.PIPE,
  stdout=subprocess.PIPE,
  stderr=subprocess.PIPE,
  env={**os.environ, **user_params},
  # preexec_fn=limit_resources,
)

try:
  stdout, stderr = proc.communicate(timeout=timeout)
  end_time = time.time()

  execution_time_ms = (end_time - start_time) * 1000
  cpu_usage = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime * 1000  # User CPU time in ms

  result = {
      'result': stdout.decode('utf-8').strip(),
      'stats': {
          'time': f'{execution_time_ms:.2f}',
          'cpu': f'{cpu_usage:.2f}',
          'memory': f'{resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss / 1024:.2f}'  # Memory in MB
      },
      'logs': stderr.decode('utf-8').strip(),
  }

  print('[API-FRENZY] Result:', json.dumps(result))

except subprocess.TimeoutExpired:
  proc.kill()
  print(f'Execution timed out after {timeout} seconds')
  sys.exit(1)

except Exception as e:
  proc.kill()
  print(f'Error during execution: {str(e)}')
  sys.exit(1)
finally:
  # Clean up the script file
  if os.path.exists(script_file):
    os.remove(script_file)
