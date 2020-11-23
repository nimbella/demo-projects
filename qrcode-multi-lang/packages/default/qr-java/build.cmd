SET BUILD="maven"

IF BUILD == "maven" THEN
   goto :mavenBuild 

IF BUILD == "gradle"  THEN
        goto :gradleBuild 
    ELSE 
        echo Unknown Build

:gradleBuild 
   gradlew jar
   @echo build/libs/qr-java-1.0.jar > .include
   goto :eof

:mavenBuild 
   mvn install
   @echo target/qr-1.0.0-jar-with-dependencies.jar > .include
   goto :eof