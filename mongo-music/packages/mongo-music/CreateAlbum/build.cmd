rmdir MongoMusic.API /s /q
xcopy ..\..\..\MongoMusic.API . /s
cd MongoMusic.API
copy  ..\CreateAlbum.cs .
dotnet publish -c Release -o ..
