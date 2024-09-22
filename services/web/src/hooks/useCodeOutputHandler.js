import { useCallback, useState } from 'react';

import { testCode } from '@app/api/functions';

const useCodeOutputHandler = (slug, params) => {
  const [output, setOutput] = useState({});
  const [outputLoading, setOutputLoading] = useState();

  const handleCodeRun = useCallback(async () => {
    setOutputLoading(true);
    const jsonParams = (() => { try { return JSON.parse(params); } catch (e) { return {}; } })();
    const response = await testCode(slug, { params: jsonParams });
    const contentType = response.headers.get('content-type');

    let outputData;

    if (contentType && contentType.includes('application/json')) {
      outputData = JSON.stringify(await response.json(), null, 2);
    } else {
      outputData = await response.text();
    }

    setOutput({ contentType, data: outputData });
    setOutputLoading(false);
  }, [params, slug]);

  const toggleRawOutput = useCallback(() => {
    const newParams = (() => { try { return JSON.parse(params); } catch (e) { return {}; } })();
    newParams.enableRawOutput = !newParams.enableRawOutput;
    return JSON.stringify(newParams, null, 4);
  }, [params]);

  return {
    output, outputLoading, handleCodeRun, toggleRawOutput,
  };
};

export default useCodeOutputHandler;
