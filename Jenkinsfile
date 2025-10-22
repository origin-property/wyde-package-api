pipeline {
    agent none
    tools { nodejs 'nodejs' }

    options {
        disableConcurrentBuilds(abortPrevious: true)
        skipStagesAfterUnstable()
        timestamps()
    }
    environment {
        ECR_REPO = '565654345845.dkr.ecr.ap-southeast-1.amazonaws.com'
        DOCKER_IMAGE_NAME = 'wyde-package-api'
    }
    stages {
        stage('Clone repository') {
            agent { label 'arm-slave' }
            when { anyOf { branch 'main'; branch 'staging' } }
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Set Parameters') {
            agent { label 'arm-slave' }
            when { anyOf { branch 'main'; branch 'staging' } }
            steps {
                script {
                    def branchParams = setBranchParameters()
                    DOCKER_IMAGE = branchParams.DOCKER_IMAGE
                    APP_STAGE = branchParams.APP_STAGE
                    echo "DOCKER_IMAGE: ${DOCKER_IMAGE}"
                    echo "APP_STAGE: ${APP_STAGE}"
                }
            }
        }

        stage('Build') {
            agent { label 'arm-slave' }
            when { anyOf { branch 'main'; branch 'staging' } }
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE + '1', ".")
                }
            }
            post {
                always {
                    jiraSendBuildInfo site: 'origin-prop.atlassian.net'
                }
            }
        }

        stage('PushImage') {
            agent { label 'arm-slave' }
            when { anyOf { branch 'main'; branch 'staging' } }
            steps {
                script {
                    docker.withRegistry('https://565654345845.dkr.ecr.ap-southeast-1.amazonaws.com', 'ecr:ap-southeast-1:ecr-aws') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push('latest')
                    }
                }
            }
        }

        stage('Deploy') {
            agent { label 'arm-slave' }
            when { anyOf { branch 'main'; branch 'staging' } }
            steps {
                script {
                    updateDeploymentFile(APP_STAGE, DOCKER_IMAGE)
                    pushToGithub()
                }
            }
            post {
                always {
                    script {
                        if (env.BRANCH_NAME == 'staging') {
                            jiraSendDeploymentInfo site: 'origin-prop.atlassian.net', environmentId: 'origin-dev', environmentName: 'origin-dev', environmentType: 'staging'
                        } else if (env.BRANCH_NAME == 'main') {
                            jiraSendDeploymentInfo site: 'origin-prop.atlassian.net', environmentId: 'origin-prod', environmentName: 'origin-prod', environmentType: 'production'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                notifyDiscord(currentBuild.currentResult)
            }
        }
    }
}

def updateDeploymentFile(String appStage, String dockerImage) {
    git branch: 'main',
        credentialsId: 'github-un',
        url: 'https://github.com/origin-property/config.git'

    def yamlFile = readYaml(file: "./wyde-package-api/${appStage}/Deployment.yaml")
    yamlFile.spec.template.spec.containers[0].image = dockerImage + env.BUILD_NUMBER
    sh("rm -f ./wyde-package-api/${appStage}/Deployment.yaml")
    writeYaml file: "./wyde-package-api/${appStage}/Deployment.yaml", data: yamlFile
}

def pushToGithub() {
    withCredentials([usernamePassword(credentialsId: 'github-un', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        // กำหนดค่า BUILD_NUMBER ให้ shell script
        def buildNumber = env.BUILD_NUMBER

        sh """
            git config --global user.email "jenkins@myorigin.net"
            git config --global user.name "Jenkins"
            git add .
            git commit -am "bump to version ${buildNumber}"
            git push https://\${USERNAME}:\${PASSWORD}@github.com/origin-property/config.git HEAD:main
        """
    }
}

def setBranchParameters() {
    def params = [:]
    if (env.BRANCH_NAME == 'main') {
        def dockerImageName = 'prod-' + env.DOCKER_IMAGE_NAME + ':'
        params.DOCKER_IMAGE = env.ECR_REPO + '/' + dockerImageName
        params.APP_STAGE = 'production'
    } else if (env.BRANCH_NAME == 'staging') {
        def dockerImageName = 'staging-' + env.DOCKER_IMAGE_NAME + ':'
        params.DOCKER_IMAGE = env.ECR_REPO + '/' + dockerImageName
        params.APP_STAGE = 'staging'
    }
    return params
}

def notifyDiscord(String status) {
    def timeStamp = new Date().format('yyyy/MM/dd HH:mm')

    if (status == 'STARTED') {
        def commitUser = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
        def commitMessage = sh(script: "git log -1 --pretty=format:'%s'", returnStdout: true).trim()
        def commitDate = sh(script: "git log -1 --pretty=format:'%cd'", returnStdout: true).trim()

        message = """wyde-package-api/${env.BRANCH_NAME}

:rocket: **Build Started!**
:package: Build: #${env.BUILD_NUMBER}
:link: URL: ${env.BUILD_URL}
:twisted_rightwards_arrows: Branch: ${env.BRANCH_NAME}

:pencil: **Commit Info**
:bust_in_silhouette: Author: ${commitUser}
:speech_balloon: Message: ${commitMessage}
:clock3: Date: ${commitDate}

:hourglass: Building..."""
    } else {
        def statusEmoji = [
            'SUCCESS': ':white_check_mark:',
            'FAILURE': ':x:',
            'ABORTED': ':warning:'
        ]
        def emoji = statusEmoji[status] ?: ':question:'

        message = """${emoji} wyde-package-api/${env.BRANCH_NAME}

**Build ${status.toLowerCase()}!**
:package: Build: #${env.BUILD_NUMBER}
:link: URL: ${env.BUILD_URL}
:twisted_rightwards_arrows: Branch: ${env.BRANCH_NAME}
:stopwatch: Duration: ${currentBuild.durationString}"""
    }

    discordSend(
        description: message,
        footer: timeStamp,
        link: env.BUILD_URL,
        result: status,
        title: JOB_NAME,
        webhookURL: env.DISCORD_WEBHOOKURL
    )
}
