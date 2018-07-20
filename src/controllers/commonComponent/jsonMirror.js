import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import { Tools } from 'Utils'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

const JsonMirror = (props) => {
    const codeProps = {
        lineNumbers: true,
        fixedGutter: true,
        cursorHeight: 0.85,
        inputStyle: "contenteditable",
        electricChars: false,
        smartIndent: false,
        mode: "javascript",
        style: { lineHeight: '0px' },
        value: Tools.jsonFormat(props.value)
    }
    return (
        <CodeMirror {...codeProps} />
    )
}
export default JsonMirror