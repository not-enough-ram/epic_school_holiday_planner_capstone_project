node{
  stage('checkout from scm'){
    git 'https://github.com/not-enough-ram/epic_school_holiday_planner_capstone_project/'
  }
  stage('compile & package'){
    sh 'mvn package'
  }
}
