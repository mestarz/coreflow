export const flowNodeType = ["choice", "case", "content", "else", "if", "ifstmt", "event"];
type FlowNodeStyle = Record<string, string>

export const styleMap: Record<string, FlowNodeStyle> = {
    choice: {
        background: '#B2C9B2',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    case: {
        background: '#70C870',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around',
        maxWidth: '40ch',
    },
    content: {
        background: '#B0D8E8',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around',
        maxWidth: '40ch',
    },
    else: {
        background: '#3CB371',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    if: {
        background: '#3CB371',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    ifstmt: {
        background: '#3CB371',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    event: {
        background: '#B34B43',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    }
};