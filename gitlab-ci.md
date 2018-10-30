### 介绍
gitlab集成了`ci & cd`过程，只需要通过简单的配置即可进行持续集成等各种自动化操作。每个自动化可能有多个操作，比如说lint、test、build、deploy。这里有个runner概念，简单理解成任务运行器即可。多个项目可以共用一个运行器，此时会按照队列的先入先出来的顺序来运行。`gitlab runner`的运行的机器不建议与`gitlab`自身放在一起。如果多个项目在同时执行runner，对机器的资源占用较多。runner的执行器种类也分很多种，比如shell、ssh、docker等。


### 安装gitlab runner

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

### 注册gitlab runner

    sudo gitlab-runner register

    # 按提示需要分别输入：
    #   1，gitlab链接;
    #   2，gitlab-ci的token;
    #   3，gitlab-ci的描述;
    #   4，gitlab-ci的tag;
    #   5，选择执行程序类型; (支持docker-ssh, shell, ssh, virtualbox, docker-ssh+machine, docker, parallels, docker+machine, kubernetes)


[参考官网文档](https://docs.gitlab.com/runner/register/index.html)


### 在项目中配置ci & cd
在所在的项目的根目录中创建`.gitlab-ci.yml`，gitlab在git操作后，会判断是否有该文件。如果有该文件，则会按照该文件的配置调用runner。


    # 以下是一个项目中用到的配置，其中ci-runner是注册的一个可执行shell脚本的gitlab runner

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
