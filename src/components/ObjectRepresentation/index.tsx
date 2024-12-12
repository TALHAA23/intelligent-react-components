import { useState } from "react";

interface ObjectEntryProps {
  value: any;
  isLast?: boolean;
  indentLevel?: number;
}

const ObjectEntry = ({
  value,
  isLast = false,
  indentLevel = 0,
}: ObjectEntryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const indent = "  ".repeat(indentLevel);

  if (value === null) return <span className="object-entry__null">null</span>;
  if (value === undefined)
    return <span className="object-entry__undefined">undefined</span>;
  if (typeof value === "string") {
    return <span className="text-green-500">{`"${value}"`}</span>;
  }
  if (typeof value === "number")
    return <span className="object-entry__number">{value}</span>;
  if (typeof value === "boolean")
    return <span className="object-entry__boolean">{value.toString()}</span>;
  if (typeof value === "function")
    return <span className="object-entry__function">ƒ () {"{ ... }"}</span>;

  if (Array.isArray(value)) {
    if (value.length === 0)
      return <span className="object-entry__empty-array">[]</span>;
    return (
      <span>
        <span
          className="object-entry__array-toggle cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "▼" : "▶"} Array({value.length})
        </span>
        {isExpanded && (
          <span>
            {"["}
            <div style={{ marginLeft: 20 }}>
              {value.map((item, index) => (
                <div key={index}>
                  {indent}
                  <ObjectEntry
                    value={item}
                    isLast={index === value.length - 1}
                    indentLevel={indentLevel + 1}
                  />
                  {index < value.length - 1 ? "," : ""}
                </div>
              ))}
            </div>
            {"]"}
          </span>
        )}
        {!isExpanded && <span> [...]</span>}
        {!isLast && ","}
      </span>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0)
      return <span className="object-entry__empty-object">{}</span>;
    return (
      <span>
        <span
          className="object-entry__object-toggle cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "▼" : "▶"} Object
        </span>
        {isExpanded && (
          <span>
            {"{"}
            <div style={{ marginLeft: 20 }}>
              {entries.map(([key, val], index) => (
                <div key={key}>
                  {indent}
                  <span className="object-entry__key">{key}</span>:{" "}
                  <ObjectEntry
                    value={val}
                    isLast={index === entries.length - 1}
                    indentLevel={indentLevel + 1}
                  />
                  {index < entries.length - 1 ? "," : ""}
                </div>
              ))}
            </div>
            {"}"}
          </span>
        )}
        {!isExpanded && <span> </span>}
        {!isLast && ","}
      </span>
    );
  }

  return null;
};

type Object = {
  [key: string]: any;
};
export default function ObjectRepresentation({ props }: { props: Object }) {
  if (!props) {
    return <p>Props are not defined</p>;
  }
  return (
    <div className="object-representation font-mono text-sm bg-zinc-900 text-white p-4 rounded-lg overflow-auto max-h-[600px] whitespace-pre">
      <ObjectEntry value={props} />
    </div>
  );
}
