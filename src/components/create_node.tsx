import { Dispatch, SetStateAction, useMemo } from "react";
import { useReactFlow, type XYPosition } from '@xyflow/react';

export function CreateNode(
    { nextId, setNextId, pos, closeWindow }: {
        nextId: number,
        setNextId: Dispatch<SetStateAction<number>>,
        pos: XYPosition,
        closeWindow: () => void,
    }
) {
    const dragNodeTypes = useMemo(() => ['event-node', 'choice-node', 'if-node', 'else-node', 'content-node', 'ifstmt-node', 'case-node'], []);
    const { screenToFlowPosition, setNodes } = useReactFlow();

    return (
        <div
            className="nopan nodrag"
            style={
                {
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    width: 200,
                    height: 500,
                    color: 'black',
                    background: 'rgba(176, 216, 232, 1)',
                    border: '2px dashed black',
                    borderRadius: '10px',
                    position: 'absolute',
                    zIndex: 10,
                }
            }
        >
            <div style={
                {
                    padding: '10px',
                    margin: '10px 0',
                    color: 'black',
                    background: '#f34718',
                }
            } onClick={() => { closeWindow() }}>
                取消
            </div>
            {dragNodeTypes.map((type) => (
                <div
                    key={type}
                    style={{
                        padding: '10px',
                        margin: '10px 0',
                        background: 'rgba(251, 251, 251, 1)',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                    }}
                    onClick={() => {
                        const position = screenToFlowPosition(pos);
                        const newNode = {
                            id: `${type}-create-${nextId}`,
                            type: "flow-node",
                            position,
                            data: { label: `${type}` },
                        }
                        setNodes((nds) => nds.concat(newNode))
                        setNextId(nextId + 1);
                        closeWindow()
                    }}
                >
                    {type}
                </div>
            ))}
        </div>)
}