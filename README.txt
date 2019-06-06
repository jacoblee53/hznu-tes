# 打包部署

1. 构建：npm run build
2. 打包：tar czvf zjddd-xx.tar.gz build
3. 上传到部署的服务器： scp zjddd-xx.tar.gz root@x.x.x.x:/
4. 连接到服务器： ssh root@x.x.x.x
5. 在服务器上部署：
   -  备份之前部署的内容： mv -v build build_bkx
   -  tar xzvf zjddd-xx.tar.gz
6. 刷新页面验证部署结果


# 打包数据下载到本地

1. 进入接口文件夹：cd /api
2. 打包：./scripts/datatar.sh
3. 查看：ls -l
4. 下载至本地：scp root@39.106.86.250:/api/data_xxx.tar.gz <本地路径>