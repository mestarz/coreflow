import { useState, Dispatch, SetStateAction, useMemo, type PointerEvent } from "react";
import { useReactFlow, type XYPosition } from '@xyflow/react';

export function CreateNode(
    { nextId, setNextId }: {
        nextId: number,
        setNextId: Dispatch<SetStateAction<number>>,

    }
) {
    const dragNodeTypes = useMemo(() => ['event-node', 'choice-node', 'if-node', 'else-node', 'content-node', 'ifstmt-node'], []);
    const [pos, setPos] = useState<XYPosition | null>(null);
    const [showTool, setShowTool] = useState(false);
    const { screenToFlowPosition, setNodes } = useReactFlow();

    function handlePointerDown(e: PointerEvent) {
        if (showTool) {
            return;
        }
        (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
        setPos({ x: e.pageX, y: e.pageY });
        setShowTool(true);
    }

    return (
        showTool ? (pos && <div
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
            } onClick={() => { setShowTool(false); }}>
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
                            id: `create-${nextId}`,
                            type,
                            position,
                            data: { label: `${type}` },
                        }
                        setNodes((nds) => nds.concat(newNode))
                        setNextId(nextId + 1);
                        setShowTool(false);
                    }}
                >
                    {type}
                </div>
            ))}
        </div>)
            :
            (<div className="nopan nodrag tool-overlay" onPointerDown={handlePointerDown}>
            </div>)
    );
}