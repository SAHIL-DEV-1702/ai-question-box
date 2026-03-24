import React from 'react';
import { Handle, Position } from 'reactflow';

const ResultNode = ({ data }) => {
    return (
        <div className="bg-gray-50 border-2 border-green-500 rounded-lg shadow-md p-4 w-300 h-60 ">

            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 bg-green-500 border-2 border-white"
            />

            <div className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Result Node
            </div>


            <pre className="bg-white p-3 border border-green-200  rounded w-full h-40 text-sm text-gray-800 whitespace-pre-wrap wrap-break-words overflow-auto">

                {data.loading ? (
                    <span className="text-blue-500 animate-pulse">Loading...</span>
                ) : data.label ? (
                    data.label
                ) : (
                    <span className="text-gray-400 italic">Waiting for Run Flow...</span>
                )}

            </pre>

        </div>
    );
};

export default ResultNode;