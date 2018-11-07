### `Gitlab CI & CD` 介绍
持续集成、部署的理想情况是在代码提交及合并后剩下的事由一系列自动化程序帮忙完成，包括代码检查、构建、自动化测试、自动化部署等。可以用第三方工具，诸如`jenkins`来完成这个过程，当然，还有更简便的工具（如果你用的是gitlab的话）。


Gitlab集成了`ci & cd`过程，只需要通过简单的配置(在项目的跟目录中增加`.gitlab-ci.yml`文件即可)即可进行持续集成等各种自动化操作。每个自动化可能有多个操作，比如说lint、test、build、deploy。


下图是`Gitlab`官网对于`Gitlab ci & cd`的描述：
![gitlab官网描述图片](https://docs.gitlab.com/ee/ci/img/cicd_pipeline_infograph.png)


在上面的图片中，我们可以看到代码`Commit`后，则进入`CI PIPELINE`过程，最后再进入`CD PIPELINE`过程。  

- `CI PIPELINE`    
  该过程包含了`BUILD`, `UNIT TEST`, `INTEGRATION TESTS`这3个过程，即打包，单元测试，集成测试 。

- `CD PIPELINE`    
  该过程包括`REVIEW`, `STAGING`, `PRODUCTION`，即Review，预上线，部署线上。

从上述图片看出，从`commit`之后，剩下的交给自动化程序了，保证集成、部署、交付的顺利进行。而为了完成上述的这个过程，在Gitlab中，增加了一个`Pipeline`功能，`Pipeline`连接的是`Runner`。即将代码提交后的事情，交给`Runner`去做。

### 理解`Gitlab Runner`

`Runner`，简单理解成任务运行器即可，需要自己去安装Runner管理器并且注册想要使用的Runner。而`Runner`可以分为`Shared Runner`, `Specific Runner`, `Group Runner`，分别是共享的Runner（所有项目都可以使用），独立的Runner(只适用于某个项目)，组Runner(使用一个组里的项目)。

在代码提交至gitlab，此时gitlab会查看根目录中是否有`.gitlab-ci.yml`文件，如果有，则根据配置将不同的自动化过程交给对应的Runner。而一个Runner，如果同时被多个项目使用或者被多个分支触发了， 此时会按照队列的先入先出来的顺序来运行。 

`Gitlab Runner`的注册及运行的机器不建议与`gitlab`自身放在一起。如果多个项目在同时执行runner，对机器的资源占用较多。 

`Gitlab Runner`的执行器种类也分很多种，比如shell、ssh、docker等。

[参看官方介绍](https://docs.gitlab.com/ee/ci/runners/README.html)

### 安装`Gitlab Runner`

    # For CentOS
    # 1，添加源
    curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash

    # 2，安装
    sudo yum install gitlab-runner

    # 3，
    # 默认执行runner的用户是gitlab-runner，如果继续使用默认用户，则进行密码设置：
    # 设置密码：
        sudo su
        passwd gitlab-runner
        # then input gitlab-runner password
    # 如果将已有的用户作为runner执行用户，则需要进行重置下。
    # 重置runner用户：
        sudo gitlab-runner install --user=YOUR_USER --working-directory=/home/YOUR_USER_NAME
        # 如有提示不成功，则将对应的配置文件删除
        sudo gitlab-runner stop
        sudo gitlab-runner start

[参考官方文档](https://docs.gitlab.com/runner/install/linux-repository.html)

### 注册`Gitlab Runner`

    sudo gitlab-runner register

    # 按提示需要分别输入：
    #   1，gitlab链接;
    #   2，gitlab-ci的token;
    #   3，gitlab-ci的描述;
    #   4，gitlab-ci的tag;
    #   5，选择执行程序类型; (支持docker-ssh, shell, ssh, virtualbox, docker-ssh+machine, docker, parallels, docker+machine, kubernetes)


[参考官网文档](https://docs.gitlab.com/runner/register/index.html)


### 在项目中配置`CI & CD`
在项目的根目录中创建`.gitlab-ci.yml`，gitlab在git push操作后，会判断是否有该文件。如果有该文件，则会按照该文件的配置调用runner。

下面列出的是一个项目中使用的`CI & CD`配置：

实现的功能有:       

- 所有分支代码变动后，进行代码校验(lint)    
- 所有分支代码变动后，进行党员测试(unit)
- 如果develop分支变化，在`/data/web/project-dev`目录中打包代码(deploy_dev)
- 如果test分支变化，在`/data/web/project-test`目录中打包代码(deploy_test)    
        
其中的`ci-runner`是注册`Runner`名字，是个可执行`shell`脚本的。



    # .gitlab-ci.yml 文件内容

    # 目前有2个stage，分别是test和deploy过程
    stages:
      - test
      - deploy

    # 变量
    variables:
      DEV_PATH: "/data/web/project-dev"
      TEST_PATH: "/data/web/project-test"

    # 所有 stage 之前的操作
    before_script:
      - export COMMIT_TIME=$(git show -s --format=%ct $CI_COMMIT_SHA)
      - export CURRENT_DATE=`date '+%Y-%m-%d-%H-%M-%S'`

    # 过程的代码检查，属于 stage:test 过程
    lint:
      stage: test
      tags: ci-runner
      script: 
        - npm install
        - npm run lint

    # 单元测试，属于 stage:test 过程
    unit:
      stage: test
      tags:
        - ci-runner
      script:
        - npm install
        - npm run test

    # 部署到开发目录，属于 stage:deploy 过程，仅针对develop分支才进行该步操作
    deploy_dev:
        stage: deploy
        tags:
          - ci-runner
        only:
          - develop
        script:
          - cd $DEV_PATH
          - git checkout .
          - git checkout develop
          - git pull
          - npm install
          - npm run build

    # 部署到测试目录，属于 stage:deploy 过程，针对分支为test分支才进行该步操作
    deploy_test:
        stage: deploy
        tags:
          - ci-runner
        only:
          - test
        script:
          - cd $TEST_PATH
          - git checkout .
          - git checkout test
          - git pull
          - npm install
          - npm run build
