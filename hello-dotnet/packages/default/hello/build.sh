dotnet new classlib -n Apache.OpenWhisk.Example.Dotnet -lang C# -f netstandard2.1
cd Apache.OpenWhisk.Example.Dotnet
dotnet add package Newtonsoft.Json -v 12.0.2
cp ../hello.cs .
dotnet publish -c Release -o ..
