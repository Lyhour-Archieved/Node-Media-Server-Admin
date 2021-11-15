import { Card, Icon, Table } from "antd";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { bytesToSize, secondsToDhms } from "./Util";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      dataIndex: "value",
      key: "value",
    },
  ];

  useEffect(() => {
    fetch();
  });

  const fetch = () => {
    setLoading(true);
    axios("/api/server")
      .then((data: any) => {
        // Read total count from server
        let osInfo = {
          key: 0,
          name: "OS",
          value: data.os.arch + "_" + data.os.platform + "_" + data.os.release,
        };
        let cpuInfo = {
          key: 1,
          name: "CPU",
          value: data.cpu.num + " x " + data.cpu.model,
        };
        let memInfo = {
          key: 2,
          name: "Memory",
          value: bytesToSize(data.mem.totle),
        };
        let nodeInfo = { key: 3, name: "Node.js", value: data.nodejs.version };
        let uptimeInfo = {
          key: 4,
          name: "Uptime",
          value: secondsToDhms(data.nodejs.uptime),
        };
        let versionInfo = { key: 5, name: "Version", value: data.version };
        setData([osInfo, cpuInfo, memInfo, nodeInfo, uptimeInfo, versionInfo]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <Card
        title={
          <Fragment>
            <Icon type="hdd" />
            <span style={{ paddingLeft: "12px", fontSize: "16px" }}>
              Server Info
            </span>
          </Fragment>
        }
      >
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={false}
          showHeader={false}
        />
      </Card>
    </Fragment>
  );
};

export default App;
