import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';

import InputNode from './components/InputNode';
import ResultNode from './components/ResultNode';

const nodeTypes = {
  customInput: InputNode,
  customResult: ResultNode,
};

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const onInputChange = useCallback((evt) => {
    setPrompt(evt.target.value);
  }, []);

  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      type: 'customInput',
      data: { value: '', onChange: onInputChange },
      position: { x: 250, y: 100 },
    },
    {
      id: 'node-2',
      type: 'customResult',
      data: { label: '' },
      position: { x: 250, y: 500 },
    },
  ]);

  const [edges, setEdges] = useState([
    { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true }
  ]);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'node-1') return { ...node, data: { ...node.data, value: prompt } };
        return node;
      })
    );
  }, [prompt]);

  const handleRunFlow = async () => {
    if (!prompt) return alert("Type something in the node!");

    setLoading(true); 
    try {
      const res = await axios.post('http://localhost:8000/api/askAi', { prompt });
      const answer = res.data.response;
      setAiResponse(answer);
      setNodes((nds) => nds.map((node) => {
        if (node.id === 'node-2') return { ...node, data: { label: answer } };
        return node;
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8000/api/savePrompt', { prompt, response: aiResponse });
      alert("Saved!");
    } catch (err) { console.error(err); }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50 overflow-hidden">

      <div className="p-4 bg-white border-b flex justify-between items-center z-10 shadow-sm">
        <h1 className="font-bold text-blue-600 text-lg">FutureBlink Task</h1>
        <div className="flex gap-2">

          {/* Run Flow Button */}
          <button
            onClick={handleRunFlow}
            className={`px-4 py-2 rounded active:scale-95 ${loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            disabled={loading} // ✅ Disabled while loading
          >
            {loading ? "Processing..." : "Run Flow"}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded border ${!aiResponse
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-green-600 text-green-600 hover:bg-green-50"
              }`}
            disabled={!aiResponse} // ✅ Only enabled after AI response
          >
            Save to DB
          </button>

        </div>
      </div>

      <div className="grow w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant="dots" gap={22} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}