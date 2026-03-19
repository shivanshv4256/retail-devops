pipeline {
    agent any

    environment {
        IMAGE_NAME = "retail-app"
        CONTAINER_NAME = "retail-container"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/shivanshv4256/retail-devops'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test || true'
                    } else {
                        bat 'npm test || exit 0'
                    }
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh "docker build -t ${IMAGE_NAME} ."
                    } else {
                        bat "docker build -t %IMAGE_NAME% ."
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                        docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
                        '''
                    } else {
                        bat '''
                        docker stop %CONTAINER_NAME% || exit 0
                        docker rm %CONTAINER_NAME% || exit 0
                        docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes (Optional)') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        kubectl apply -f k8s/
                        '''
                    } else {
                        echo 'Kubernetes deployment typically runs on Linux agents'
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline Completed Successfully!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}