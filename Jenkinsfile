pipeline {
    agent any

    environment {
        IMAGE_NAME = "retail-app"
        CONTAINER_NAME = "retail-container"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
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

        stage('Run Container') {
           steps {
             script {
              if (isUnix()) {
                sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                docker run -d -p 7000:7000 --env-file .env --name ${CONTAINER_NAME} ${IMAGE_NAME}
                '''
            } else {
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                docker run -d -p 7000:7000 --env-file .env --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }
}

        stage('Deploy to Kubernetes') {
            when {
                expression { return isUnix() }
            }
            steps {
                sh 'kubectl apply -f k8s/ || true'
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