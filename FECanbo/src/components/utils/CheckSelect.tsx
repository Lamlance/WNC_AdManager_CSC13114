import React from "react";
import { Checkbox, Select } from "antd";

const CheckSelect: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = React.useState(["john"]);
  const [dirty, setDirty] = React.useState(false);
  const handleChange = (value: string[]) => {
    setSelectedOptions(value);
    setDirty(true);
    console.log("Select Changed");
  };
  return (
    <Select
      defaultValue={[
        
      ]}
      //@ts-ignore
      onChange={handleChange}
      onMouseDown={(e) => {
        setDirty(false);
        console.log("Select Clicked");
        e.stopPropagation();
      }}
      style={{ width: 150 }}
      mode="multiple"
      options={[
        {
          value: "john",
          label: (
            <Checkbox
              onClick={(e) => {
                if (dirty) {
                  e.stopPropagation();
                }
                setDirty(false);
                console.log("Check Clicked");
              }}
              checked={selectedOptions.includes("john")}
            >
              John
            </Checkbox>
          )
        },
        {
          value: "jim",
          label: (
            <Checkbox
              onClick={(e) => {
                if (dirty) {
                  e.stopPropagation();
                }
                setDirty(false);
                console.log("Check Clicked");
              }}
              checked={selectedOptions.includes("jim")}
            >
              Jim
            </Checkbox>
          )
        },
        {
          value: "johhny",
          label: (
            <Checkbox
              onClick={(e) => {
                if (dirty) {
                  e.stopPropagation();
                }
                setDirty(false);
                console.log("Check Clicked");
              }}
              checked={selectedOptions.includes("johhny")}
            >
              Johhny
            </Checkbox>
          )
        }
      ]}
    />
  );
};

export default CheckSelect;