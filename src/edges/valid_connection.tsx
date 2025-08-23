import { Connection, Edge } from "@xyflow/react";

const validMap = {
    "event": ["content", "choice", "if"],
    "choice": ["case"],
    "if": ["ifstmt", "else"],
    "ifstmt": ["content", "choice", "if"],
    "else": ["content", "choice", "if"],
    "content": ["*"],
    "case": ["event"],
}

export function IsValidFlowConnection(connection: Connection | Edge): boolean {
    for (const [key, values] of Object.entries(validMap)) {
        if (connection.source.startsWith(`${key}-`)) {
            if (values.length == 1 && values[0] == "*") {
                return true;
            }
            for (const value of values) {
                if (connection.target.startsWith(`${value}-`)) {
                    return true;
                }
            }
            return false;
        }
    }
    return false;
}