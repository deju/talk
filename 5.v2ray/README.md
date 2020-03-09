## ubuntu-server 安装 v2ray

### bash安装
`bash <(curl -L -s https://install.direct/go.sh)`

执行后会显示当前使用的端口号和UUID

    PORT:29788
    UUID:5947fccd-0a39-45b7-bb9c-6aa199374717
    Archive:  /tmp/v2ray/v2ray.zip
    inflating: /etc/systemd/system/v2ray.service
    Created symlink /etc/systemd/system/multi-user.target.wants/v2ray.service → /etc/systemd/system/v2ray.service.

安装后，其可执行文件在`/usr/bin/v2ray`下，配置文件在 `/etc/v2ray`下。


### 配置config
打开 `/etc/v2ray/config.json`文件:
    
    {
    {
    "inbounds": [{
        "port": 29788,   // 连接端口，可以更改
        "protocol": "vmess",
        "settings": {
            "clients": [{
                "id": "5947fccd-0a39-45b7-bb9c-6aa199374717",  // id要修改，在https://www.uuidgenerator.net/ 网站上产生新的替换此处
                "level": 1,
                "alterId": 64
            }]
        },
        "streamSettings": {
            "network": "ws"   // websocket传输，如果不需要，将"streamSettings"整个移除
        }
    }],
    "outbounds": [{
        "protocol": "freedom",
        "settings": {}
    },{
        "protocol": "blackhole",
        "settings": {},
        "tag": "blocked"
    }],
    "routing": {
        "rules": [{
            "type": "field",
            "ip": ["geoip:private"],
            "outboundTag": "blocked"
        }]
    }
    }


### 重启v2ray
    systemctl restart v2ray


## 通过deb包安装
    https://github.com/dreamrover/v2ray-deb



### 参考
[UBUNTU 16.04 INSTALL V2RAY](https://linuxscriptshub.com/how-to-install-v2ray-on-ubuntu-16-04/)
[V2Ray 配置指南](https://toutyrater.github.io/)
[UUID Generator](https://www.uuidgenerator.net/)
