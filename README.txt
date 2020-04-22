# 打包部署

1. 构建：npm run build
2. 打包：tar czvf build-xx.tar.gz build
3. 上传到部署的服务器： scp build-xx.tar.gz root@x.x.x.x:/
4. 连接到服务器： ssh root@x.x.x.x
5. 在服务器上部署：
   -  备份之前部署的内容： mv -v build build_bkx
   -  tar xzvf build-xx.tar.gz
6. 刷新页面验证部署结果


# 后端部署

1. 同上
2. pm2 start npm -- run prod


# 打包数据下载到本地

1. 进入接口文件夹：cd /api
2. 打包：./scripts/datatar.sh
3. 查看：ls -l
4. 下载至本地：scp root@39.106.86.250:/api/data_xxx.tar.gz <本地路径>

# 数据库

1. dump远端数据库：mongodump --uri="mongodb://$sourceUser:$sourcePwd@$sourceHost/$sourceDb" --gzip --archive | mongorestore --uri="mongodb://$targetUser:$targetPwd@$targetHost/$targetDb" --nsFrom="$sourceDb.*" --nsTo="$targetDb.*" --gzip --archive