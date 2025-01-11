import { useState } from "react";
import {
  StyledObjectEntryBoolean,
  // StyledObjectEntryKey,
  StyledObjectEntryEmptyObject,
  StyledObjectEntryFunction,
  StyledObjectEntryNull,
  StyledObjectEntryObjectToggle,
  StyledObjectEntryString,
  StyledObjectEntryUndefined,
  StyledObjectRepresentation,
  StyledObjectEntryNumber,
  StyledObjectEntryEmptyArray,
  StyledObjectEntryArrayToggle,
} from "@styles/StyledObjectRepresentation";
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

  if (value === null)
    return <StyledObjectEntryNull>null</StyledObjectEntryNull>;
  // <span className="object-entry__null">null</span>;
  if (value === undefined)
    return <StyledObjectEntryUndefined>undefined</StyledObjectEntryUndefined>;
  // return <span className="object-entry__undefined">undefined</span>;
  if (typeof value === "string") {
    return <StyledObjectEntryString>{`"${value}"`}</StyledObjectEntryString>;
    // return <span className="text-green-500">{`"${value}"`}</span>;
  }
  if (typeof value === "number")
    return <StyledObjectEntryNumber>{value}</StyledObjectEntryNumber>;
  // return <span className="object-entry__number">{value}</span>;
  if (typeof value === "boolean")
    return (
      <StyledObjectEntryBoolean>{value.toString()}</StyledObjectEntryBoolean>
    );
  // return <span className="object-entry__boolean">{value.toString()}</span>;
  if (typeof value === "function")
    return (
      <StyledObjectEntryFunction>ƒ () {"{ ... }"}</StyledObjectEntryFunction>
    );
  // return <span className="object-entry__function">ƒ () {"{ ... }"}</span>;
  if (Array.isArray(value)) {
    if (value.length === 0)
      return <StyledObjectEntryEmptyArray>[]</StyledObjectEntryEmptyArray>;
    // return <span className="object-entry__empty-array">[]</span>;
    return (
      // <>
      <span>
        <StyledObjectEntryArrayToggle
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "▼" : "▶"} Array({value.length})
        </StyledObjectEntryArrayToggle>
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
      // <span>
      //   <span
      //     className="object-entry__array-toggle cursor-pointer select-none"
      //     onClick={() => setIsExpanded(!isExpanded)}
      //   >
      //     {isExpanded ? "▼" : "▶"} Array({value.length})
      //   </span>
      //   {isExpanded && (
      //     <span>
      //       {"["}
      //       <div style={{ marginLeft: 20 }}>
      //         {value.map((item, index) => (
      //           <div key={index}>
      //             {indent}
      //             <ObjectEntry
      //               value={item}
      //               isLast={index === value.length - 1}
      //               indentLevel={indentLevel + 1}
      //             />
      //             {index < value.length - 1 ? "," : ""}
      //           </div>
      //         ))}
      //       </div>
      //       {"]"}
      //     </span>
      //   )}
      //   {!isExpanded && <span> [...]</span>}
      //   {!isLast && ","}
      // </span>
      // {/* </> */}
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0)
      return <StyledObjectEntryEmptyObject>{}</StyledObjectEntryEmptyObject>;
    // return <span className="object-entry__empty-object">{}</span>;
    return (
      <span>
        <StyledObjectEntryObjectToggle
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "▼" : "▶"} Object
        </StyledObjectEntryObjectToggle>
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
      // <span>
      //   <span
      //     className="object-entry__object-toggle cursor-pointer select-none"
      //     onClick={() => setIsExpanded(!isExpanded)}
      //   >
      //     {isExpanded ? "▼" : "▶"} Object
      //   </span>
      //   {isExpanded && (
      //     <span>
      //       {"{"}
      //       <div style={{ marginLeft: 20 }}>
      //         {entries.map(([key, val], index) => (
      //           <div key={key}>
      //             {indent}
      //             <span className="object-entry__key">{key}</span>:{" "}
      //             <ObjectEntry
      //               value={val}
      //               isLast={index === entries.length - 1}
      //               indentLevel={indentLevel + 1}
      //             />
      //             {index < entries.length - 1 ? "," : ""}
      //           </div>
      //         ))}
      //       </div>
      //       {"}"}
      //     </span>
      //   )}
      //   {!isExpanded && <span> </span>}
      //   {!isLast && ","}
      // </span>
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
    <StyledObjectRepresentation>
      <ObjectEntry value={props} />
    </StyledObjectRepresentation>
    // <div className="object-representation">
    //   <ObjectEntry value={props} />
    // </div>
  );
}
