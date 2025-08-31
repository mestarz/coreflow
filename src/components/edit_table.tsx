import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, useRef } from "react"
import { FlowNodeType } from "../nodes/node_define";

export function EditTable(
    { node, setEditing, handleUpdataData }:
        {
            node: FlowNodeType;
            setEditing: Dispatch<SetStateAction<FlowNodeType | null>>;
            handleUpdataData: (id: string, newData: any) => void
        }
) {
    const [label, setLabel] = useState<string>(node.data.label)
    // 自动调整label
    useEffect(() => {
        setLabel(node.data.label)
    }, [node.id, node.data.label])

    const handleChangeLabel = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setLabel(e.target.value);
        handleUpdataData(node.id, { label: e.target.value });
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 自动调整高度
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [label]);

    console.log("节点ID:", node.id)
    console.log("节点数据:", node.data)

    return (
        <div style={
            {
                position: "fixed",   // 固定在视口，不随滚动条滚动
                top: "300px",         // 距离顶部 20px，可改为 0
                right: "20px",       // 距离右边 20px，可改为 0
                zIndex: 9999,        // 保证在最上层
                background: "white", // 避免透明看不清
                padding: "8px 12px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                maxWidth: "300px"
            }
        }>
            <div style={
                {
                    padding: '10px',
                    margin: '10px 0',
                    color: 'black',
                    background: '#f34718',
                    cursor: 'pointer'
                }
            } onClick={() => { setEditing(null); }}>
                取消
            </div>
            <textarea
                ref={textareaRef}
                value={label}
                onChange={handleChangeLabel}
                className="border p-2 w-full resize-none overflow-hidden"
                title="label: "
            />
        </div>
    )
}
