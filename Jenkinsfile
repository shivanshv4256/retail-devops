pipeline {
    agent any

    environment {
        IMAGE_NAME = "retail-app"
        CONTAINER_NAME = "retail-container"
    }

    stages {

        

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
        bat 'docker rm -f retail-container || echo no container'
        bat 'docker run -d -p 7000:7000 --name retail-container retail-app'
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