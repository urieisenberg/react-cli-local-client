import "./code-cell.css";
import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { CodeEditor } from "../CodeEditor";
import { Preview } from "../Preview";
import { Resizable } from "../Resizable";
import { bundle } from "../../bundler";
import { Cell } from "../../store";

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};
