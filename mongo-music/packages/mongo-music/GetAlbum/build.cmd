cd MongoMusic.API
dotnet publish -c Release -o out
cd out
zip -r -0 ../../code.zip *.dll *.pdb *.json
