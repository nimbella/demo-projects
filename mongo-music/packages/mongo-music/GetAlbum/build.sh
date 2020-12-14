rm -fr MongoMusic.API
cp -r ../../../MongoMusic.API .
cd MongoMusic.API
cp ../GetAlbum.cs .
dotnet publish -c Release -o ..
