import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export function SwitchDarkMode() {
    const { darkMode, setDarkMode } = useContext(AppContext)
    const onChange = (checked) => {
        setDarkMode(checked);
      };

    return (
        <div className="switch">
          <SunOutlined />
          <Switch checked={darkMode} onChange={onChange} />
          <MoonOutlined />
        </div>
    )
}