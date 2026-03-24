import React from 'react';
import { Handle, Position } from 'reactflow';

const InputNode = ({ data }) => {
    return (
        <div className="bg-white border-2 border-blue-500 rounded-lg shadow-lg p-4 w-300">

            <div className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Text Input Node
            </div>
            <textarea
                id="text-area-in"
                value={data.value}
                onChange={data.onChange}
                placeholder="Ask Questions"

                className="nodrag border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 px-3 py-2 w-full resize-none whitespace-pre-wrap wrap-break-words"
            />

            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 bg-blue-500 border-2 border-white"
            />
        </div>
    );
};

export default InputNode;