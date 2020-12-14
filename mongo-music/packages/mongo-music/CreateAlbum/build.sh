rm -fr MongoMusic.API
cp -r ../../../MongoMusic.API .
cd MongoMusic.API
cp ../CreateAlbum.cs .
dotnet publish -c Release -o ..
