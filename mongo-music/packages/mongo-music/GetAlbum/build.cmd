rmdir MongoMusic.API /s /q
xcopy ..\..\..\MongoMusic.API . /s
cd MongoMusic.API
copy  ..\GetAlbum.cs .
dotnet publish -c Release -o ..
