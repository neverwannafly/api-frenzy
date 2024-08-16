import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import MonacoEditor from '@monaco-editor/react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';
import OutputIcon from '@mui/icons-material/Output';

function PaneHeader({
  title, icon,
}) {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar variant="dense">
        {icon}
        <Typography variant="subtitle2" sx={{ ml: 1, flexGrow: 1 }}>{title}</Typography>
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
  return (
    <Box flexGrow={1} sx={{ overflow: 'hidden', display: 'flex', height: '500px' }}>
      <PanelGroup direction="horizontal" style={{ flexGrow: 1 }}>
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

        <ResizeHandle />

        <Panel minSize={30}>
          <PanelGroup direction="vertical">
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

            <ResizeHandle className="horizontal-resize-handle" />

            <Panel minSize={20}>
              <Paper elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <PaneHeader title="Output" icon={<OutputIcon fontSize="small" />} />
                <Box p={2} flexGrow={1} overflow="auto" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  <pre style={{ margin: 0 }}>{output}</pre>
                </Box>
              </Paper>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </Box>
  );
}

export default CodeEditor;
