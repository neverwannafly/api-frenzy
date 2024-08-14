import React, { useCallback, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import MonacoEditor from '@monaco-editor/react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';
import OutputIcon from '@mui/icons-material/Output';

function PaneHeader({
  title, icon, onClose,
}) {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar variant="dense">
        {icon}
        <Typography variant="subtitle2" sx={{ ml: 1, flexGrow: 1 }}>{title}</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

function ResizeHandle({ className = '' }) {
  return <PanelResizeHandle className={`${className} resize-handle`} />;
}

const editorSettings = {
  fontSize: 14,
  minimap: { enabled: true },
  lineNumbers: 'on',
  wordWrap: 'off',
};

function CodeEditor({
  code, setCode, params, setParams, output,
}) {
  const [leftPaneVisible, setLeftPaneVisible] = useState(true);
  const [rightPaneVisible, setRightPaneVisible] = useState(true);
  const [bottomPaneVisible, setBottomPaneVisible] = useState(true);

  const handleLeftPanelClose = useCallback(() => {
    setLeftPaneVisible(false);
  }, []);
  const handleRightPanelClose = useCallback(() => {
    setRightPaneVisible(false);
  }, []);
  const handleBottomPanelClose = useCallback(() => {
    setBottomPaneVisible(false);
  }, []);

  return (
    <Box flexGrow={1} sx={{ overflow: 'hidden', display: 'flex', height: '500px' }}>
      <PanelGroup direction="horizontal" style={{ flexGrow: 1 }}>
        {leftPaneVisible ? (
          <Panel defaultSize={50} minSize={30}>
            <Paper
              elevation={0}
              sx={{
                height: '100%', display: 'flex', flexDirection: 'column', borderRight: 1, borderColor: 'divider',
              }}
            >
              <PaneHeader
                title="Code Editor"
                icon={<CodeIcon fontSize="small" />}
                onClose={handleLeftPanelClose}
              />

              <Box flexGrow={1}>
                <MonacoEditor
                  height="100%"
                  language="javascript"
                  value={code}
                  onChange={setCode}
                  options={editorSettings}
                />
              </Box>
            </Paper>
          </Panel>
        ) : (
          <Panel minSize={10}>
            <Button fullWidth sx={{ height: '100%' }} onClick={() => setLeftPaneVisible(true)}>
              <CodeIcon sx={{ mr: 1 }} />
              {' '}
              Show Code Editor
            </Button>
          </Panel>
        )}

        <ResizeHandle />

        <Panel minSize={30}>
          <PanelGroup direction="vertical">
            {rightPaneVisible ? (
              <Panel defaultSize={60} minSize={30}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%', display: 'flex', flexDirection: 'column', borderBottom: 1, borderColor: 'divider',
                  }}
                >
                  <PaneHeader
                    title="Parameters"
                    icon={<SettingsIcon fontSize="small" />}
                    onClose={handleRightPanelClose}
                  />
                  <Box flexGrow={1}>
                    <MonacoEditor
                      height="100%"
                      language="json"
                      value={params}
                      onChange={setParams}
                      options={editorSettings}
                    />
                  </Box>
                </Paper>
              </Panel>
            ) : (
              <Panel minSize={10}>
                <Button fullWidth sx={{ height: '100%' }} onClick={() => setRightPaneVisible(true)}>
                  <SettingsIcon sx={{ mr: 1 }} />
                  {' '}
                  Show Parameters
                </Button>
              </Panel>
            )}

            <ResizeHandle className="horizontal-resize-handle" />

            {bottomPaneVisible ? (
              <Panel minSize={20}>
                <Paper elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <PaneHeader title="Output" icon={<OutputIcon fontSize="small" />} onClose={() => setBottomPaneVisible(false)} />
                  <Box p={2} flexGrow={1} overflow="auto" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    <pre style={{ margin: 0 }}>{output}</pre>
                  </Box>
                </Paper>
              </Panel>
            ) : (
              <Panel minSize={10}>
                <Button fullWidth sx={{ height: '100%' }} onClick={handleBottomPanelClose}>
                  <OutputIcon sx={{ mr: 1 }} />
                  {' '}
                  Show Output
                </Button>
              </Panel>
            )}
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </Box>
  );
}

export default CodeEditor;
