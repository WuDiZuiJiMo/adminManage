### 常用命令

```shell
# git提交状态
git status
# git提交
git commit -m xxxlog
# 查日志
git log

# 切换本地分支，下载代码，关联远程仓库，pull远程仓库
git branch br_feature_4.3.2.300
git checkout br_feature_4.3.2.300
git remote add upstream http://gitlab-g.ipd.hihonor.com/cloudservice/mobile-basic-services/bigdata/marketing-platform/marketing-platform-ui.git
git pull upstream br_feature_4.3.2.300
```

### commit 撤回

参数

```shell
–mixed
# 意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
# 这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

–soft
# 不删除工作空间改动代码，撤销commit，不撤销git add .

–hard
# 删除工作空间改动代码，撤销commit，撤销git add
# 注意完成这个操作后，就恢复到了上一次的commit状态。.

# 如果commit注释写错了，只是想改一下注释，只需要：
git commit --amend
# 此时会进入默认vim编辑器，修改注释完毕后保存就好了。
```

示例

```shell
git reset --hard xxx版本
git reset --soft xxx版本
git reset --soft HEAD^ # 撤回最近一次commit
git reset --soft HEAD~n # 撤回最近n次commit
```

### git stash

```shell
# 保存当前修改
git stash
# 查看当前保存的所有stash列表，每个stash都有一个唯一的标识符和对应的描述信息
git stash list
# 读取最近的一次stash保存内容
git stash pop
# 删除所有的stash，慎用，它会清除所有保存的stash记录
git stash clear

# 示例用法
# 1.保存当前的修改到stash，并添加描述信息：
git stash save "Work in progress on feature XYZ"
# 2. 查看当前所有的stash列表：
git stash list
# 3. 应用某个特定的stash：
git stash apply stash@{2}
# 4. 创建一个新分支并将某个stash应用到新分支上：
git stash branch new-feature-branch stash@{1}
# 5. 交互式地选择要保存的修改：
git stash -p
```

### git pull 冲突解决

#### 1.stash

```shell
git stash
git pull
git stash pop
# 接下来diff一下此文件看看自动合并的情况，并作出相应修改。
git commit
```

#### 2.放弃本地修改，直接覆盖

```shell
git reset --hard
git pull
```

### 参考文档
[git pull 文件时和本地文件冲突的问题](https://www.cnblogs.com/huhongy/p/7290018.html)